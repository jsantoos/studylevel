"""
Daily mission routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import (
    get_db,
)

from app.dependencies.auth import (
    get_current_user,
)

from app.schemas.daily_mission import (
    UserDailyMissionResponse,
)

from app.services.daily_mission_service import (
    DailyMissionService,
)

router = APIRouter(
    prefix="/daily-missions",
    tags=["Daily Missions"],
)


@router.get(
    "",
    response_model=list[
        UserDailyMissionResponse
    ],
)
def get_daily_missions(
    db: Session = Depends(
        get_db,
    ),
    current_user=Depends(
        get_current_user,
    ),
):
    """
    Retrieve daily missions.
    """

    service = (
        DailyMissionService(
            db,
        )
    )

    return (
        service.get_user_missions(
            current_user.id,
        )
    )
