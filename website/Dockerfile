FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["tail", "-f", "/dev/null"]  # Mantém o container vivo após build
