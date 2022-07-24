# ============================
# Build stage
# ============================
FROM node:16.13.2-alpine3.14 as build-stage
WORKDIR /build_stage

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --no-save

COPY . .

RUN npm run build

# ============================
# Run stage
# ============================
FROM node:16.13.2-alpine3.14 as production-stage
WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY ./key.json ./

RUN npm install --no-save --production

COPY --from=build-stage /build_stage/dist /app/dist

CMD npm run start:prod