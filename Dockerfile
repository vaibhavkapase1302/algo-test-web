# Multi-stage build for React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

# Install serve to serve static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/build ./build

# Copy environment file
COPY env.production .env

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
