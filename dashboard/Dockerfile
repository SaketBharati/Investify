# STAGE 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 1. Declare the arguments expected from Docker Compose
ARG REACT_APP_API_URL
ARG REACT_APP_DASHBOARD_URL

# 2. Make them available as environment variables during the build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_DASHBOARD_URL=$REACT_APP_DASHBOARD_URL

# 3. Compile the React app (Webpack will now find and inject the ENV variables)
RUN npm run build

# STAGE 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]