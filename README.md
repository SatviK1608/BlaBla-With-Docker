# To pull and use these Docker images to run your application on another system, follow these steps:

## Install Docker:
Make sure Docker is installed on the new system. You can download and install Docker from the official Docker website.

## Log in to Docker Hub:
Open a terminal and log in to Docker Hub.

## Pull the Docker images:
Pull the images from your Docker Hub repository.

docker pull satvik403/my-node-server:latest

docker pull satvik403/my-react-client:latest

docker pull satvik403/my-postgres-container:latest

## Create a Docker network:
Create the shared network that will be used by the containers.


docker network create shared-network

## Create Docker volumes:
Create Docker volumes to persist the PostgreSQL data.

docker volume create pgdata

## Create a Docker Compose file:
Create a docker-compose.yml file on the new system. This file will define the services, network, and volumes.

version: '3.8'
services:
  db:
    image: satvik403/my-postgres-container:latest
    container_name: my-postgres-container
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: blaBla
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - shared-network

  app:
    image: satvik403/my-node-server:latest
    container_name: my-node-app
    environment:
      DB_HOST: db
      DB_USER: postgres
      DB_PASSWORD: 123
      DB_NAME: blaBla
    ports:
      - "3000:3000"
    depends_on:
      - db
    networks:
      - shared-network

  client:
    image: satvik403/my-react-client:latest
    container_name: my-react-client
    ports:
      - "3001:3000"
    networks:
      - shared-network

networks:
  shared-network:
    driver: bridge

volumes:
  pgdata:


## Run Docker Compose:
Use Docker Compose to start the application.

sh
docker-compose up
