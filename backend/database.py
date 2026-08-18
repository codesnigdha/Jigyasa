import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from backend.models.base import Base
from backend.models.user import User

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = quote_plus(os.getenv("DB_PASSWORD", ""))

# A full DATABASE_URL is convenient for hosted databases. Local development can
# continue to use the individual DB_* values from .env.
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    if not DB_NAME or not DB_USER:
        raise ValueError(
            "Configure DATABASE_URL or DB_NAME and DB_USER in your .env file."
        )

    DATABASE_URL = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def test_database_connection():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ MySQL database connected successfully!")
    except Exception as error:
        print("❌ MySQL connection failed:")
        print(error)


if __name__ == "__main__":
    test_database_connection()


def create_tables():
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
