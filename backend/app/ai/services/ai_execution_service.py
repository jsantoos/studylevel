"""
Generic AI execution service.
"""

from app.ai.factories.provider_factory import (
    get_provider,
)

from app.ai.logger import (
    logger,
)

from app.core.config import (
    settings,
)

from app.ai.schemas.ai_execution_result import (
    AIExecutionResult,
)


class AIExecutionService:
    """
    Centralized AI execution orchestration.

    Responsibilities
    ----------------
    - Execute provider calls
    - Apply retries
    - Execute validators
    - Emit telemetry
    """

    async def execute(
        self,
        system_prompt: str,
        user_prompt: str,
        validator,
    ) -> AIExecutionResult:

        provider = get_provider()

        last_exception = None

        for attempt in range(
            settings.AI_MAX_RETRIES,
        ):

            try:

                result = await (
                    provider.generate(
                        system_prompt=system_prompt,
                        user_prompt=user_prompt,
                    )
                )

                validator.validate(
                    result.content,
                )

                result.attempts = (
                    attempt + 1
                )

                logger.info(
                    (
                        "AI execution succeeded | "
                        f"provider={result.provider} "
                        f"model={result.model} "
                        f"attempts={result.attempts} "
                        f"latency_ms={result.latency_ms}"
                    )
                )

                return result

            except Exception as exc:

                last_exception = exc

                logger.warning(
                    (
                        "AI execution failed | "
                        f"attempt={attempt + 1} "
                        f"error_type={type(exc).__name__} "
                        f"error={str(exc)}"
                    )
                )

        raise last_exception
