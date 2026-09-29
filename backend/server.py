import os
import logging
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")
logger = logging.getLogger("rightwing")
app = FastAPI(title="Rightwing API")
api_router = APIRouter(prefix="/api")


class RequirementCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    service: str = Field(min_length=2, max_length=120)
    timeline: str = Field(min_length=2, max_length=80)
    message: str = Field(min_length=10, max_length=2000)


@api_router.get("/")
async def root():
    return {"message": "Rightwing API"}


@api_router.post("/requirements", status_code=201)
async def create_requirement(payload: RequirementCreate):
    database_url = os.environ.get("DATABASE_URL", "").strip()
    if not database_url:
        raise HTTPException(
            status_code=503,
            detail="Supabase is not configured yet. Add DATABASE_URL to backend/.env.",
        )

    async_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    engine = create_async_engine(
        async_url,
        pool_size=5,
        max_overflow=5,
        pool_timeout=30,
        pool_recycle=1800,
        pool_pre_ping=False,
        connect_args={"statement_cache_size": 0, "command_timeout": 30},
    )
    values = payload.model_dump()
    values["created_at"] = datetime.now(timezone.utc).isoformat()
    try:
        async with engine.begin() as connection:
            await connection.execute(
                text(
                    """INSERT INTO requirements
                    (name, email, phone, service, timeline, message, created_at)
                    VALUES (:name, :email, :phone, :service, :timeline, :message, :created_at)"""
                ),
                values,
            )
    except Exception as exc:
        logger.exception("Could not save requirement")
        raise HTTPException(status_code=502, detail="We could not save your requirement right now.") from exc
    finally:
        await engine.dispose()
    return {"message": "Requirement received"}


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)