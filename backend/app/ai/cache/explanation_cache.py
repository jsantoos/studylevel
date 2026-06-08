"""
Explanation cache helper.
"""

from hashlib import sha256

from app.ai.cache.base import (
    CacheProvider,
)

from app.ai.cache.cache_factory import (
    get_cache,
)


class ExplanationCache:
    """
    Cache abstraction for AI-generated explanations.

    Uses the configured cache provider
    (memory cache today, Redis in the future).
    """

    _cache: CacheProvider = (
        get_cache()
    )

    @classmethod
    def build_key(
        cls,
        question: str,
        selected_answer: str,
        correct_answer: str,
        subject: str,
        difficulty: str,
    ) -> str:
        """
        Generate deterministic cache key.
        """

        payload = (
            f"{question}|"
            f"{selected_answer}|"
            f"{correct_answer}|"
            f"{subject}|"
            f"{difficulty}"
        )

        return sha256(
            payload.encode(
                "utf-8",
            )
        ).hexdigest()

    @classmethod
    def get(
        cls,
        key: str,
    ) -> str | None:
        """
        Retrieve cached explanation.
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
        Store explanation.
        """

        cls._cache.set(
            key,
            value,
        )
