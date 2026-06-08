"""
Authentication and security utilities.
"""

from datetime import datetime
from datetime import timedelta
from datetime import timezone
from typing import Annotated

import jwt

from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from fastapi.security import OAuth2PasswordBearer

from jwt.exceptions import InvalidTokenError

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db

from app.models.user import User

from app.repositories.user_repository import (
    UserRepository,
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
)


def create_access_token(
    data: dict,
):
    """
    Create JWT access token.
    """

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc,
    ) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )

    to_encode.update(
        {"exp": expire},
    )

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def verify_token(
    token: str,
):
    """
    Verify JWT token.
    """

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[
                settings.ALGORITHM,
            ],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token.",
            )

        return user_id

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token.",
        )


def get_current_user(
    token: Annotated[
        str,
        Depends(oauth2_scheme),
    ],
    db: Session = Depends(get_db),
):
    """
    Retrieve authenticated user.
    """

    user_id = verify_token(
        token,
    )

    repository = UserRepository(db)

    user = repository.get_by_id(
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found.",
        )

    return user