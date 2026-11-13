# 1. Select the base image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the dependency definition files first
COPY package*.json ./

# 4. Install production dependencies strictly from the lockfile
RUN npm ci --omit=dev

# 5. Copy the rest of the backend source code
COPY . .

# 6. Document the port the container listens on
EXPOSE 8080

# 7. Define the runtime command
CMD ["node", "index.js"]