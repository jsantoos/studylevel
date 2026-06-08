"""
Daily mission schemas.
"""

from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class DailyMissionResponse(
    BaseModel,
):
    """
    Daily mission response.
    """

    id: UUID

    title: str

    mission_type: str

    goal: int

    reward_xp: int

    model_config = ConfigDict(
        from_attributes=True,
    )


class UserDailyMissionResponse(
    BaseModel,
):
    """
    User daily mission response.
    """

    id: UUID

    progress: int

    completed: bool

    mission: DailyMissionResponse

    model_config = ConfigDict(
        from_attributes=True,
    )
