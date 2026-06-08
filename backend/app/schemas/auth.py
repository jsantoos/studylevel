"""
Authentication schemas.
"""

from pydantic import BaseModel
from pydantic import EmailStr


class UserRegister(BaseModel):
    """
    User registration payload.
    """

    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    """
    User login payload.
    """

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """
    JWT token response.
    """

    access_token: str
    token_type: str = "bearer"