"""
Mock exam schemas.
"""

from uuid import UUID

from pydantic import BaseModel
from app.schemas.question import QuestionOptionResponse


class MockExamCreate(BaseModel):
    """
    Mock exam creation payload.
    """

    question_count: int = 10
    subject: str | None = None
    topic: str | None = None
    difficulty: int | None = None


class MockExamQuestionResponse(BaseModel):
    """
    Mock exam question response.
    """

    id: UUID

    statement: str

    explanation: str | None = None

    subject: str

    topic: str

    difficulty: int

    options: list[
        QuestionOptionResponse
    ]

    class Config:
        from_attributes = True


class MockExamResponse(BaseModel):
    """
    Mock exam response schema.
    """

    id: UUID
    score: float | None

    class Config:
        from_attributes = True


class SubmitAnswerPayload(BaseModel):
    """
    Submit answer payload.
    """

    question_id: UUID
    selected_option_id: UUID
    response_time: int | None = None
