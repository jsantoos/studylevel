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


class AlwaysFailValidator:
    """
    Validator that always fails.
    """

    @classmethod
    def validate(
        cls,
        text: str,
    ) -> str:

        raise AIValidationError(
            "Invalid hint",
        )


@pytest.mark.asyncio
async def test_should_raise_after_exhausting_retries():
    """
    Should raise the last exception
    after all retries fail.
    """

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
                    "A alternativa correta "
                    "é a letra C."
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

        with pytest.raises(
            AIValidationError,
        ):

            await service.execute(
                system_prompt="system",
                user_prompt="user",
                validator=AlwaysFailValidator,
            )

        assert (
            mock_provider.generate.call_count
            == 3
        )
