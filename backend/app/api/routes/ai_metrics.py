from fastapi import (
    APIRouter,
)

from app.ai.metrics.ai_metrics import (
    AIMetrics,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.get(
    "/metrics",
)
def metrics():

    avg_latency = 0

    avg_attempts = 0

    hit_ratio = 0

    total_cache_ops = (
        AIMetrics.cache_hits
        +
        AIMetrics.cache_misses
    )

    if total_cache_ops:

        hit_ratio = round(
            (
                AIMetrics.cache_hits
                /
                total_cache_ops
            ) * 100,
            2,
        )

    if AIMetrics.total_requests:

        avg_latency = (
            AIMetrics.total_latency_ms
            /
            AIMetrics.total_requests
        )

        avg_attempts = (
            AIMetrics.total_attempts
            /
            AIMetrics.total_requests
        )

    return {
        "total_requests":
            AIMetrics.total_requests,

        "total_failures":
            AIMetrics.total_failures,

        "prompt_injections":
            AIMetrics.total_prompt_injections,

        "cache_hits":
            AIMetrics.cache_hits,

        "cache_misses":
            AIMetrics.cache_misses,

        "avg_latency_ms":
            round(
                avg_latency,
                2,
            ),

        "avg_attempts":
            round(
                avg_attempts,
                2,
            ),

        "cache_hit_ratio": hit_ratio,

        "provider_usage":
            AIMetrics.provider_usage,

        "model_usage":
            AIMetrics.model_usage,

        "subject_usage":
            AIMetrics.subject_usage,

        "difficulty_usage":
            AIMetrics.difficulty_usage,
    }
