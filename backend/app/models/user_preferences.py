"""
User preferences ORM model.
"""

from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import JSON
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    TimestampMixin,
)

from app.models.user import User


class UserPreferences(
    TimestampMixin,
    Base,
):
    """
    User preferences model.
    """

    __tablename__ = "user_preferences"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),

        ForeignKey(
            "users.id",
        ),

        primary_key=True,
    )

    study_goal_minutes: Mapped[int] = (
        mapped_column(
            Integer,
            default=30,
        )
    )

    favorite_subjects: Mapped[list[str]] = (
        mapped_column(
            JSON,
            default=list,
        )
    )

    preferred_difficulty: Mapped[str] = (
        mapped_column(
            String,
            default="medium",
        )
    )

    focus_mode_enabled: Mapped[bool] = (
        mapped_column(
            Boolean,
            default=False,
        )
    )

    notifications_enabled: Mapped[bool] = (
        mapped_column(
            Boolean,
            default=True,
        )
    )

    theme: Mapped[str] = mapped_column(
        String,
        default="light",
    )

    user = relationship(
        User,
        backref="preferences",
    )