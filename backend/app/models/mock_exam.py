"""
Mock exam model.
"""

from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.models.base import Base
from app.models.base import TimestampMixin
from app.models.base import UUIDMixin


class MockExam(
    Base,
    UUIDMixin,
    TimestampMixin,
):
    """
    Mock exam entity.
    """

    __tablename__ = "mock_exams"

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="mock_exams",
    )

    question_links = relationship(
        "MockExamQuestion",
        back_populates="mock_exam",
        cascade="all, delete-orphan",
    )
    answers = relationship(
        "UserAnswer",
        back_populates="mock_exam",
    )