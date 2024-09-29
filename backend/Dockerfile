# Use Node.js base image
FROM node:20

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./ 
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE ${PORT_SERVER}

# Start the application using wait-for-it
CMD ["sh", "./wait-for-it.sh", "db:${PORT_DATABASE}", "--timeout=30", "--strict", "--", "npm", "start"]
