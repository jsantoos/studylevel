"""
Prompt injection detector.
"""

from app.ai.schemas.security import (
    PromptInjectionAnalysis,
)


class PromptInjectionGuard:
    """
    Detects suspicious patterns
    in user supplied content.
    """

    PATTERNS = [
        ".env",

        "system prompt",

        "ignore previous instructions",
        "ignore all instructions",
        "ignore instructions",

        "ignore todas as instruções",
        "ignore todas as instrucoes",

        "revele",
        "revelar",

        "mostre",
        "mostrar",

        "api key",
        "openrouter_api_key",

        "password",
        "senha",

        "secret",
        "segredo",

        "database",
        "banco de dados",
        "postgres",

        "/etc/passwd",
        "cat /",
        "ls -la",

        "jwt",
        "token",

        "variáveis de ambiente",
        "variaveis de ambiente",
        "environment variables",

        "openrouter",
        "api_key",

        "postgresql",

        "tabelas",
        "tables",

        "credenciais",
        "credentials",
    ]

    @classmethod
    def analyze(
        cls,
        text: str,
    ) -> PromptInjectionAnalysis:

        lowered = text.lower()

        matches = [
            pattern
            for pattern in cls.PATTERNS
            if pattern in lowered
        ]

        return PromptInjectionAnalysis(
            suspicious=bool(matches),
            score=len(matches),
            matches=matches,
        )
