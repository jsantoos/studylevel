"""
Ranking routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import (
    get_db,
)
from app.models.user import (
    User,
)
from app.models.user_progress import (
    UserProgress,
)
from app.schemas.ranking import (
    RankingUserResponse,
)

router = APIRouter(
    prefix="/ranking",
    tags=["Ranking"],
)


@router.get(
    "",
    response_model=list[
        RankingUserResponse
    ],
)
def get_ranking(
    db: Session = Depends(
        get_db,
    ),
):
    """
    Retrieve global ranking ordered by XP.
    """

    rows = (
        db.query(
            User,
            UserProgress,
        )
        .join(
            UserProgress,
            UserProgress.user_id
            == User.id,
        )
        .order_by(
            UserProgress.xp.desc(),
            UserProgress.total_questions.desc(),
        )
        .limit(
            50,
        )
        .all()
    )

    ranking = []

    for index, (
        user,
        progress,
    ) in enumerate(
        rows,
        start=1,
    ):

        accuracy = 0

        if progress.total_questions > 0:

            accuracy = round(
                (
                    progress.correct_questions
                    / progress.total_questions
                )
                * 100,
                2,
            )

        ranking.append(
            RankingUserResponse(
                id=user.id,
                name=user.name,
                xp=progress.xp,
                level=progress.level,
                position=index,
                accuracy=accuracy,
                total_questions=(
                    progress.total_questions
                ),
            )
        )

    return ranking
