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

# Download wait-for-it script to wait for MySQL
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the application port
EXPOSE ${PORT_SERVER}

# Start the application with wait-for-it
CMD ["./wait-for-it.sh", "db:${PORT_DATABASE}", "--timeout=30", "--strict", "--", "npm", "start"]
