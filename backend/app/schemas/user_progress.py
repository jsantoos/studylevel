"""
User progress schemas.
"""

from pydantic import BaseModel


class UserProgressResponse(
    BaseModel,
):
    """
    User progression response.
    """

    xp: int

    level: int

    streak_days: int

    total_questions: int

    correct_questions: int

    total_mock_exams: int

    accuracy: float

    average_response_time: int

    ai_hints_used: int

    ai_explanations_used: int
