import pytest

from app.ai.exceptions import (
    AIValidationError,
)

from app.ai.validators.explanation_validator import (
    ExplanationValidator,
)


def test_should_accept_valid_explanation():
    """
    Should accept valid explanation.
    """

    text = (
        "A alternativa correta está relacionada "
        "ao conceito principal apresentado na "
        "questão e explica adequadamente o tema."
    )

    assert (
        ExplanationValidator.validate(
            text,
        )
        == text
    )


def test_should_reject_short_explanation():
    """
    Should reject short explanation.
    """

    with pytest.raises(
        AIValidationError,
    ):

        ExplanationValidator.validate(
            "curta",
        )


def test_should_reject_forbidden_term():
    """
    Should reject forbidden terms.
    """

    with pytest.raises(
        AIValidationError,
    ):

        ExplanationValidator.validate(
            "system prompt",
        )
