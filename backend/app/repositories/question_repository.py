"""
Question repository layer.
"""

from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.models.question import Question
from app.models.question_option import QuestionOption
from app.schemas.question import QuestionCreate


class QuestionRepository:
    """
    Question repository.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        payload: QuestionCreate,
    ) -> Question:
        """
        Create new question.
        """

        question = Question(
            statement=payload.statement,
            explanation=payload.explanation,
            difficulty=payload.difficulty,
            subject=payload.subject,
            topic=payload.topic,
            bank=payload.bank,
            year=payload.year,
        )

        for option in payload.options:
            question.options.append(
                QuestionOption(
                    option_text=option.option_text,
                    is_correct=option.is_correct,
                    option_order=option.option_order,
                )
            )

        self.db.add(question)

        self.db.commit()

        self.db.refresh(question)

        return question

    def list_questions(
        self,
    ) -> list[Question]:
        """
        Retrieve all questions.
        """

        return (
            self.db.query(Question)
            .options(
                joinedload(Question.options),
            )
            .all()
        )

    def get_by_id(
        self,
        question_id,
    ) -> Question | None:
        """
        Retrieve question by ID.
        """

        return (
            self.db.query(Question)
            .options(
                joinedload(Question.options),
            )
            .filter(Question.id == question_id)
            .first()
        )

    def delete(
        self,
        question: Question,
    ) -> None:
        """
        Delete question.
        """

        self.db.delete(question)

        self.db.commit()
