"""
AI routes.
"""

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.ai.metrics.ai_metrics import (
    AIMetrics,
)
from app.ai.schemas.explanation import (
    ExplanationRequest,
    ExplanationResponse,
)
from app.ai.schemas.hint import (
    HintRequest,
    HintResponse,
)
from app.ai.security.rate_limiter import (
    AIRateLimiter,
)
from app.ai.services.explanation_service import (
    ExplanationService,
)
from app.ai.services.hint_service import (
    HintService,
)
from app.core.database import (
    get_db,
)
from app.core.security import (
    get_current_user,
)
from app.models.question import (
    Question,
)
from app.models.question_option import (
    QuestionOption,
)
from app.models.user import (
    User,
)
from app.services.ai_usage_service import (
    AIUsageService,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

service = HintService()

explanation_service = (
    ExplanationService()
)


def record_ai_usage_safely(
    db: Session,
    user_id,
    feature_type: str,
) -> None:
    """
    Record AI usage without blocking
    the user-facing response.
    """

    try:

        AIUsageService(
            db,
        ).record_usage(
            user_id=user_id,
            feature_type=feature_type,
        )

    except Exception as error:

        print(
            "Failed to record AI usage:",
            error,
        )


@router.post(
    "/hint",
    response_model=HintResponse,
)
async def generate_hint(
    payload: HintRequest,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(
        get_db,
    ),
) -> HintResponse:
    """
    Generate an AI-powered pedagogical hint.

    Security
    --------
    - Requires authentication.
    - Applies rate limiting per user.
    """

    if not AIRateLimiter.allow(
        str(current_user.id),
    ):

        AIMetrics.record_rate_limit_block()

        raise HTTPException(
            status_code=429,
            detail=(
                "Rate limit exceeded. "
                "Please try again later."
            ),
        )

    hint = await (
        service.generate_hint(
            question=payload.question,
            alternatives=payload.alternatives,
            difficulty=payload.difficulty,
            subject=payload.subject,
        )
    )

    record_ai_usage_safely(
        db=db,
        user_id=current_user.id,
        feature_type="hint",
    )

    return HintResponse(
        hint=hint,
    )


@router.post(
    "/explanation",
    response_model=ExplanationResponse,
)
async def generate_explanation(
    payload: ExplanationRequest,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(
        get_db,
    ),
) -> ExplanationResponse:
    """
    Generate an AI-powered explanation.

    If an official explanation exists and
    force_ai is false, returns the database
    explanation without recording AI usage.
    """

    if not AIRateLimiter.allow(
        str(current_user.id),
    ):

        AIMetrics.record_rate_limit_block()

        raise HTTPException(
            status_code=429,
            detail=(
                "Rate limit exceeded. "
                "Please try again later."
            ),
        )

    question = (
        db.query(
            Question,
        )
        .filter(
            Question.id
            == payload.question_id,
        )
        .first()
    )

    if not question:

        raise HTTPException(
            status_code=404,
            detail="Question not found.",
        )

    selected_option = (
        db.query(
            QuestionOption,
        )
        .filter(
            QuestionOption.id
            == payload.selected_option_id,
        )
        .first()
    )

    if not selected_option:

        raise HTTPException(
            status_code=404,
            detail="Selected option not found.",
        )

    if (
        selected_option.question_id
        != question.id
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "Selected option does not "
                "belong to question."
            ),
        )

    correct_option = next(
        (
            option
            for option in question.options
            if option.is_correct
        ),
        None,
    )

    if not correct_option:

        raise HTTPException(
            status_code=500,
            detail=(
                "Question has no correct "
                "option configured."
            ),
        )

    if (
        question.explanation
        and not payload.force_ai
    ):

        return ExplanationResponse(
            explanation=question.explanation,
            source="database",
        )

    explanation = await (
        explanation_service.generate_explanation(
            question=question.statement,
            selected_answer=(
                selected_option.option_text
            ),
            correct_answer=(
                correct_option.option_text
            ),
            subject=question.subject,
            difficulty=str(
                question.difficulty,
            ),
        )
    )

    record_ai_usage_safely(
        db=db,
        user_id=current_user.id,
        feature_type="explanation",
    )

    return ExplanationResponse(
        explanation=explanation,
        source="ai",
    )