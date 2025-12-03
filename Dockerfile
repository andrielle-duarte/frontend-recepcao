FROM node:22-alpine

RUN apk update && apk upgrade

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
