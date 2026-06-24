# Multi-Stage-Build: Eleventy baut die statische Seite, nginx serviert sie.
# Coolify-Buildpack: dockerfile (Static-Buildpack fuehrt den Build-Command nicht aus).

# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app
# WICHTIG: @11ty/eleventy liegt in devDependencies. Coolify setzt im Build oft
# NODE_ENV=production -> npm wuerde devDeps ueberspringen. Daher explizit erzwingen.
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npx @11ty/eleventy   # -> erzeugt /app/_site

# --- Stage 2: Serve ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/_site /usr/share/nginx/html
EXPOSE 80
