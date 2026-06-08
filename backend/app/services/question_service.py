"""
Question service layer.
"""

from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from app.repositories.question_repository import (
    QuestionRepository,
)
from app.schemas.question import QuestionCreate


class QuestionService:
    """
    Question business rules.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.repository = QuestionRepository(db)

    def create(
        self,
        payload: QuestionCreate,
    ):
        """
        Create question.
        """

        correct_options = [
            option
            for option in payload.options
            if option.is_correct
        ]

        if len(correct_options) != 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Question must have exactly one correct option.",
            )

        return self.repository.create(payload)

    def list_questions(
        self,
    ):
        """
        Retrieve all questions.
        """

        return self.repository.list_questions()

    def get_by_id(
        self,
        question_id,
    ):
        """
        Retrieve question by ID.
        """

        question = self.repository.get_by_id(
            question_id,
        )

        if not question:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Question not found.",
            )

        return question

    def delete(
        self,
        question_id,
    ):
        """
        Delete question.
        """

        question = self.get_by_id(question_id)

        self.repository.delete(question)