# Django REST-API service 
This service uses the docker to dockerize the containers (Django, Database). After dockerization you can deploy it to kubernetes uses the Depoloyment.yaml file.

# Installation
- Copy .env.dist file to .env file `cp .env.dist .env`
- Create docker image by `docker build .`
- Create k8s cluster `kind create cluster --name {your name}`
- Deploy your docker image to k8s `kubectl deploy Deployment.yaml`
