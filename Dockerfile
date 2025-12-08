FROM node:22-alpine

WORKDIR /app

# Correto para Alpine (sem -y)
RUN apk update && apk upgrade

COPY package*.json ./
# Instala @react-keycloak/web + deps
RUN npm ci

COPY . .
EXPOSE 5173

# Seu CMD original (dev mode)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
