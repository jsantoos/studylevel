"""
Unit tests for AIRateLimiter.
"""

from datetime import datetime
from datetime import timedelta

from app.ai.security.rate_limiter import (
    AIRateLimiter,
)
from datetime import UTC


def setup_function():
    """
    Reset limiter state before each test.
    """

    AIRateLimiter._requests.clear()


def test_should_allow_first_request():
    """
    Should allow first request.
    """

    assert AIRateLimiter.allow(
        "user-1",
    )


def test_should_block_when_limit_is_reached():
    """
    Should block requests after
    reaching configured limit.
    """

    user_id = "user-1"

    for _ in range(
        AIRateLimiter.MAX_PER_MINUTE
    ):
        assert AIRateLimiter.allow(
            user_id,
        )

    assert not AIRateLimiter.allow(
        user_id,
    )


def test_should_remove_expired_requests():
    """
    Should ignore requests older
    than one minute.
    """

    user_id = "user-1"

    AIRateLimiter._requests[
        user_id
    ] = [
        datetime.now(
            UTC,
        )
        - timedelta(minutes=2)
    ]

    assert AIRateLimiter.allow(
        user_id,
    )

    assert (
        len(
            AIRateLimiter._requests[
                user_id
            ]
        )
        == 1
    )
