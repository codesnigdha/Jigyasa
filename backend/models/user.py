from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from backend.models.base import Base


class User(Base):
    __tablename__ = "users"

    # =====================================================
    # PRIMARY KEY
    # =====================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # =====================================================
    # USER NAME
    # =====================================================

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    # =====================================================
    # EMAIL
    # =====================================================

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        index=True,
        nullable=False,
    )

    # =====================================================
    # PASSWORD
    # =====================================================

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
