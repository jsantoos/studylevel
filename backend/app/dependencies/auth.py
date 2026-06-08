"""
Authentication dependencies.
"""

from uuid import UUID

from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.security.jwt import decode_access_token


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
)


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
) -> User:
    """
    Retrieve authenticated user.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
    )

    try:
        payload = decode_access_token(token)

        user_id = payload.get("sub")

        if not user_id:
            raise credentials_exception

        user_uuid = UUID(user_id)

    except Exception:
        raise credentials_exception

    user = (
        db.query(User)
        .filter(User.id == user_uuid)
        .first()
    )

    if not user:
        raise credentials_exception

    return user
