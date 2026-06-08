"""
Question ORM model.
"""

from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class Question(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    Question entity.
    """

    __tablename__ = "questions"

    statement: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    explanation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    difficulty: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    subject: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    topic: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    bank: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    year: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    options = relationship(
        "QuestionOption",
        back_populates="question",
        cascade="all, delete-orphan",
    )

   