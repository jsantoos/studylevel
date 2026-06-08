"""
CSV import API routes.
"""

from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.import_schema import (
    ImportResult,
)
from app.services.csv_import_service import (
    CSVImportService,
)


router = APIRouter(
    prefix="/imports",
    tags=["Imports"],
)


@router.post(
    "/questions/csv",
    response_model=ImportResult,
)
async def import_questions_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Import questions from CSV.
    """

    content = await file.read()

    service = CSVImportService(db)

    result = service.import_questions(
        content,
    )

    return ImportResult(**result)
