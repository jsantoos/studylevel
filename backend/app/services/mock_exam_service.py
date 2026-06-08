"""
Mock exam service layer.
"""

from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from app.models.user_answer import UserAnswer

from app.repositories.mock_exam_repository import (
    MockExamRepository,
)

from app.schemas.mock_exam import (
    MockExamCreate,
    SubmitAnswerPayload,
)

from app.services.progression_service import (
    ProgressionService,
)

from app.services.daily_mission_service import (
    DailyMissionService,
)


class MockExamService:
    """
    Mock exam business rules.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.repository = MockExamRepository(db)

        self.progression_service = (
            ProgressionService(db)
        )

        self.daily_mission_service = (
            DailyMissionService(
                db,
            )
        )

    def create_mock_exam(
        self,
        *,
        user_id,
        payload: MockExamCreate,
    ):
        """
        Create mock exam.
        """

        mock_exam = (
            self.repository.create_mock_exam(
                user_id,
            )
        )

        questions = (
            self.repository.get_random_questions(
                count=payload.question_count,
                subject=payload.subject,
                topic=payload.topic,
                difficulty=payload.difficulty,
            )
        )

        for question in questions:

            self.repository.attach_question(
                mock_exam_id=mock_exam.id,
                question_id=question.id,
            )

        return mock_exam

    def submit_answer(
        self,
        *,
        user_id,
        mock_exam_id,
        payload: SubmitAnswerPayload,
    ):
        """
        Submit question answer.
        """

        existing_answer = (
            self.repository.get_existing_answer(
                mock_exam_id=mock_exam_id,
                question_id=payload.question_id,
                user_id=user_id,
            )
        )

        if existing_answer:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Questão já respondida.",
            )

        correct_option = (
            self.repository.get_correct_option(
                payload.question_id,
            )
        )

        if not correct_option:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Opção correta não encontrada para a questão.",
            )

        is_correct = (
            correct_option.id
            == payload.selected_option_id
        )

        answer = UserAnswer(
            user_id=user_id,
            mock_exam_id=mock_exam_id,
            question_id=payload.question_id,
            selected_option_id=payload.selected_option_id,
            is_correct=is_correct,
            response_time=payload.response_time,
        )

        self.repository.save_answer(answer)

        self.progression_service.award_question_xp(
            user_id=user_id,
            is_correct=is_correct,
        )

        self.daily_mission_service.process_question_answer(
            user_id=user_id,
            is_correct=is_correct,
        )

        return {
            "is_correct": is_correct,
        }

    def finish_mock_exam(
        self,
        mock_exam_id,
    ):
        """
        Finalize mock exam.
        """

        mock_exam = (
            self.repository.get_mock_exam(
                mock_exam_id,
            )
        )

        if not mock_exam:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mock exam not found.",
            )

        answers = (
            self.repository.get_answers(
                mock_exam_id,
            )
        )

        unique_answers = {}

        for answer in answers:

            unique_answers[
                str(answer.question_id)
            ] = answer

        answers = list(
            unique_answers.values()
        )

        correct_answers = len(
            [
                answer
                for answer in answers
                if answer.is_correct
            ]
        )

        if not answers:

            score = 0

        else:

            score = (
                correct_answers
                / len(answers)
            ) * 100

        self.repository.update_score(
            mock_exam=mock_exam,
            score=score,
        )

        self.progression_service.award_exam_xp(
            user_id=mock_exam.user_id,
            score=score,
        )

        self.daily_mission_service.process_exam_completed(
            user_id=mock_exam.user_id,
        )

        return {
            "score": round(score, 2),

            "correct_answers": correct_answers,

            "total_answers": len(answers),
        }

    def get_mock_exam_questions(
        self,
        mock_exam_id,
    ):
        """
        Retrieve mock exam questions.
        """

        mock_exam = (
            self.repository.get_mock_exam(
                mock_exam_id,
            )
        )

        if not mock_exam:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Mock exam not found.",
            )

        return [
            link.question
            for link in mock_exam.question_links
        ]

    def get_review_data(
        self,
        mock_exam_id,
    ):
        """
        Retrieve mock exam review data.
        """

        return (
            self.repository.get_review_data(
                mock_exam_id,
            )
        )
