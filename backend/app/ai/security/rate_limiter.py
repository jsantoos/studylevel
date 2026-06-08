"""
AI rate limiter.
"""

from datetime import datetime
from datetime import timedelta
from app.core.config import (
    settings,
)
from datetime import UTC


class AIRateLimiter:
    """
    Simple in-memory rate limiter.
    """

    _requests: dict[str, list[datetime]] = {}

    MAX_PER_MINUTE = (
        settings.AI_MAX_HINTS_PER_MINUTE
    )

    @classmethod
    def allow(
        cls,
        user_id: str,
    ) -> bool:

        now = datetime.now(
            UTC,
        )

        window = now - timedelta(
            minutes=1,
        )

        history = cls._requests.get(
            user_id,
            [],
        )

        history = [
            item
            for item in history
            if item > window
        ]

        if (
            len(history)
            >= cls.MAX_PER_MINUTE
        ):
            return False

        history.append(
            now,
        )

        cls._requests[
            user_id
        ] = history

        return True
