from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, Date, Float, select
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Read DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set in environment variables")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend (adjust this when frontend is deployed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Consider locking this down to specific domains in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLAlchemy setup
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# Company model
class Company(Base):
    __tablename__ = "companies"
    isin = Column(String, primary_key=True)
    symbol = Column(String)
    name = Column(String, index=True)
    series = Column(String)
    exchange = Column(String)
    company_url = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    date_of_listing = Column(Date, nullable=True)
    insert_date = Column(Date, nullable=True)
    face_value = Column(Integer, nullable=True)
    turnover = Column(Float, nullable=True)

# Database session dependency
async def get_db():
    async with SessionLocal() as db:
        yield db

# Route to get companies
@app.get("/companies")
async def get_companies(name: str = Query(None), db: AsyncSession = Depends(get_db)):
    try:
        query = select(Company)
        if name:
            query = query.where(Company.name.ilike(f"%{name}%"))

        result = await db.execute(query)
        companies = result.scalars().all()

        if not companies:
            return {"error": "No matching companies found"}

        return companies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
