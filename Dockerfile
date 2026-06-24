# Multi-Stage-Build: Eleventy baut die statische Seite, nginx serviert sie.
# Coolify-Buildpack: dockerfile (Static-Buildpack fuehrt den Build-Command nicht aus).

# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # -> erzeugt /app/_site

# --- Stage 2: Serve ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/_site /usr/share/nginx/html
EXPOSE 80
