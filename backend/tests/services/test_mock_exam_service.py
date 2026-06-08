"""
Tests for mock exam service.
"""

from uuid import uuid4

from app.schemas.mock_exam import (
    SubmitAnswerPayload,
)

from app.services.mock_exam_service import (
    MockExamService,
)

from tests.factories.question_factory import (
    QuestionFactory,
)

from tests.factories.question_factory import (
    QuestionOptionFactory,
)

from tests.factories.mock_exam_factory import (
    MockExamFactory,
)
from fastapi import HTTPException


def test_submit_correct_answer(
    db,
):
    """
    Should submit
    correct answer.
    """

    service = MockExamService(
        db,
    )

    mock_exam = (
        MockExamFactory()
    )

    question = (
        QuestionFactory()
    )

    correct_option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    payload = SubmitAnswerPayload(
        question_id=question.id,
        selected_option_id=correct_option.id,
        response_time=12,
    )

    result = (
        service.submit_answer(
            user_id=mock_exam.user_id,
            mock_exam_id=mock_exam.id,
            payload=payload,
        )
    )

    assert (
        result["is_correct"]
        is True
    )


def test_submit_wrong_answer(
    db,
):
    """
    Should submit
    wrong answer.
    """

    service = MockExamService(
        db,
    )

    mock_exam = (
        MockExamFactory()
    )

    question = (
        QuestionFactory()
    )

    correct_option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    wrong_option = (
        QuestionOptionFactory(
            question=question,
            is_correct=False,
            option_order=2,
        )
    )

    payload = SubmitAnswerPayload(
        question_id=question.id,
        selected_option_id=wrong_option.id,
        response_time=10,
    )

    result = (
        service.submit_answer(
            user_id=mock_exam.user_id,
            mock_exam_id=mock_exam.id,
            payload=payload,
        )
    )

    assert (
        result["is_correct"]
        is False
    )



def test_submit_duplicate_answer(
    db,
):
    """
    Should not allow
    duplicate answers.
    """

    service = MockExamService(
        db,
    )

    mock_exam = (
        MockExamFactory()
    )

    question = (
        QuestionFactory()
    )

    option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    payload = SubmitAnswerPayload(
        question_id=question.id,
        selected_option_id=option.id,
        response_time=8,
    )

    service.submit_answer(
        user_id=mock_exam.user_id,
        mock_exam_id=mock_exam.id,
        payload=payload,
    )

    try:

        service.submit_answer(
            user_id=mock_exam.user_id,
            mock_exam_id=mock_exam.id,
            payload=payload,
        )

        assert False

    except HTTPException as exc:

        assert exc.status_code == 400



def test_finish_mock_exam(
    db,
):
    """
    Should calculate
    mock exam score.
    """

    service = MockExamService(
        db,
    )

    mock_exam = (
        MockExamFactory()
    )

    question = (
        QuestionFactory()
    )

    option = (
        QuestionOptionFactory(
            question=question,
            is_correct=True,
        )
    )

    payload = SubmitAnswerPayload(
        question_id=question.id,
        selected_option_id=option.id,
        response_time=5,
    )

    service.submit_answer(
        user_id=mock_exam.user_id,
        mock_exam_id=mock_exam.id,
        payload=payload,
    )

    result = (
        service.finish_mock_exam(
            mock_exam.id,
        )
    )

    assert (
        result["score"]
        == 100
    )

    assert (
        result["correct_answers"]
        == 1
    )

    assert (
        result["total_answers"]
        == 1
    )
