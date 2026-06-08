"""
In-memory cache for AI hints.
"""

from hashlib import sha256
from app.ai.cache.cache_factory import (
    get_cache,
)
from app.ai.cache.base import (
    CacheProvider,
)


class HintCache:
    """
    Simple in-memory hint cache.
    """

    _cache: CacheProvider = get_cache()

    @classmethod
    def build_key(
        cls,
        question: str,
        difficulty: str,
        subject: str,
    ) -> str:
        """
        Generate deterministic cache key.
        """

        payload = (
            f"{question}|"
            f"{difficulty}|"
            f"{subject}"
        )

        return sha256(
            payload.encode()
        ).hexdigest()

    @classmethod
    def get(
        cls,
        key: str,
    ) -> str | None:
        """
        Retrieve cached hint.
        """

        return cls._cache.get(
            key,
        )

    @classmethod
    def set(
        cls,
        key: str,
        value: str,
    ) -> None:
        """
        Store hint.
        """

        cls._cache.set(
            key,
            value,
        )
