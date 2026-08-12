# backend/app/utils/cache.py
from redis import Redis
import json

redis_client = Redis(host='redis', port=6379, decode_responses=True)
CACHE_TTL = 300  # 5 minutos

async def get_cached_metrics(cache_key: str):
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Si no está en caché, consultar DB
    metrics = await calculate_metrics()
    redis_client.setex(cache_key, CACHE_TTL, json.dumps(metrics))
    return metrics
