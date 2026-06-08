"""
Authentication API routes.
"""

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import get_db
from app.schemas.auth import (
    TokenResponse,
    UserLogin,
    UserRegister,
)
from app.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    payload: UserRegister,
    db: Session = Depends(get_db),
):
    """
    Register user endpoint.
    """

    service = AuthService(db)

    user = service.register(payload)

    return {
        "id": str(user.id),
        "email": user.email,
    }


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Login endpoint.
    """

    service = AuthService(db)

    access_token = service.login(
        form_data.username,
        form_data.password,
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )


