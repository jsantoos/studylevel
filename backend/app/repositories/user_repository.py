"""
User repository layer.
"""

from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:
    """
    User repository.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_by_email(
        self,
        email: str,
    ) -> User | None:
        """
        Retrieve user by email.
        """

        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def create(
        self,
        *,
        name: str,
        email: str,
        password_hash: str,
    ) -> User:
        """
        Create new user.
        """

        user = User(
            name=name,
            email=email,
            password_hash=password_hash,
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    
    def get_by_id(
        self,
        user_id,
    ):
        """
        Retrieve user by id.
        """

        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )