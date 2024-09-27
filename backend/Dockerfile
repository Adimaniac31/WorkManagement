FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of your application code
COPY . .

# Download wait-for-it script to wait for MySQL
RUN curl -o /usr/src/app/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    ls -la /usr/src/app/wait-for-it.sh
RUN cat /usr/src/app/wait-for-it.sh

# Ensure the script is executable
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the application port
EXPOSE ${PORT_SERVER}

# Debug: Check if wait-for-it.sh exists
RUN ls -la /usr/src/app/wait-for-it.sh

# Start the application using wait-for-it
CMD ["sh", "./wait-for-it.sh", "db:${PORT_DATABASE}", "--timeout=30", "--strict", "--", "npm", "start"]

