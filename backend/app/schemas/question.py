"""
Question schemas.
"""

from uuid import UUID

from pydantic import BaseModel


class QuestionOptionCreate(BaseModel):
    """
    Question option payload.
    """

    option_text: str
    is_correct: bool
    option_order: int


class QuestionCreate(BaseModel):
    """
    Question creation payload.
    """

    statement: str
    explanation: str | None = None
    difficulty: int = 1
    subject: str
    topic: str
    bank: str | None = None
    year: int | None = None

    options: list[QuestionOptionCreate]


class QuestionOptionResponse(BaseModel):
    """
    Question option response.
    """

    id: UUID
    option_text: str
    option_order: int

    class Config:
        from_attributes = True


class QuestionResponse(BaseModel):
    """
    Question response schema.
    """

    id: UUID
    statement: str
    explanation: str | None
    difficulty: int
    subject: str
    topic: str
    bank: str | None
    year: int | None

    options: list[QuestionOptionResponse]

    class Config:
        from_attributes = True


class AnswerQuestionRequest(BaseModel):
    """
    Question answer payload.
    """

    question_id: UUID
    option_id: UUID
    response_time: int | None = None
