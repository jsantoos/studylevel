"""
Progression service layer.
"""

from app.repositories.user_progress_repository import (
    UserProgressRepository,
)
from datetime import date
from datetime import timedelta


class ProgressionService:
    """
    User progression business rules.
    """

    QUESTION_CORRECT_XP = 10

    QUESTION_WRONG_XP = 2

    EXAM_FINISHED_XP = 50

    PERFECT_EXAM_BONUS = 100

    LEVEL_DIVISOR = 500

    def __init__(
        self,
        db,
    ):
        self.repository = (
            UserProgressRepository(db)
        )

    def get_or_create_progress(
        self,
        user_id,
    ):
        """
        Retrieve or create progression.
        """

        progress = (
            self.repository.get_by_user_id(
                user_id,
            )
        )

        today = date.today()

        if progress.last_activity_date is None:

            progress.streak_days = 1

        elif progress.last_activity_date == today:

            pass

        elif progress.last_activity_date == (
            today - timedelta(days=1)
        ):

            progress.streak_days += 1

        else:

            progress.streak_days = 1

        progress.last_activity_date = today

        if progress.streak_days > getattr(
            progress,
            "best_streak_days",
            0,
        ):
            progress.best_streak_days = (
                progress.streak_days
            )

        if not progress:

            progress = (
                self.repository.create_progress(
                    user_id,
                )
            )

        return progress

    def calculate_level(
        self,
        xp: int,
    ) -> int:
        """
        Calculate user level.
        """

        return (
            xp
            // self.LEVEL_DIVISOR
        ) + 1

    def award_question_xp(
        self,
        *,
        user_id,
        is_correct: bool,
    ):
        """
        Award question XP.
        """

        progress = (
            self.get_or_create_progress(
                user_id,
            )
        )

        earned_xp = (
            self.QUESTION_CORRECT_XP
            if is_correct
            else self.QUESTION_WRONG_XP
        )

        progress.xp += earned_xp

        progress.total_questions += 1

        if is_correct:

            progress.correct_questions += 1

        progress.level = (
            self.calculate_level(
                progress.xp,
            )
        )

        self.repository.save(
            progress,
        )

        return progress

    def award_exam_xp(
        self,
        *,
        user_id,
        score: float,
    ):
        """
        Award mock exam XP.
        """

        progress = (
            self.get_or_create_progress(
                user_id,
            )
        )

        progress.xp += (
            self.EXAM_FINISHED_XP
        )

        progress.total_mock_exams += 1

        if score == 100:

            progress.xp += (
                self.PERFECT_EXAM_BONUS
            )

        progress.level = (
            self.calculate_level(
                progress.xp,
            )
        )

        self.repository.save(
            progress,
        )

        return progress
