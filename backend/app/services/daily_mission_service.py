"""
Daily mission service layer.
"""

from datetime import datetime
from datetime import UTC

from app.repositories.daily_mission_repository import (
    DailyMissionRepository,
)

from app.services.progression_service import (
    ProgressionService,
)


class DailyMissionService:
    """
    Daily mission business rules.
    """

    ANSWER_QUESTIONS = (
        "ANSWER_QUESTIONS"
    )

    CORRECT_QUESTIONS = (
        "CORRECT_QUESTIONS"
    )

    COMPLETE_EXAMS = (
        "COMPLETE_EXAMS"
    )

    def __init__(
        self,
        db,
    ):
        self.repository = (
            DailyMissionRepository(
                db,
            )
        )

        self.progression_service = (
            ProgressionService(
                db,
            )
        )

    def process_question_answer(
        self,
        *,
        user_id,
        is_correct: bool,
    ):
        """
        Process question answer missions.
        """

        missions = (
            self.repository.list_missions()
        )

        for mission in missions:

            should_progress = False

            if (
                mission.mission_type
                == self.ANSWER_QUESTIONS
            ):
                should_progress = True

            elif (
                mission.mission_type
                == self.CORRECT_QUESTIONS
                and is_correct
            ):
                should_progress = True

            if not should_progress:
                continue

            self._increment_progress(
                user_id=user_id,
                mission=mission,
            )

    def process_exam_completed(
        self,
        *,
        user_id,
    ):
        """
        Process exam completion missions.
        """

        missions = (
            self.repository.list_missions()
        )

        for mission in missions:

            if (
                mission.mission_type
                != self.COMPLETE_EXAMS
            ):
                continue

            self._increment_progress(
                user_id=user_id,
                mission=mission,
            )

    def _increment_progress(
        self,
        *,
        user_id,
        mission,
    ):
        """
        Increment mission progress.
        """

        user_mission = (
            self.repository.get_user_mission(
                user_id=user_id,
                mission_id=mission.id,
            )
        )

        if not user_mission:

            user_mission = (
                self.repository.create_user_mission(
                    user_id=user_id,
                    mission_id=mission.id,
                )
            )

        if user_mission.completed:
            return

        user_mission.progress += 1

        if (
            user_mission.progress
            >= mission.goal
        ):
            user_mission.completed = True

            user_mission.completed_at = (
                datetime.now(
                    UTC,
                )
            )

            progress = (
                self.progression_service
                .get_or_create_progress(
                    user_id,
                )
            )

            progress.xp += (
                mission.reward_xp
            )

            progress.level = (
                self.progression_service
                .calculate_level(
                    progress.xp,
                )
            )

            self.progression_service.repository.save(
                progress,
            )

        self.repository.save(
            user_mission,
        )

    def get_user_missions(
        self,
        user_id,
    ):
        """
        Retrieve user missions.
        """

        missions = (
            self.repository.list_missions()
        )

        result = []

        for mission in missions:

            user_mission = (
                self.repository.get_user_mission(
                    user_id=user_id,
                    mission_id=mission.id,
                )
            )

            if not user_mission:

                user_mission = (
                    self.repository.create_user_mission(
                        user_id=user_id,
                        mission_id=mission.id,
                    )
                )

            result.append(
                user_mission,
            )

        return result