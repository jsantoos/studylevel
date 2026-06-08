"""
Daily mission repository layer.
"""

from sqlalchemy.orm import Session

from app.models.daily_mission import (
    DailyMission,
)

from app.models.user_daily_mission import (
    UserDailyMission,
)


class DailyMissionRepository:
    """
    Daily mission persistence layer.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def list_missions(
        self,
    ) -> list[DailyMission]:
        """
        Retrieve all missions.
        """

        return (
            self.db.query(
                DailyMission,
            )
            .all()
        )

    def get_user_mission(
        self,
        *,
        user_id,
        mission_id,
    ) -> (
        UserDailyMission
        | None
    ):
        """
        Retrieve user mission.
        """

        return (
            self.db.query(
                UserDailyMission,
            )
            .filter(
                UserDailyMission.user_id
                == user_id,
                UserDailyMission.mission_id
                == mission_id,
            )
            .first()
        )

    def create_user_mission(
        self,
        *,
        user_id,
        mission_id,
    ) -> UserDailyMission:
        """
        Create user mission.
        """

        user_mission = (
            UserDailyMission(
                user_id=user_id,
                mission_id=mission_id,
            )
        )

        self.db.add(
            user_mission,
        )

        self.db.commit()

        self.db.refresh(
            user_mission,
        )

        return user_mission

    def save(
        self,
        user_mission,
    ) -> UserDailyMission:
        """
        Persist user mission.
        """

        self.db.add(
            user_mission,
        )

        self.db.commit()

        self.db.refresh(
            user_mission,
        )

        return user_mission
