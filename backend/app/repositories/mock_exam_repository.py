"""
Mock exam repository layer.
"""

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.mock_exam import MockExam

from app.models.mock_exam_question import (
    MockExamQuestion,
)

from app.models.question import Question

from app.models.question_option import (
    QuestionOption,
)

from app.models.user_answer import (
    UserAnswer,
)


class MockExamRepository:
    """
    Mock exam repository.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create_mock_exam(
        self,
        user_id,
    ) -> MockExam:
        """
        Create mock exam.
        """

        mock_exam = MockExam(
            user_id=user_id,
        )

        self.db.add(
            mock_exam,
        )

        self.db.commit()

        self.db.refresh(
            mock_exam,
        )

        return mock_exam

    def get_by_id(
        self,
        mock_exam_id,
    ):
        """
        Retrieve mock exam by id.
        """

        return (
            self.db.query(
                MockExam,
            )
            .filter(
                MockExam.id
                == mock_exam_id,
            )
            .first()
        )

    def get_random_questions(
        self,
        *,
        count: int,
        subject: str | None = None,
        topic: str | None = None,
        difficulty: int | None = None,
    ):
        """
        Retrieve random questions.
        """

        query = self.db.query(
            Question,
        )

        if subject:

            query = query.filter(
                Question.subject
                == subject,
            )

        if topic:

            query = query.filter(
                Question.topic
                == topic,
            )

        if difficulty:

            query = query.filter(
                Question.difficulty
                == difficulty,
            )

        return (
            query.order_by(
                func.random(),
            )
            .limit(count)
            .all()
        )

    def attach_question(
        self,
        *,
        mock_exam_id,
        question_id,
    ):
        """
        Attach question to mock exam.
        """

        mock_exam = (
            self.db.query(
                MockExam,
            )
            .filter(
                MockExam.id
                == mock_exam_id,
            )
            .first()
        )

        question = (
            self.db.query(
                Question,
            )
            .filter(
                Question.id
                == question_id,
            )
            .first()
        )

        relation = MockExamQuestion(
            mock_exam=mock_exam,
            question=question,
        )

        self.db.add(
            relation,
        )

        self.db.commit()

        self.db.refresh(
            relation,
        )

    def get_mock_exam(
        self,
        mock_exam_id,
    ):
        """
        Retrieve mock exam.
        """

        return (
            self.db.query(
                MockExam,
            )
            .filter(
                MockExam.id
                == mock_exam_id,
            )
            .first()
        )

    def get_correct_option(
        self,
        question_id,
    ):
        """
        Retrieve correct option.
        """

        return (
            self.db.query(
                QuestionOption,
            )
            .filter(
                QuestionOption.question_id
                == question_id,

                QuestionOption.is_correct.is_(
                    True,
                ),
            )
            .first()
        )

    def save_answer(
        self,
        answer: UserAnswer,
    ):
        """
        Persist answer.
        """

        self.db.add(
            answer,
        )

        self.db.commit()

    def get_answers(
        self,
        mock_exam_id,
    ):
        """
        Retrieve mock exam answers.
        """

        return (
            self.db.query(
                UserAnswer,
            )
            .filter(
                UserAnswer.mock_exam_id
                == mock_exam_id,
            )
            .all()
        )

    def update_score(
        self,
        *,
        mock_exam: MockExam,
        score: float,
    ):
        """
        Update mock exam score.
        """

        mock_exam.score = score

        self.db.commit()

    def get_existing_answer(
        self,
        *,
        mock_exam_id,
        question_id,
        user_id,
    ):
        """
        Retrieve existing answer.
        """

        return (
            self.db.query(
                UserAnswer,
            )
            .filter(
                UserAnswer.mock_exam_id
                == mock_exam_id,

                UserAnswer.question_id
                == question_id,

                UserAnswer.user_id
                == user_id,
            )
            .first()
        )

    def get_review_data(
        self,
        mock_exam_id,
    ):
        """
        Retrieve review data.
        """

        answers = (
            self.db.query(
                UserAnswer,
            )
            .filter(
                UserAnswer.mock_exam_id
                == mock_exam_id,
            )
            .all()
        )

        review_data = []

        for answer in answers:

            question = (
                self.db.query(
                    Question,
                )
                .filter(
                    Question.id
                    == answer.question_id,
                )
                .first()
            )

            correct_option = (
                self.db.query(
                    QuestionOption,
                )
                .filter(
                    QuestionOption.question_id
                    == question.id,

                    QuestionOption.is_correct.is_(
                        True,
                    ),
                )
                .first()
            )

            selected_option = (
                self.db.query(
                    QuestionOption,
                )
                .filter(
                    QuestionOption.id
                    == answer.selected_option_id,
                )
                .first()
            )

            review_data.append(
                {
                    "question_id": str(
                        question.id,
                    ),

                    "statement":
                        question.statement,

                    "explanation":
                        question.explanation,

                    "topic":
                        question.topic,

                    "subject":
                        question.subject,

                    "difficulty":
                        question.difficulty,

                    "selected_option":
                        (
                            selected_option.option_text
                            if selected_option
                            else None
                        ),

                    "correct_option":
                        (
                            correct_option.option_text
                            if correct_option
                            else None
                        ),

                    "is_correct":
                        answer.is_correct,

                    "options": [
                        {
                            "id": str(
                                option.id,
                            ),

                            "text":
                                option.option_text,

                            "is_correct":
                                option.is_correct,
                        }

                        for option in (
                            question.options
                        )
                    ],
                },
            )

        return review_data