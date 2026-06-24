# Build-Image fuer Coolify (Buildpack: dockerfile + Static-Site).
# Coolify baut dieses Image und kopiert danach publish_directory (/_site)
# automatisch in einen eigenen nginx-Container. Daher KEINE nginx-Stage hier.
#
# @11ty/eleventy liegt in devDependencies -> Coolify setzt im Build oft
# NODE_ENV=production, daher explizit devDeps erzwingen.
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npx @11ty/eleventy   # erzeugt /app/_site
