# ia# 🛡️ IA CENTINELL v6.0

**Enterprise Security Intelligence Platform**

![Version](https://img.shields.io/badge/version-6.0.0-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)
![Status](https://img.shields.io/badge/status-Production%20Ready-green)

## 🎯 ¿Qué es IA CENTINELL?

IA CENTINELL es una plataforma de seguridad empresarial impulsada por inteligencia artificial que proporciona:

✅ **Detección de Amenazas en Tiempo Real** - IA de última generación
✅ **Análisis Comportamental** - Machine learning avanzado
✅ **Escaneo de Archivos** - Detección de malware con IA
✅ **Monitoreo de Red** - Tráfico en tiempo real
✅ **Dashboard Intuitivo** - Visualización de datos
✅ **Cumplimiento Normativo** - GDPR, SOC 2, ISO 27001
✅ **SaaS Listo** - Multi-tenant architecture
✅ **API Completa** - Integración con cualquier sistema

## 🚀 Inicio Rápido

### Requisitos
- Docker & Docker Compose
- 4GB RAM mínimo
- 20GB storage

### Instalación (5 minutos)

```bash
# 1. Clonar repositorio
git clone https://github.com/yourusername/ia-centinell.git
cd ia-centinell

# 2. Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con tus datos

# 3. Iniciar servicios
docker-compose up -d

# 4. Acceder
# Frontend: http://localhost:3000
# API: http://localhost:8000
# Documentación: http://localhost:8000/api/docs
