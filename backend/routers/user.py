from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models.user import User
from backend.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
)
from backend.services.auth import (
    hash_password,
    verify_password,
)
from backend.services.jwt import create_access_token
from backend.services.security import get_current_user, get_optional_current_user


router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


# =====================================================
# DATABASE
# =====================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =====================================================
# REGISTER
# =====================================================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    hashed_password = hash_password(
        user_data.password
    )

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =====================================================
# LOGIN
# =====================================================

@router.post("/login")
def login_user(
    response: Response,
    user_data: UserLogin,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        user_data.password,
        user.password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    # =================================================
    # CREATE JWT
    # =================================================

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    # =================================================
    # STORE JWT IN HTTPONLY COOKIE
    # =================================================

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,       # True in production HTTPS
        samesite="lax",
        max_age=60 * 60,
        path="/",
    )

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


# =====================================================
# CURRENT USER
# =====================================================

@router.get("/session")
def get_session(
    current_user: User | None = Depends(get_optional_current_user),
):
    if not current_user:
        return {"user": None}

    return {
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
        }
    }


@router.get("/me")
def get_current_user_info(
    current_user=Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
    }


# =====================================================
# LOGOUT
# =====================================================

@router.post("/logout")
def logout_user(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
    )

    return {
        "message": "Logout successful",
    }
