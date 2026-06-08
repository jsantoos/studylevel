"""
Tests for user progress API.
"""

from app.services.progression_service import (
    ProgressionService,
)


def test_get_user_progress(
    authenticated_client,
    db,
):
    """
    Should retrieve
    user progress.
    """

    client, user = (
        authenticated_client
    )

    progression_service = (
        ProgressionService(
            db,
        )
    )

    progression_service.award_question_xp(
        user_id=user.id,
        is_correct=True,
    )

    response = client.get(
        "/users/me/progress",
    )

    assert response.status_code == 200

    data = response.json()

    assert data["xp"] == 10

    assert data["level"] == 1

    assert (
        data["total_questions"]
        == 1
    )

    assert (
        data["correct_questions"]
        == 1
    )
