"""
Mock exam question association model.
"""

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import Base
from app.models.base import TimestampMixin
from app.models.base import UUIDMixin


class MockExamQuestion(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    Association table between
    mock exams and questions.
    """

    __tablename__ = "mock_exam_questions"

    mock_exam_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("mock_exams.id"),
        nullable=False,
    )

    question_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("questions.id"),
        nullable=False,
    )

    mock_exam = relationship(
        "MockExam",
        back_populates="question_links",
    )

    question = relationship(
        "Question",
    )