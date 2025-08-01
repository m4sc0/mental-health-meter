# build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# runtime stage
FROM node:20-alpine

WORKDIR /app

# install static file server
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

VOLUME ["/app/dist/data.json"]

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
