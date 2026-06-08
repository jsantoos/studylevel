"""
Cache provider abstraction.
"""

from abc import (
    ABC,
    abstractmethod,
)


class CacheProvider(
    ABC,
):
    """
    Base cache provider.
    """

    @abstractmethod
    def get(
        self,
        key: str,
    ) -> str | None:
        pass

    @abstractmethod
    def set(
        self,
        key: str,
        value: str,
    ) -> None:
        pass