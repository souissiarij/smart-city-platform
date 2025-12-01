# Smart City Platform - Projet ING GINF (2025-2026)

## 🏙️ Contexte
Ce projet consiste en une **plateforme de services interopérables pour une ville intelligente**, permettant aux citoyens et aux opérateurs urbains d’accéder facilement à des informations consolidées via un client unique.  
Il intègre différents types de services web et microservices, utilisant **REST, SOAP, GraphQL et gRPC**, orchestrés avec **Docker** et exposés via une **API Gateway (Traefik)**.

---

## 📦 Microservices existants (MVP)

| Service           | Protocole | Port local | Statut | Description |
|------------------|-----------|------------|--------|-------------|
| Mobility          | REST      | 3000       | ✅ Fonctionnel | CRUD sur les lignes de transport |
| Air Quality       | SOAP      | 4000       | ✅ Placeholder | Indices de pollution (AQI) |
| Urgences          | gRPC      | 5001       | ✅ Placeholder | Gestion des alertes urgences |
| CityGraph         | GraphQL   | 5000       | ✅ Placeholder | Service GraphQL pour tests |

---

## ⚙️ Prérequis

- Docker & Docker Compose installés
- Node.js >= 18 (pour tests locaux si nécessaire)
- BloomRPC ou Insomnia pour gRPC
- Postman / navigateur pour REST et GraphQL
- SoapUI ou Postman en mode SOAP pour le service Air

---

## 🚀 Lancer la plateforme

1. Cloner le repo :

```bash
git clone https://github.com/souissiarij/smart-city-platform.git
cd smart-city-platform
