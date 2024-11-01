# Use a lightweight Node.js image as the build environment
FROM node:21-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Use `serve` to serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
