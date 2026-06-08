"""
AI security schemas.
"""

from pydantic import BaseModel


class PromptInjectionAnalysis(
    BaseModel,
):
    suspicious: bool

    score: int

    matches: list[str]
