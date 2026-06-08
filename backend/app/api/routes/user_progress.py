"""
User progression routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy import func

from app.dependencies.auth import (
    get_current_user,
)

from app.core.database import (
    get_db,
)

from app.models.user_answer import (
    UserAnswer,
)

from app.services.progression_service import (
    ProgressionService,
)

from app.schemas.user_progress import (
    UserProgressResponse,
)
from app.models.ai_usage_log import (
    AIUsageLog,
)

router = APIRouter(
    prefix="/users/me/progress",
    tags=["User Progress"],
)


@router.get(
    "",
    response_model=UserProgressResponse,
)
def get_user_progress(
    current_user=Depends(
        get_current_user,
    ),
    db=Depends(
        get_db,
    ),
):
    """
    Retrieve user progression.
    """

    service = ProgressionService(db)

    progress = (
        service.get_or_create_progress(
            current_user.id,
        )
    )

    accuracy = 0

    if progress.total_questions > 0:

        accuracy = round(
            (
                progress.correct_questions
                / progress.total_questions
            )
            * 100,
            2,
        )

    average_response_time = (
        db.query(
            func.avg(
                UserAnswer.response_time,
            ),
        )
        .filter(
            UserAnswer.user_id
            == current_user.id,
        )
        .scalar()
    )

    average_response_time = int(
        average_response_time or 0,
    )

    ai_hints_used = (
        db.query(
            AIUsageLog,
        )
        .filter(
            AIUsageLog.user_id
            == current_user.id,
            AIUsageLog.feature_type
            == "hint",
        )
        .count()
    )

    ai_explanations_used = (
        db.query(
            AIUsageLog,
        )
        .filter(
            AIUsageLog.user_id
            == current_user.id,
            AIUsageLog.feature_type
            == "explanation",
        )
        .count()
    )

    return {
        "xp": progress.xp,
        "level": progress.level,
        "streak_days": progress.streak_days,
        "total_questions": (
            progress.total_questions
        ),
        "correct_questions": (
            progress.correct_questions
        ),
        "total_mock_exams": (
            progress.total_mock_exams
        ),
        "accuracy": accuracy,
        "average_response_time": (
            average_response_time
        ),
        "ai_hints_used": ai_hints_used,
        "ai_explanations_used": ai_explanations_used,
    }
