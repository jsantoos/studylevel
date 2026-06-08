"""
Daily mission model.
"""

from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import Base

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class DailyMission(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    Daily mission definition.
    """

    __tablename__ = (
        "daily_missions"
    )

    title: Mapped[str] = (
        mapped_column(
            String,
            nullable=False,
        )
    )

    mission_type: Mapped[str] = (
        mapped_column(
            String,
            nullable=False,
        )
    )

    goal: Mapped[int] = (
        mapped_column(
            Integer,
            nullable=False,
        )
    )

    reward_xp: Mapped[int] = (
        mapped_column(
            Integer,
            nullable=False,
        )
    )
