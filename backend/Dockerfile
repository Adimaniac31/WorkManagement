# Dockerfile for the backend
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally (if not already installed)
RUN npm install -g nodemon

# Copy the rest of your application code
COPY . .

# Expose the application port (if necessary)
EXPOSE 3000

# Start the application
CMD ["nodemon", "server.js"]
