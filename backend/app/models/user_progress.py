"""
User progression model.
"""

from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import Date

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class UserProgress(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    User progression entity.
    """

    __tablename__ = "user_progress"

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    xp: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    level: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False,
    )

    streak_days: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    total_questions: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    correct_questions: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    total_mock_exams: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="progress",
    )

    last_activity_date = mapped_column(
        Date,
        nullable=True,
    )
