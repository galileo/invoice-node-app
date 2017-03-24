# X-Team - Invoice node application

## Purpose

This application will deliver API for invoice 2.0

## Installation

```
docker run --rm node npm install
```

## Setup

### Config

Create a config.local.js in the root directory of the project and override or set any value provided by config.js. The minimal contents for the config.local.js file should be:

```
module.exports = {
  APP_LISTEN_PORT: 3000,
  GOOGLE_OAUTH_CLIENT_ID: 'YOUR_CLIENT_ID',
  GOOGLE_OAUTH_SECRET_ID: 'YOUR_SECRET_ID'
}
```


## Run

```
host$ docker run -it --rm -v ${PWD}:/app -w /app -p 3000:3000 node bash
```

This will enter your short time lived container and will allow you to start the application 

```
container$id npm start
```
