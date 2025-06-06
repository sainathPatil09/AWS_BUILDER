# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Accept build arguments
ARG VITE_REACT_APP_API_URL

# Define env vars
ENV VITE_REACT_APP_API_URL=$VITE_REACT_APP_API_URL

RUN echo "API_URL=$VITE_REACT_APP_API_URL" 


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app (dist folder will be created)
RUN npm run build


# --------- Stage 2: Serve Built App ---------
FROM node:18-alpine AS production

WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]