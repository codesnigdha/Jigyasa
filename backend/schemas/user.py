from pydantic import BaseModel, EmailStr


# =========================================================
# REGISTER USER
# =========================================================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# =========================================================
# LOGIN USER
# =========================================================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# USER RESPONSE
# =========================================================

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True
