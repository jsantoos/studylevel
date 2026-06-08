"""
AI Provider Abstraction.

Defines the contract that every AI provider
(OpenRouter, Ollama, OpenAI, Anthropic, etc.)
must implement.
"""

from abc import ABC
from abc import abstractmethod
from app.ai.schemas.ai_execution_result import (
    AIExecutionResult,
)


class AIProvider(ABC):
    """
    Base AI provider contract.
    """

    @abstractmethod
    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> AIExecutionResult:
        """
        Generate AI completion.

        Parameters
        ----------
        system_prompt : str
            System instructions.

        user_prompt : str
            User content.

        Returns
        -------
        str
            Generated response.
        """
        raise NotImplementedError