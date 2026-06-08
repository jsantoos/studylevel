"""
Ollama provider implementation.

Temporary stub.
"""

from app.ai.providers.base import (
    AIProvider,
)


class OllamaProvider(
    AIProvider,
):
    """
    Ollama provider.
    """

    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> str:
        raise NotImplementedError(
            "Ollama provider not implemented yet."
        )
