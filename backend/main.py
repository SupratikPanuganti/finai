from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, Date, Float, select

# FastAPI App
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend access
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# PostgreSQL Connection
DATABASE_URL = "postgresql+asyncpg://postgres:Newyork30041@localhost/finai_db"
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# Define Company Model
class Company(Base):
    __tablename__ = "companies"
    isin = Column(String, primary_key=True)
    symbol = Column(String)
    name = Column(String, index=True)  # Index for better search performance
    series = Column(String)
    exchange = Column(String)
    company_url = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    date_of_listing = Column(Date, nullable=True)
    insert_date = Column(Date, nullable=True)
    face_value = Column(Integer, nullable=True)
    turnover = Column(Float, nullable=True)

# Dependency for Database Session
async def get_db():
    async with SessionLocal() as db:
        yield db

# API Route to Get Companies
@app.get("/companies")
async def get_companies(name: str = Query(None), db: AsyncSession = Depends(get_db)):
    try:
        query = select(Company)
        if name:
            query = query.where(Company.name.ilike(f"%{name}%"))  # Case-insensitive search
        
        result = await db.execute(query)
        companies = result.scalars().all()

        if not companies:
            return {"error": "No matching companies found"}

        return companies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))