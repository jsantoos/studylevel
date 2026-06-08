import factory


class BaseFactory(
    factory.alchemy.SQLAlchemyModelFactory,
):
    """
    Base SQLAlchemy factory.
    """

    class Meta:

        abstract = True

        sqlalchemy_session = None

        sqlalchemy_session_persistence = (
            "commit"
        )
