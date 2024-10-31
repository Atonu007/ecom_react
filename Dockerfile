# Use the official Node.js image from the Docker Hub with version 21
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the React application with increased memory limit
CMD ["sh", "-c", "NODE_OPTIONS='--max-old-space-size=4096' npm start --host 0.0.0.0"]
