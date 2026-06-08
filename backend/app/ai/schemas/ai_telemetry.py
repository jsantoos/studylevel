"""
AI telemetry schema.
"""

from pydantic import BaseModel


class AITelemetry(
    BaseModel,
):
    provider: str

    model: str

    latency_ms: float

    attempts: int

    subject: str

    difficulty: str