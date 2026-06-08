"""
User progress repository layer.
"""

from app.models.user_progress import (
    UserProgress,
)


class UserProgressRepository:
    """
    User progression repository.
    """

    def __init__(
        self,
        db,
    ):
        self.db = db

    def get_by_user_id(
        self,
        user_id,
    ):
        """
        Retrieve user progression.
        """

        return (
            self.db.query(
                UserProgress,
            )
            .filter(
                UserProgress.user_id
                == user_id,
            )
            .first()
        )

    def create_progress(
        self,
        user_id,
    ):
        """
        Create user progression.
        """

        progress = UserProgress(
            user_id=user_id,
        )

        self.db.add(progress)

        self.db.commit()

        self.db.refresh(progress)

        return progress

    def save(
        self,
        progress,
    ):
        """
        Persist progression.
        """

        self.db.add(progress)

        self.db.commit()

        self.db.refresh(progress)

        return progress
