#  Stage 1
FROM node:22.14.0 AS builder

WORKDIR /app

COPY package.* ./
RUN npm install

# RUN npm install
COPY . .

#Stage 2
FROM node:22.14.0-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 4001

CMD ["npm", "start"]