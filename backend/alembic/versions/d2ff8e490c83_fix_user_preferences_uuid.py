"""fix user preferences uuid"""

from alembic import op

import sqlalchemy as sa

from sqlalchemy.dialects import postgresql


revision = "d2ff8e490c83"

down_revision = "549471f21675"

branch_labels = None

depends_on = None


def upgrade():

    op.execute(
        """
        ALTER TABLE user_preferences
        ALTER COLUMN user_id
        TYPE UUID
        USING user_id::uuid
        """
    )

    op.create_foreign_key(
        None,
        "user_preferences",
        "users",
        ["user_id"],
        ["id"],
    )


def downgrade():

    op.drop_constraint(
        None,
        "user_preferences",
        type_="foreignkey",
    )

    op.execute(
        """
        ALTER TABLE user_preferences
        ALTER COLUMN user_id
        TYPE VARCHAR
        """
    )
