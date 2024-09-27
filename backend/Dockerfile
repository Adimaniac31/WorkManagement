# Use Node.js base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./ 
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE ${PORT_SERVER}

# Start the application using wait-for-it
CMD ["sh", "./wait-for-it.sh", "db:${PORT_DATABASE}", "--timeout=30", "--strict", "--", "npm", "start"]
