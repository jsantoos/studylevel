from unittest.mock import (
    AsyncMock,
    patch,
)

import pytest

from app.ai.exceptions import (
    AIValidationError,
)

from app.ai.schemas.ai_execution_result import (
    AIExecutionResult,
)

from app.ai.services.ai_execution_service import (
    AIExecutionService,
)


class MockValidator:
    """
    Validator used for retry testing.
    """

    calls = 0

    @classmethod
    def validate(
        cls,
        text: str,
    ) -> str:

        cls.calls += 1

        if cls.calls < 3:

            raise AIValidationError(
                "Invalid hint",
            )

        return text


@pytest.mark.asyncio
async def test_should_retry_until_success():
    """
    Should retry until validation succeeds.
    """

    MockValidator.calls = 0

    service = (
        AIExecutionService()
    )

    with patch(
        "app.ai.services.ai_execution_service.get_provider",
    ) as mock_get_provider:

        mock_provider = AsyncMock()

        mock_provider.generate.return_value = (
            AIExecutionResult(
                content=(
                    "Pense nos conceitos "
                    "centrais da questão."
                ),
                latency_ms=100,
                attempts=1,
                provider="test",
                model="test",
            )
        )

        mock_get_provider.return_value = (
            mock_provider
        )

        result = await (
            service.execute(
                system_prompt="system",
                user_prompt="user",
                validator=MockValidator,
            )
        )

        assert (
            result.content
            ==
            "Pense nos conceitos "
            "centrais da questão."
        )

        assert (
            result.attempts
            == 3
        )

        assert (
            mock_provider.generate.call_count
            == 3
        )
