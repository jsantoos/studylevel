"""
User answer ORM model.
"""

from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)

mock_exam = relationship(
    "MockExam",
    back_populates="answers",
)


class UserAnswer(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    User answer entity.
    """

    __tablename__ = "user_answers"

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    mock_exam_id: Mapped[UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("mock_exams.id"),
        nullable=True,
    )

    question_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("questions.id"),
        nullable=False,
    )

    selected_option_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("question_options.id"),
        nullable=False,
    )

    is_correct: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    response_time: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    mock_exam = relationship(
        "MockExam",
        back_populates="answers",
    )
