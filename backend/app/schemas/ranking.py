"""
Ranking schemas.
"""

from uuid import UUID

from pydantic import BaseModel


class RankingUserResponse(
    BaseModel,
):
    """
    Ranking user response.
    """

    id: UUID

    name: str

    xp: int

    level: int

    position: int

    accuracy: float

    total_questions: int