"""
Mock exam routes.
"""

from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import (
    get_db,
)

from app.core.security import (
    get_current_user,
)

from app.models.user import (
    User,
)

from app.schemas.mock_exam import (
    MockExamCreate,
    MockExamQuestionResponse,
    MockExamResponse,
    SubmitAnswerPayload,
)

from app.services.mock_exam_service import (
    MockExamService,
)

router = APIRouter(
    prefix="/mock-exams",
    tags=["Mock Exams"],
)


@router.post(
    "",
    response_model=MockExamResponse,
)
def create_mock_exam(
    payload: MockExamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Create mock exam.
    """

    service = MockExamService(db)

    return service.create_mock_exam(
        user_id=current_user.id,
        payload=payload,
    )


@router.post(
    "/{mock_exam_id}/answer",
)
def submit_answer(
    mock_exam_id: UUID,
    payload: SubmitAnswerPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Submit question answer.
    """

    service = MockExamService(db)

    return service.submit_answer(
        user_id=current_user.id,
        mock_exam_id=mock_exam_id,
        payload=payload,
    )


@router.post(
    "/{mock_exam_id}/finish",
)
def finish_mock_exam(
    mock_exam_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Finalize mock exam.
    """

    service = MockExamService(db)

    return service.finish_mock_exam(
        mock_exam_id,
    )


@router.get(
    "/{mock_exam_id}/questions",
    response_model=list[
        MockExamQuestionResponse
    ],
)
def get_mock_exam_questions(
    mock_exam_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Get mock exam questions.
    """

    service = MockExamService(db)

    return service.get_mock_exam_questions(
        mock_exam_id,
    )


@router.get(
    "/{mock_exam_id}/review",
)
def get_mock_exam_review(
    mock_exam_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Retrieve mock exam review.
    """

    service = MockExamService(db)

    return service.get_review_data(
        mock_exam_id,
    )