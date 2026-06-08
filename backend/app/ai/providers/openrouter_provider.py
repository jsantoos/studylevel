"""
OpenRouter provider implementation.
"""

from __future__ import annotations

import httpx
import time
from app.ai.logger import logger

from app.ai.exceptions import (
    AIProviderError,
)
from app.core.config import settings
from app.ai.providers.base import AIProvider
from app.ai.schemas.ai_execution_result import (
    AIExecutionResult,
)


class OpenRouterProvider(AIProvider):
    """
    OpenRouter AI provider.
    """

    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> str:

        started_at = time.perf_counter()

        try:

            async with httpx.AsyncClient(
                timeout=settings.AI_TIMEOUT_SECONDS,
            ) as client:

                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": (
                            f"Bearer "
                            f"{settings.OPENROUTER_API_KEY}"
                        ),
                        "Content-Type":
                            "application/json",
                    },
                    json={
                        "model":
                            settings.OPENROUTER_MODEL,
                        "messages": [
                            {
                                "role": "system",
                                "content":
                                    system_prompt,
                            },
                            {
                                "role": "user",
                                "content":
                                    user_prompt,
                            },
                        ],
                    },
                )

                response.raise_for_status()

                payload = response.json()

                choices = payload.get(
                    "choices",
                    [],
                )

                if not choices:
                    raise AIProviderError(
                        "OpenRouter returned no choices."
                    )

                elapsed = (
                    time.perf_counter()
                    - started_at
                )

                logger.info(
                    "AI request completed",
                    extra={
                        "provider":
                            "openrouter",
                        "model":
                            settings.OPENROUTER_MODEL,
                        "latency_seconds":
                            round(elapsed, 2),
                    },
                )

                return AIExecutionResult(
                    content=choices[0][
                        "message"
                    ][
                        "content"
                    ],
                    attempts=1,
                    latency_ms=round(
                        elapsed * 1000,
                        2,
                    ),
                    provider="openrouter",
                    model=settings.OPENROUTER_MODEL,
                )

        except Exception as exc:

            logger.exception(
                (
                    "OpenRouter request failed | "
                    f"model={settings.OPENROUTER_MODEL}"
                )
            )

            raise AIProviderError(
                str(exc),
            ) from exc
