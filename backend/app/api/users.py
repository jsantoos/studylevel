"""
User API routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    """
    Retrieve current authenticated user.
    """

    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
    }