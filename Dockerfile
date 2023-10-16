# Start from a base image with Node.js
FROM node:18.13

# Update the system and install glibc
RUN apt-get update && apt-get install -y libc6

# Copy your project files into the image
COPY . /app
WORKDIR /app

# Install your project's dependencies
RUN npm install

# This command will run when the container starts
CMD ["npm", "start"]
