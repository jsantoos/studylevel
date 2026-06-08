"""
AI telemetry service.
"""

from app.ai.logger import (
    logger,
)

from app.ai.schemas.ai_telemetry import (
    AITelemetry,
)


class AITelemetryService:
    """
    Records AI execution telemetry.
    """

    @staticmethod
    def record(
        telemetry: AITelemetry,
    ) -> None:

        logger.info(
            "AI telemetry",
            extra={
                "provider": telemetry.provider,
                "model": telemetry.model,
                "latency_ms": telemetry.latency_ms,
                "attempts": telemetry.attempts,
                "subject": telemetry.subject,
                "difficulty": telemetry.difficulty,
            },
        )
