# Use official Node.js LTS image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the server will run on
EXPOSE ${PORT_SERVER}

# Start the application
CMD ["npm", "start"]