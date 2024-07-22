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
Create a docker-compose.yml file on the new system. This file will define the services([image will be satvik403/my-node-server:latest,satvik403/my-react-client:latest,my-postgres-container:latest,define ports,define container_name,define environment,mention depends_on]), network(shared-network), and volumes(pgdata).



## Run Docker Compose:
Use Docker Compose to start the application.

sh
docker-compose up
