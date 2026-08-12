# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZIPMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from dotenv import load_dotenv
import os
import time

from routes import auth, shield, forensics, audit, ai

load_dotenv()

# 🔧 Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ Lifespan para inicialización
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting IA CENTINELL v6.0")
    yield
    # Shutdown
    logger.info("🛑 Shutting down IA CENTINELL v6.0")

# 🎯 FastAPI app configuration
app = FastAPI(
    title="IA CENTINELL v6.0",
    description="Enterprise Security Intelligence Platform",
    version="6.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# ✅ MIDDLEWARE ORDER (importante!)
# 1. TrustedHost - Seguridad
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]
)

# 2. CORS - Mejorado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)

# 3. GZIP Compression
app.add_middleware(
    GZIPMiddleware,
    minimum_size=1000,
    compresslevel=6
)

# ✅ Request logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    if process_time > 1:
        logger.warning(
            f"⏱️ {request.method} {request.url.path} took {process_time:.2f}s"
        )
    
    response.headers["X-Process-Time"] = str(process_time)
    return response

# ✅ Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(shield.router, prefix="/api/shield", tags=["shield"])
app.include_router(forensics.router, prefix="/api/forensics", tags=["forensics"])
app.include_router(audit.router, prefix="/api/audit", tags=["audit"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

# ✅ Health check mejorado
@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "version": "6.0.0",
        "timestamp": time.time()
    }

@app.get("/health")
async def health_check_legacy():
    """Legacy endpoint for compatibility"""
    return {"status": "ok", "version": "6.0.0"}

# ✅ Root endpoint
@app.get("/")
async def root():
    return {
        "name": "IA CENTINELL v6.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }

# ✅ Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"❌ Error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

if __name__ == "__main__":
    import uvicorn
    
    ENV = os.getenv("ENV", "development")
    
    if ENV == "production":
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            workers=4,
            loop="uvloop",
            http="httptools",
            access_log=False,
            log_level="warning"
        )
    else:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
