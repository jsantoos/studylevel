"""
Global pytest configuration.
"""

from collections.abc import Generator

import pytest

from fastapi.testclient import TestClient

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

from app.core.database import Base
from app.core.database import get_db

from app.main import app

from app.core.security import (
    get_current_user as security_get_current_user,
)

from app.dependencies.auth import (
    get_current_user as dependency_get_current_user,
)

from tests.factories.user_factory import (
    UserFactory,
)

from tests.factories.question_factory import (
    QuestionFactory,
    QuestionOptionFactory,
)

from tests.factories.mock_exam_factory import (
    MockExamFactory,
)

SQLALCHEMY_DATABASE_URL = (
    "sqlite:///./test.db"
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={
        "check_same_thread": False,
    },
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


@pytest.fixture(scope="function")
def db() -> Generator[Session, None, None]:
    """
    Create isolated database session.
    """

    Base.metadata.create_all(
        bind=engine,
    )

    session = (
        TestingSessionLocal()
    )

    UserFactory._meta.sqlalchemy_session = (
        session
    )

    QuestionFactory._meta.sqlalchemy_session = (
        session
    )

    QuestionOptionFactory._meta.sqlalchemy_session = (
        session
    )

    MockExamFactory._meta.sqlalchemy_session = (
        session
    )

    try:

        yield session

    finally:

        session.close()

        Base.metadata.drop_all(
            bind=engine,
        )


@pytest.fixture(scope="function")
def client(
    db: Session,
) -> Generator[TestClient, None, None]:
    """
    Create unauthenticated test client.
    """

    def override_get_db():

        yield db

    app.dependency_overrides[
        get_db
    ] = override_get_db

    with TestClient(app) as test_client:

        yield test_client

    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def authenticated_client(
    db: Session,
) -> Generator[
    tuple[TestClient, object],
    None,
    None,
]:
    """
    Create authenticated test client.
    """

    user = UserFactory()

    def override_get_current_user():

        return user

    def override_get_db():

        yield db

    app.dependency_overrides[
        get_db
    ] = override_get_db

    app.dependency_overrides[
        security_get_current_user
    ] = override_get_current_user

    app.dependency_overrides[
        dependency_get_current_user
    ] = override_get_current_user

    with TestClient(app) as test_client:

        yield (
            test_client,
            user,
        )

    app.dependency_overrides.clear()
