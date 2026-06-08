"""
Explanation generation service.
"""

from app.ai.cache.explanation_cache import (
    ExplanationCache,
)

from app.ai.context_builders.explanation_context_builder import (
    ExplanationContextBuilder,
)

from app.ai.guards.prompt_injection_guard import (
    PromptInjectionGuard,
)

from app.ai.logger import (
    logger,
)

from app.ai.metrics.ai_metrics import (
    AIMetrics,
)

from app.ai.prompts.explanation_prompt import (
    EXPLANATION_SYSTEM_PROMPT,
    build_explanation_prompt,
)

from app.ai.schemas.ai_telemetry import (
    AITelemetry,
)

from app.ai.services.ai_execution_service import (
    AIExecutionService,
)

from app.ai.services.ai_telemetry_service import (
    AITelemetryService,
)

from app.ai.validators.explanation_validator import (
    ExplanationValidator,
)


class ExplanationService:
    """
    Generates pedagogical explanations.
    """

    async def generate_explanation(
        self,
        question: str,
        selected_answer: str,
        correct_answer: str,
        subject: str,
        difficulty: str,
    ) -> str:
        """
        Generate explanation.
        """

        analysis = (
            PromptInjectionGuard.analyze(
                question,
            )
        )

        if analysis.suspicious:

            AIMetrics.record_prompt_injection()

            logger.warning(
                (
                    "Prompt injection detected | "
                    f"matches={analysis.matches} "
                    f"score={analysis.score}"
                )
            )

        cache_key = (
            ExplanationCache.build_key(
                question=question,
                selected_answer=selected_answer,
                correct_answer=correct_answer,
                subject=subject,
                difficulty=difficulty,
            )
        )

        cached = (
            ExplanationCache.get(
                cache_key,
            )
        )

        if cached:

            AIMetrics.record_cache_hit()

            logger.info(
                "Explanation cache hit"
            )

            return cached

        AIMetrics.record_cache_miss()

        context = (
            ExplanationContextBuilder.build(
                question=question,
                selected_answer=selected_answer,
                correct_answer=correct_answer,
                subject=subject,
                difficulty=difficulty,
            )
        )

        try:

            result = await (
                AIExecutionService().execute(
                    system_prompt=(
                        EXPLANATION_SYSTEM_PROMPT
                    ),
                    user_prompt=(
                        build_explanation_prompt(
                            context,
                        )
                    ),
                    validator=(
                        ExplanationValidator
                    ),
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

            ExplanationCache.set(
                cache_key,
                result.content,
            )

            return result.content

        except Exception as exc:

            AIMetrics.record_failure()

            logger.exception(
                (
                    "Explanation generation failed | "
                    f"error={str(exc)}"
                )
            )

            return (
                "Revise os conceitos centrais da questão "
                "e compare cuidadosamente a resposta "
                "escolhida com a resposta correta."
            )