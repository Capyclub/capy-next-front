# Étape 1 : Image de build pour installer les dépendances et construire l'app
FROM node:18-alpine AS builder
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour optimiser le cache
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copier tout le code source
COPY . .

# Build Next.js uniquement en production
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Étape 2 : Image de production, plus légère
FROM node:18-alpine AS production
WORKDIR /app

# Copier les fichiers essentiels depuis l'image builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:18-alpine AS development
WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "run", "dev"]