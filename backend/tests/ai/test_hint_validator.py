"""
Tests for HintValidator.
"""

import pytest

from app.ai.validators.hint_validator import (
    HintValidator,
)

from app.ai.exceptions import (
    AIValidationError,
)


FORBIDDEN_HINTS = [
    "A alternativa correta é a letra A.",
    "O gabarito é a opção B.",
    "A resposta correta é C.",
    "A opção correta é D.",
]


@pytest.mark.parametrize(
    "hint",
    FORBIDDEN_HINTS,
)
def test_should_block_answer_reveal(
    hint,
):
    """
    Validator must reject hints
    revealing the answer.
    """

    with pytest.raises(
        AIValidationError,
    ):

        HintValidator.validate(
            hint,
        )
