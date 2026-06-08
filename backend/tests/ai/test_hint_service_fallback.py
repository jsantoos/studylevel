from unittest.mock import (
    AsyncMock,
    patch,
)

import pytest

from app.ai.services.hint_service import (
    HintService,
)


@pytest.mark.asyncio
async def test_should_fallback_when_executor_fails():
    """
    Should return fallback when execution fails.
    """

    service = HintService()

    with patch(
        "app.ai.services.hint_service.AIExecutionService.execute",
        new_callable=AsyncMock,
    ) as mock_execute:

        mock_execute.side_effect = Exception(
            "Execution failed",
        )

        hint = await service.generate_hint(
            question="Questão de teste",
            alternatives=[
                "A",
                "B",
                "C",
                "D",
            ],
            difficulty="hard",
            subject="Injection",
        )

        assert (
            hint
            ==
            "Analise cuidadosamente os conceitos "
            "apresentados na questão e compare "
            "as alternativas com atenção."
        )
