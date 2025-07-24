from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Configure engine with appropriate settings for production
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    # Railway sometimes uses postgres:// which SQLAlchemy 1.4+ doesn't support
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine_kwargs = {
    "pool_pre_ping": True,
    "pool_recycle": 300,
    "pool_size": 10,
    "max_overflow": 20,
}

# Force disable SSL for all environments due to connection issues
engine_kwargs["connect_args"] = {"sslmode": "disable"}

engine = create_engine(DATABASE_URL, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
