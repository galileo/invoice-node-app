# X-Team - Invoice node application

## Purpose

This application will deliver API for invoice 2.0

## Installation

```
docker run --rm node npm install
```

## Setup

### Config & install

To configure the whole stack you need to setup the docker compose environments. To handle this just copy the copy 
distribution files

```
cp .docker/app.env.dist .docker/app.env
cp .docker/posgress.env.dist .docker/posgress.env
```
When you copy you config files and setup all the data in there like google 
API credentials you are able to install the application.

```
docker-compose run --rm app npm install
```


## Run

To run the stack just perform 

```
docker-compose up -d
```

Now you can open watch your project on [http://localhost:3000/]()
