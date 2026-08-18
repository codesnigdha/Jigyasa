from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models.user import User
from backend.services.jwt import decode_access_token


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_optional_current_user(
    request: Request,
    db: Session = Depends(get_db),
):
    # =====================================================
    # GET JWT FROM COOKIE
    # =====================================================

    token = request.cookies.get("access_token")

    if not token:
        return None

    # =====================================================
    # VERIFY JWT
    # =====================================================

    payload = decode_access_token(token)

    if not payload:
        return None

    # =====================================================
    # GET USER ID
    # =====================================================

    user_id = payload.get("sub")

    if not user_id:
        return None

    # =====================================================
    # GET USER FROM DATABASE
    # =====================================================

    try:
        user = db.query(User).filter(User.id == int(user_id)).first()
    except (TypeError, ValueError):
        return None

    return user


def get_current_user(
    user: User | None = Depends(get_optional_current_user),
):
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    return user
