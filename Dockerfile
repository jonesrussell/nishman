# Stage 1: Build the application
FROM node:lts-alpine3.19 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Build the project using Vite
RUN npm run build

# Stage 2: Serve the application
FROM node:lts-alpine3.19

# Install serve globally in the new stage
RUN npm install -g serve

# Copy the built files from the builder stage
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your app using serve
CMD ["serve", "-s", "dist", "-l", "5000"]