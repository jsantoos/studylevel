"""
Import schemas.
"""

from pydantic import BaseModel


class ImportResult(BaseModel):
    """
    Import result schema.
    """

    imported: int
    failed: int