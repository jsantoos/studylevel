"""
Cache factory.
"""

from app.ai.cache.memory_cache import (
    MemoryCache,
)


def get_cache():
    """
    Return configured cache.
    """

    return MemoryCache()
