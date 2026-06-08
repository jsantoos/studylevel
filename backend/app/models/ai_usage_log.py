"""
AI usage log model.
"""

import uuid

from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class AIUsageLog(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    AI usage log entity.

    Stores user-level AI feature usage.
    """

    __tablename__ = "ai_usage_logs"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "users.id",
        ),
        nullable=False,
        index=True,
    )

    feature_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )
