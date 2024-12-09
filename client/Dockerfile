# Stage 1: Build environment
FROM node:20-alpine AS builder

# Declare build arguments
ARG VITE_API_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_CLOUD_NAME
ARG VITE_UPLOAD_PRESET_NAME

# Make build arguments available as environment variables during build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV VITE_CLOUD_NAME=${VITE_CLOUD_NAME}
ENV VITE_UPLOAD_PRESET_NAME=${VITE_UPLOAD_PRESET_NAME}

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and environment files
COPY . .

# Add debug print of environment variables during build
RUN echo "VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}"
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}"

# Build the application
RUN pnpm build

# Stage 2: Production environment
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]