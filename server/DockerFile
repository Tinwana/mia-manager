# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from your local project to the container
COPY . .

# Expose the port that your Express.js app listens on (e.g., 3000)
EXPOSE 3000

# Start the Express.js application
CMD ["npm", "start"]
