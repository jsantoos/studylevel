import factory

from app.models.mock_exam import (
    MockExam,
)

from tests.factories.user_factory import (
    UserFactory,
)


class MockExamFactory(
    factory.alchemy.SQLAlchemyModelFactory,
):

    class Meta:

        model = MockExam

        sqlalchemy_session = None

        sqlalchemy_session_persistence = (
            "commit"
        )

    user = factory.SubFactory(
        UserFactory,
    )

    score = 0
