"""
Authentication service layer.
"""

from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.auth import UserLogin
from app.schemas.auth import UserRegister
from app.security.hashing import (
    hash_password,
    verify_password,
)
from app.core.security import (
    create_access_token,
)

class AuthService:
    """
    Authentication business rules.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.user_repository = UserRepository(db)

    def register(
        self,
        payload: UserRegister,
    ):
        """
        Register new user.
        """

        existing_user = self.user_repository.get_by_email(
            payload.email,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered.",
            )

        password_hash = hash_password(
            payload.password,
        )

        return self.user_repository.create(
            name=payload.name,
            email=payload.email,
            password_hash=password_hash,
        )

    def login(
        self,
        email: str,
        password: str,
    ) -> str:
        """
        Authenticate user.
        """

        user = self.user_repository.get_by_email(
            email,
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials.",
            )

        is_valid = verify_password(
            password,
            user.password_hash,
        )

        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials.",
            )

        access_token = create_access_token(
            data={
                "sub": str(user.id),
            },
        )

        return access_token
