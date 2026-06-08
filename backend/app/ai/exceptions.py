"""
AI custom exceptions.
"""


class AIError(Exception):
    """
    Base AI exception.
    """


class AIProviderError(AIError):
    """
    AI provider communication error.
    """


class AIValidationError(AIError):
    """
    AI response validation error.
    """
