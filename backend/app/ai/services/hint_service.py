"""
Hint generation service.
"""

from app.ai.prompts.hint_prompt import (
    HINT_SYSTEM_PROMPT,
    build_hint_prompt,
)

from app.ai.validators.hint_validator import (
    HintValidator,
)

from app.ai.context_builders.hint_context_builder import (
    HintContextBuilder,
)

from app.ai.guards.prompt_injection_guard import (
    PromptInjectionGuard,
)

from app.ai.logger import (
    logger,
)

from app.ai.services.ai_execution_service import (
    AIExecutionService,
)

from app.ai.services.ai_telemetry_service import (
    AITelemetryService
)
from app.ai.schemas.ai_telemetry import (
    AITelemetry
)
from app.ai.cache.hint_cache import (
    HintCache,
)
from app.ai.metrics.ai_metrics import (
    AIMetrics
)


class HintService:
    """
    Generates pedagogical hints.
    """

    async def generate_hint(
        self,
        question: str,
        alternatives: list[str],
        difficulty: str,
        subject: str,
    ) -> str:
        """
        Generate a pedagogical hint for a question.
        """

        analysis = (
            PromptInjectionGuard.analyze(
                question,
            )
        )

        if analysis.suspicious:

            logger.warning(
                (
                    "Prompt injection detected | "
                    f"matches={analysis.matches} "
                    f"score={analysis.score}"
                )
            )

            AIMetrics.record_prompt_injection()

        context = (
            HintContextBuilder.build(
                question=question,
                alternatives=alternatives,
                difficulty=difficulty,
                subject=subject,
            )
        )

        user_prompt = (
            build_hint_prompt(
                context,
            )
        )

        try:

            cache_key = HintCache.build_key(
                question=question,
                difficulty=difficulty,
                subject=subject,
            )

            cached_hint = HintCache.get(
                cache_key,
            )

            if cached_hint:

                logger.info(
                    (
                        "Hint cache hit | "
                        f"subject={subject}"
                    )
                )

                AIMetrics.record_cache_hit()

                return cached_hint

            AIMetrics.record_cache_miss()

            result = await (
                AIExecutionService().execute(
                    system_prompt=HINT_SYSTEM_PROMPT,
                    user_prompt=user_prompt,
                    validator=HintValidator,
                )
            )

            AIMetrics.record_request(
                latency_ms=result.latency_ms,
                attempts=result.attempts,
                provider=result.provider,
                model=result.model,
                subject=subject,
                difficulty=difficulty,
            )

            AITelemetryService.record(
                AITelemetry(
                    provider=result.provider,
                    model=result.model,
                    latency_ms=result.latency_ms,
                    attempts=result.attempts,
                    subject=subject,
                    difficulty=difficulty,
                )
            )

            HintCache.set(
                cache_key,
                result.content,
            )

            return result.content

        except Exception as exc:

            logger.exception(
                (
                    "Hint generation exhausted retries | "
                    f"question={question} "
                    f"error={str(exc)}"
                )
            )

            AIMetrics.record_failure()

            return (
                "Analise cuidadosamente os conceitos "
                "apresentados na questão e compare "
                "as alternativas com atenção."
            )
