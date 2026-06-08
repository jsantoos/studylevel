"""
Hint validator.
"""

from app.core.config import settings

from app.ai.exceptions import (
    AIValidationError,
)


class HintValidator:
    """
    Validates AI-generated hints.
    """

    FORBIDDEN_TERMS = [
        "alternativa correta",
        "resposta correta",
        "opção correta",
        "gabarito",
        "letra a",
        "letra b",
        "letra c",
        "letra d",
        "letra e",
        "primeira alternativa",
        "segunda alternativa",
        "terceira alternativa",
        "quarta alternativa",
        "quinta alternativa",
        ".env",
        "api key",
        "openrouter_api_key",
        "password",
        "senha",
        "token",
        "jwt",
        "system prompt",
        "/etc/passwd",
        "postgres",
        "postgresql",
        "database",
        "banco de dados",
    ]

    @classmethod
    def validate(
        cls,
        hint: str,
    ) -> str:

        text = hint.strip()

        if (
            len(text)
            < settings.AI_MIN_HINT_LENGTH
        ):
            raise AIValidationError(
                "Hint too short."
            )

        if (
            len(text)
            > settings.AI_MAX_HINT_LENGTH
        ):
            raise AIValidationError(
                "Hint too long."
            )

        for term in cls.FORBIDDEN_TERMS:

            if (
                term.lower()
                in text.lower()
            ):
                raise AIValidationError(
                    f"Forbidden term detected: {term}"
                )

        return text
