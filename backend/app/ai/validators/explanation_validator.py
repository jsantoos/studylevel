"""
Explanation validator.
"""

from app.ai.exceptions import (
    AIValidationError,
)


class ExplanationValidator:
    """
    Validates explanations.
    """

    MIN_LENGTH = 50

    MAX_LENGTH = 2000

    FORBIDDEN_TERMS = [
        "system prompt",
        "api key",
        ".env",
        "/etc/passwd",
    ]

    @classmethod
    def validate(
        cls,
        text: str,
    ) -> str:

        text = text.strip()

        if len(text) < cls.MIN_LENGTH:

            raise AIValidationError(
                "Explanation too short."
            )

        if len(text) > cls.MAX_LENGTH:

            raise AIValidationError(
                "Explanation too long."
            )

        for term in cls.FORBIDDEN_TERMS:

            if term.lower() in text.lower():

                raise AIValidationError(
                    f"Forbidden term detected: {term}"
                )

        return text
