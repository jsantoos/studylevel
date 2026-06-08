"""
User daily mission model.
"""

from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import Base
from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class UserDailyMission(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    User daily mission progress.
    """

    __tablename__ = (
        "user_daily_missions"
    )

    user_id: Mapped[str] = (
        mapped_column(
            ForeignKey(
                "users.id",
            ),
            nullable=False,
        )
    )

    mission_id: Mapped[str] = (
        mapped_column(
            ForeignKey(
                "daily_missions.id",
            ),
            nullable=False,
        )
    )

    progress: Mapped[int] = (
        mapped_column(
            Integer,
            default=0,
            nullable=False,
        )
    )

    completed: Mapped[bool] = (
        mapped_column(
            Boolean,
            default=False,
            nullable=False,
        )
    )

    completed_at: Mapped[
        datetime | None
    ] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    mission = relationship(
        "DailyMission",
    )
