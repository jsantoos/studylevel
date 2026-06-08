"""
AI metrics collector.
"""


class AIMetrics:
    """
    In-memory AI metrics.
    """

    total_requests = 0

    total_failures = 0

    total_prompt_injections = 0

    cache_hits = 0

    cache_misses = 0

    total_latency_ms = 0.0

    total_attempts = 0

    rate_limit_blocks = 0

    provider_usage: dict[str, int] = {}

    model_usage: dict[str, int] = {}

    subject_usage: dict[str, int] = {}

    difficulty_usage: dict[str, int] = {}

    @classmethod
    def record_request(
        cls,
        latency_ms: float,
        attempts: int,
        provider: str,
        model: str,
        subject: str,
        difficulty: str,
    ) -> None:

        cls.total_requests += 1

        cls.total_latency_ms += (
            latency_ms
        )

        cls.total_attempts += (
            attempts
        )

        cls.increment_counter(
            cls.provider_usage,
            provider,
        )

        cls.increment_counter(
            cls.model_usage,
            model,
        )

        cls.increment_counter(
            cls.subject_usage,
            subject,
        )

        cls.increment_counter(
            cls.difficulty_usage,
            difficulty,
        )

    @classmethod
    def record_failure(
        cls,
    ) -> None:

        cls.total_failures += 1

    @classmethod
    def record_prompt_injection(
        cls,
    ) -> None:

        cls.total_prompt_injections += 1

    @classmethod
    def record_cache_hit(
        cls,
    ) -> None:

        cls.cache_hits += 1

    @classmethod
    def record_cache_miss(
        cls,
    ) -> None:

        cls.cache_misses += 1

    @classmethod
    def increment_counter(
        cls,
        counter: dict[str, int],
        key: str,
    ) -> None:

        counter[key] = (
            counter.get(
                key,
                0,
            )
            + 1
        )

    @classmethod
    def record_rate_limit_block(
        cls,
    ) -> None:

        cls.rate_limit_blocks += 1
