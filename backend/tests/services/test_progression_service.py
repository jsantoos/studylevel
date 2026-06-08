"""
Tests for progression service.
"""

from uuid import uuid4

from app.services.progression_service import (
    ProgressionService,
)


def test_award_correct_question_xp(
    db,
):
    """
    Should award XP for
    correct answers.
    """

    service = ProgressionService(
        db=db,
    )

    progress = (
        service.award_question_xp(
            user_id=uuid4(),
            is_correct=True,
        )
    )

    assert progress.xp == 10

    assert (
        progress.total_questions
        == 1
    )

    assert (
        progress.correct_questions
        == 1
    )

    assert progress.level == 1


def test_award_wrong_question_xp(
    db,
):
    """
    Should award XP for
    wrong answers.
    """

    service = ProgressionService(
        db=db,
    )

    progress = (
        service.award_question_xp(
            user_id=uuid4(),
            is_correct=False,
        )
    )

    assert progress.xp == 2

    assert (
        progress.total_questions
        == 1
    )

    assert (
        progress.correct_questions
        == 0
    )


def test_level_up(
    db,
):
    """
    Should level up user.
    """

    service = ProgressionService(
        db=db,
    )

    user_id = uuid4()

    for _ in range(50):

        progress = (
            service.award_question_xp(
                user_id=user_id,
                is_correct=True,
            )
        )

    assert progress.xp == 500

    assert progress.level == 2
