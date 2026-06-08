"""
Tests for mock exam API.
"""

from tests.factories.question_factory import (
    QuestionFactory,
)

from tests.factories.question_factory import (
    QuestionOptionFactory,
)


def test_mock_exam_flow(
    authenticated_client,
    db,
):
    """
    Should complete
    full mock exam flow.
    """

    client, user = (
        authenticated_client
    )

    question = (
        QuestionFactory()
    )

    option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    create_payload = {
        "question_count": 1,
        "subject": "IA",
        "topic": "LLMs",
        "difficulty": 1,
    }

    create_response = client.post(
        "/mock-exams",
        json=create_payload,
    )

    assert (
        create_response.status_code
        == 200
    )

    mock_exam = (
        create_response.json()
    )

    mock_exam_id = (
        mock_exam["id"]
    )

    answer_payload = {
        "question_id": str(
            question.id,
        ),
        "selected_option_id": str(
            option.id,
        ),
        "response_time": 10,
    }

    answer_response = client.post(
        f"/mock-exams/{mock_exam_id}/answer",
        json=answer_payload,
    )

    assert (
        answer_response.status_code
        == 200
    )

    answer_data = (
        answer_response.json()
    )

    assert (
        answer_data["is_correct"]
        is True
    )

    finish_response = client.post(
        f"/mock-exams/{mock_exam_id}/finish",
    )

    assert (
        finish_response.status_code
        == 200
    )

    finish_data = (
        finish_response.json()
    )

    assert (
        finish_data["score"]
        == 100
    )

    assert (
        finish_data["correct_answers"]
        == 1
    )

    assert (
        finish_data["total_answers"]
        == 1
    )
