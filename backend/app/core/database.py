"""
Database configuration module.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import (
    sessionmaker,
)
from app.models.base import Base

from app.core.config import settings


engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine,
)


def get_db():
    """
    Database session dependency.
    """

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()