"""
JWT utilities.
"""

from datetime import datetime
from datetime import timedelta
from datetime import timezone

from jose import JWTError
from jose import jwt

from app.core.config import settings


def create_access_token(
    subject: str,
) -> str:
    """
    Create JWT access token.
    """

    expires_delta = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )

    expire = datetime.now(timezone.utc) + expires_delta

    payload = {
        "sub": subject,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def decode_access_token(
    token: str,
) -> dict:
    """
    Decode JWT access token.
    """

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload

    except JWTError as exc:
        raise ValueError(
            "Invalid token.",
        ) from exc