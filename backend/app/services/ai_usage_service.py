"""
AI usage service.
"""

import uuid

from sqlalchemy.orm import Session

from app.models.ai_usage_log import (
    AIUsageLog,
)


class AIUsageService:
    """
    Service responsible for recording AI usage.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:
        """
        Initialize service.
        """

        self.db = db

    def record_usage(
        self,
        user_id: uuid.UUID,
        feature_type: str,
    ) -> None:
        """
        Record AI feature usage.
        """

        log = AIUsageLog(
            user_id=user_id,
            feature_type=feature_type,
        )

        self.db.add(
            log,
        )

        self.db.commit()
