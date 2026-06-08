"""
User preferences service layer.
"""

from sqlalchemy.orm import Session

from app.models.user_preferences import (
    UserPreferences,
)


class UserPreferencesService:
    """
    User preferences service.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_preferences(
        self,
        user_id,
    ):
        """
        Retrieve user preferences.
        """

        preferences = (
            self.db.query(
                UserPreferences,
            )
            .filter(
                UserPreferences.user_id
                == str(user_id),
            )
            .first()
        )

        if preferences:

            return preferences

        preferences = UserPreferences(
            user_id=str(user_id),
        )

        self.db.add(
            preferences,
        )

        self.db.commit()

        self.db.refresh(
            preferences,
        )

        return preferences

    def update_preferences(
        self,
        user_id,
        payload,
    ):
        """
        Update user preferences.
        """

        preferences = (
            self.get_preferences(
                user_id,
            )
        )

        preferences.study_goal_minutes = (
            payload.study_goal_minutes
        )

        preferences.favorite_subjects = (
            payload.favorite_subjects
        )

        preferences.preferred_difficulty = (
            payload.preferred_difficulty
        )

        preferences.focus_mode_enabled = (
            payload.focus_mode_enabled
        )

        preferences.notifications_enabled = (
            payload.notifications_enabled
        )

        preferences.theme = (
            payload.theme
        )

        self.db.commit()

        self.db.refresh(
            preferences,
        )

        return preferences
