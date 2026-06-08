"""
Tests for AI routes.
"""

from unittest.mock import (
    AsyncMock,
    patch,
)

from tests.factories.question_factory import (
    QuestionFactory,
)

from tests.factories.question_factory import (
    QuestionOptionFactory,
)


def test_should_return_database_explanation(
    authenticated_client,
):
    """
    Should return database explanation
    when question already has one.
    """

    client, _ = (
        authenticated_client
    )

    question = QuestionFactory(
        explanation=(
            "Official explanation"
        ),
    )

    option = QuestionOptionFactory(
        question=question,
        is_correct=True,
    )

    response = client.post(
        "/ai/explanation",
        json={
            "question_id": str(
                question.id,
            ),
            "selected_option_id": str(
                option.id,
            ),
        },
    )

    assert (
        response.status_code
        == 200
    )

    data = response.json()

    assert (
        data["source"]
        == "database"
    )

    assert (
        data["explanation"]
        == "Official explanation"
    )


def test_should_return_ai_explanation(
    authenticated_client,
):
    """
    Should generate AI explanation
    when force_ai is enabled.
    """

    client, _ = (
        authenticated_client
    )

    question = QuestionFactory(
        explanation="Official",
    )

    correct_option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    with patch(
        (
            "app.api.routes.ai."
            "explanation_service."
            "generate_explanation"
        ),
        new_callable=AsyncMock,
    ) as mock_generate:

        mock_generate.return_value = (
            "AI explanation"
        )

        response = client.post(
            "/ai/explanation",
            json={
                "question_id": str(
                    question.id,
                ),
                "selected_option_id": str(
                    correct_option.id,
                ),
                "force_ai": True,
            },
        )

    assert (
        response.status_code
        == 200
    )

    data = response.json()

    assert (
        data["source"]
        == "ai"
    )

    assert (
        data["explanation"]
        == "AI explanation"
    )


def test_should_return_400_when_option_belongs_to_other_question(
    authenticated_client,
):
    """
    Should return 400 when option
    belongs to another question.
    """

    client, _ = (
        authenticated_client
    )

    question_1 = (
        QuestionFactory()
    )

    question_2 = (
        QuestionFactory()
    )

    option = QuestionOptionFactory(
        question=question_2,
        is_correct=True,
    )

    response = client.post(
        "/ai/explanation",
        json={
            "question_id": str(
                question_1.id,
            ),
            "selected_option_id": str(
                option.id,
            ),
        },
    )

    assert (
        response.status_code
        == 400
    )


def test_should_return_404_when_question_not_found(
    authenticated_client,
):
    """
    Should return 404 when
    question does not exist.
    """

    client, _ = (
        authenticated_client
    )

    response = client.post(
        "/ai/explanation",
        json={
            "question_id": (
                "11111111-1111-1111-1111-111111111111"
            ),
            "selected_option_id": (
                "22222222-2222-2222-2222-222222222222"
            ),
        },
    )

    assert (
        response.status_code
        == 404
    )


def test_should_return_429_when_rate_limit_is_reached(
    authenticated_client,
):
    """
    Should return 429 when
    user exceeds rate limit.
    """

    client, _ = (
        authenticated_client
    )

    question = QuestionFactory(
        explanation="Explanation",
    )

    option = QuestionOptionFactory(
        question=question,
        is_correct=True,
    )

    with patch(
        "app.api.routes.ai.AIRateLimiter.allow",
        return_value=False,
    ):

        response = client.post(
            "/ai/explanation",
            json={
                "question_id": str(
                    question.id,
                ),
                "selected_option_id": str(
                    option.id,
                ),
            },
        )

    assert (
        response.status_code
        == 429
    )
