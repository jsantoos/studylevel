"""
User ORM model.
"""

from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import (
    Base,
    TimestampMixin,
    UUIDMixin,
)


class User(
    UUIDMixin,
    TimestampMixin,
    Base,
):
    """
    Application user model.

    Represents authenticated platform users.
    """

    __tablename__ = "users"

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    mock_exams = relationship(
        "MockExam",
        back_populates="user",
    )

    progress = relationship(
        "UserProgress",
        back_populates="user",
        uselist=False,
    )
