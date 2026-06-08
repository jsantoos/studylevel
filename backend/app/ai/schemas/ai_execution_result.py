from pydantic import BaseModel


class AIExecutionResult(
    BaseModel,
):
    content: str

    latency_ms: float

    attempts: int

    provider: str

    model: str

    cached: bool = False
