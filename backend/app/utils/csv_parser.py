"""
CSV parsing utilities.
"""

import csv
from io import StringIO


def parse_csv(
    content: bytes,
) -> list[dict]:
    """
    Parse uploaded CSV content.
    """

    decoded = content.decode("utf-8")

    reader = csv.DictReader(
        StringIO(decoded),
    )

    return list(reader)