FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/

FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=api"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build --workspace=api

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
RUN npm ci --omit=dev --workspace=api
COPY --from=build /app/packages/api/dist ./packages/api/dist
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=api"]