from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from anthropic import Anthropic

router = APIRouter()

client = Anthropic()

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatMessage):
    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system="""You are IA CENTINELL ANALYST — intelligence core of the enterprise cybersecurity platform.
You are an expert in:
- Digital Forensics and threat analysis
- Malware behavior and reverse engineering
- MITRE ATT&CK framework
- Incident response and forensic investigation
- Compliance (NIST, ISO 27001, GDPR)
- Cybersecurity threats and defenses

Provide authoritative, technical, and actionable responses.""",
            messages=[
                {
                    "role": "user",
                    "content": request.message
                }
            ]
        )
        
        return {
            "response": response.content[0].text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
