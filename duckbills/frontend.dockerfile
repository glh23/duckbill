# Use official Node image for build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage: serve build with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if needed, or use default

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
