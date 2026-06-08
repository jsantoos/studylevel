"""
User preferences schemas.
"""

from pydantic import BaseModel


class UserPreferencesResponse(
    BaseModel,
):
    """
    User preferences response schema.
    """

    study_goal_minutes: int

    favorite_subjects: list[str]

    preferred_difficulty: str

    focus_mode_enabled: bool

    notifications_enabled: bool

    theme: str


class UpdateUserPreferencesPayload(
    BaseModel,
):
    """
    Update preferences payload.
    """

    study_goal_minutes: int

    favorite_subjects: list[str]

    preferred_difficulty: str

    focus_mode_enabled: bool

    notifications_enabled: bool

    theme: str
