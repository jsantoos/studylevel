"""
Question API routes.
"""

from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user,
)

from app.models.question import Question

from app.models.question_option import (
    QuestionOption,
)

from app.models.user import User
from app.models.user_answer import (
    UserAnswer,
)

from app.services.progression_service import (
    ProgressionService,
)

from app.schemas.question import (
    AnswerQuestionRequest,
    QuestionCreate,
    QuestionResponse,
)

from app.services.question_service import (
    QuestionService,
)

router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


@router.post(
    "",
    response_model=QuestionResponse,
)
def create_question(
    payload: QuestionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Create question endpoint.
    """

    service = QuestionService(db)

    return service.create(payload)


@router.get(
    "",
    response_model=list[QuestionResponse],
)
def list_questions(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    List questions endpoint.
    """

    service = QuestionService(db)

    return service.list_questions()


@router.get(
    "/random",
)
def get_random_question(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Retrieve random question.
    """

    question = (
        db.query(
            Question,
        )
        .order_by(
            func.random(),
        )
        .first()
    )

    if not question:

        return {
            "message":
                "No questions found.",
        }

    return {
        "id": str(
            question.id,
        ),

        "statement":
            question.statement,

        "subject":
            question.subject,

        "topic":
            question.topic,

        "difficulty":
            question.difficulty,

        "explanation":
            question.explanation,

        "options": [
            {
                "id": str(
                    option.id,
                ),

                "text":
                    option.option_text,
            }

            for option in (
                question.options
            )
        ],
    }


@router.post(
    "/answer",
)
def answer_question(
    payload: AnswerQuestionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Validate and persist answer.
    """

    option = (
        db.query(
            QuestionOption,
        )
        .filter(
            QuestionOption.id
            == payload.option_id,
        )
        .first()
    )

    if not option:

        return {
            "correct": False,
        }

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

    answer = UserAnswer(
        user_id=current_user.id,
        question_id=payload.question_id,
        selected_option_id=payload.option_id,
        is_correct=option.is_correct,
        response_time=payload.response_time,
        mock_exam_id=None,
    )

    db.add(answer)
    db.commit()

    ProgressionService(
        db,
    ).award_question_xp(
        user_id=current_user.id,
        is_correct=option.is_correct,
    )

    return {
        "correct": option.is_correct,
        "explanation": (
            question.explanation
            if question
            else None
        ),
    }


@router.get(
    "/{question_id}",
    response_model=QuestionResponse,
)
def get_question(
    question_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Retrieve question endpoint.
    """

    service = QuestionService(db)

    return service.get_by_id(
        question_id,
    )


@router.delete(
    "/{question_id}",
)
def delete_question(
    question_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Delete question endpoint.
    """

    service = QuestionService(db)

    service.delete(
        question_id,
    )

    return {
        "message":
            "Question deleted successfully.",
    }
