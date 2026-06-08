"""
Analytics schemas.
"""

from pydantic import BaseModel


class AnalyticsOverviewResponse(
    BaseModel,
):
    xp: int
    level: int
    accuracy: float
    total_questions: int
    correct_questions: int
    streak_days: int
    average_response_time: int


class SubjectAnalyticsResponse(
    BaseModel,
):
    subject: str
    accuracy: float
    total_questions: int


class ProgressAnalyticsResponse(
    BaseModel,
):
    date: str
    accuracy: float
    total_questions: int
