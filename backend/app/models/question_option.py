"""
Question option ORM model.
"""

from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class QuestionOption(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    Question option entity.
    """

    __tablename__ = "question_options"

    question_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("questions.id"),
        nullable=False,
    )

    option_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    is_correct: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    option_order: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    question = relationship(
        "Question",
        back_populates="options",
    )
