"""
Explanation schemas.
"""

from pydantic import BaseModel
from uuid import UUID


class ExplanationRequest(
    BaseModel,
):
    question_id: UUID

    selected_option_id: UUID

    force_ai: bool = False


class ExplanationResponse(
    BaseModel,
):
    explanation: str
    source: str
