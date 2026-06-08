import factory

from app.models.user import User

from tests.factories.base_factory import (
    BaseFactory,
)


class UserFactory(
    BaseFactory,
):

    class Meta:

        model = User

    name = factory.Faker(
        "name"
    )

    email = factory.Sequence(
        lambda n: f"user{n}@test.com"
    )

    password_hash = "123"
