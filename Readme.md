# Getting started with this Rest-API service

## This project is created by [Glebfra](https://github.com/Glebfra).

## 1. Installing Docker

### Docker installing

#### If you are using windows:
- Download windows [wsl2](https://learn.microsoft.com/ru-ru/windows/wsl/install)
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Allow the wsl2 support in docker desktop

#### If you are using linux
- Install Docker Engine using [this](https://docs.docker.com/engine/install/ubuntu/)

## 2. Installing this project

### Clone this project
### `git clone git@github.com:Glebfra/RestAPI.git`
### `git clone https://github.com/Glebfra/RestAPI.git`

###

### `cd RestAPI`
Redirect to folder

### `cp .env.dist .env`
Copy the environment example file

### `docker-compose up -d --build`
Create and launch containers


- Django app: [http://localhost:8000](http://localhost:8000)
- React app: [http://localhost](http://localhost)
- PhpMyAdmin app: [http://localhost:8080](http://localhost:8080)
