import factory
from tests.factories.base_factory import BaseFactory

from app.models.question import (
    Question,
)

from app.models.question_option import (
    QuestionOption,
)


class QuestionFactory(
    factory.alchemy.SQLAlchemyModelFactory,
):

    class Meta:

        model = Question

        sqlalchemy_session = None

        sqlalchemy_session_persistence = (
            "commit"
        )
    statement = factory.Sequence(
        lambda n: f"Question {n}"
    )

    explanation = "Explanation"

    difficulty = 1

    subject = "IA"

    topic = "LLMs"

    bank = "CESPE"

    year = 2025


class QuestionOptionFactory(
    BaseFactory,
):

    class Meta:

        model = QuestionOption

    question = factory.SubFactory(
        QuestionFactory,
    )

    option_text = factory.Sequence(
        lambda n: f"Option {n}"
    )

    option_order = 1

    is_correct = False
