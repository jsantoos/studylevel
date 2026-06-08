"""
User preferences routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.security import (
    get_current_user,
)

from app.models.user import User

from app.schemas.user_preferences import (
    UpdateUserPreferencesPayload,
    UserPreferencesResponse,
)

from app.services.user_preferences_service import (
    UserPreferencesService,
)

router = APIRouter(
    prefix="/users/me/preferences",
    tags=["User Preferences"],
)


@router.get(
    "",
    response_model=UserPreferencesResponse,
)
def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Retrieve user preferences.
    """

    service = UserPreferencesService(
        db,
    )

    return service.get_preferences(
        current_user.id,
    )


@router.patch(
    "",
    response_model=UserPreferencesResponse,
)
def update_preferences(
    payload: UpdateUserPreferencesPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    """
    Update user preferences.
    """

    service = UserPreferencesService(
        db,
    )

    return service.update_preferences(
        current_user.id,
        payload,
    )
