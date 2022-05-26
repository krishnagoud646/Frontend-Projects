# storeFrontBackend

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


# open two terminals 

## In a terminal tab, create and run the database:

- run `su postgres` to connection for postgres **(password:krishna)**
- run `psql postgres` for connection of sql
- run `CREATE USER magic_user WITH PASSWORD 'password123';` for creating a new user
- `CREATE DATABASE stores;` a database for store
- `CREATE DATABASE stores_test;` a database for store_test
- `\c stores` connect to database 
- `  GRANT ALL PRIVILEGES ON DATABASE store TO magic_user;  `

### Meta Commands

`\l` List databases
`\c` Connect to a database
`\dt` Display Tables in a database
`\q` Quit out of psql to normal terminal


## In the 2nd terminal:

- install yarn `npm install yarn -g`
- install db-migrate on the machine for terminal commands `npm install db-migrate -g`
- check node version `node -v` - it needs to be 10 or 12 level
- IF node was not 10 or 12 level, run
    - `npm install -g n`
    - `n 10.18.0`
    - `PATH="$PATH"`
    - `node -v` to check that the version is 10 or 12
- install all project dependencies `yarn`
- to test that it is working, run `yarn watch` should show an app starting on `0.0.0.0:3000`


## Instructions to install db-migrate
Install the global package `npm install -g db-migrate`
Install the package to the project yarn add `db-migrate db-migrate-pg`
Add a database.json reference file in the root of the project. Later, when we are working with multiple databases - this will allow us to specify what database we want to run migrations on.Here is an example database.json, you will just need to change the database names:
`{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds",
    "user": "magical_user",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds_test",
    "user": "test_user",
    "password": "password123"
  }
}`

## Prerequisite

PostgreSQL

crate database 1. store   2. store_test
install dotenv
Install all dependencies
for following dependencies run `npm install <dependencies name>`

{
  "name": "storefront_backend",
  "version": "0.1.0",
  "description": "",
  "main": "server.ts",
  "scripts": {
    "test": "npm run build && set ENV=test && db-migrate up --env test  && jasmine-ts && db-migrate down --env test --count 4",
    "build": "npx tsc",
    "start": "nodemon src/server.ts",
    "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./build --onSuccess \"node ./build/server.js\"",
    "tsc": "tsc"
  },
  "author": "Udacity",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.2",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "express": "^4.17.3",
    "nodemon": "^2.0.15",
    "pg": "^8.7.3",
    "typescript": "^4.6.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.13",
    "@types/jasmine": "^3.10.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/node": "^17.0.21",
    "@types/pg": "^7.14.11",
    "@types/supertest": "^2.0.11",
    "dotenv": "^16.0.0",
    "jasmine": "^3.99.0",
    "jasmine-json-test-reporter": "^1.0.0-beta",
    "jasmine-spec-reporter": "^6.0.0",
    "jasmine-ts": "^0.3.3",
    "jsonwebtoken": "^8.5.1",
    "supertest": "^6.2.2",
    "ts-node": "^9.1.1",
    "tsc-watch": "^4.6.0"
  }
}

### Starting the server :

run "npm run start" to start the server

The database runs on port : `5432`

base url is `http://localhost:3000`

## testing a project
* run following command to run the test
`npm run test`

## Run server
`npm run start`

## migrate creation
Create a migration `db-migrate create mythical-worlds-table --sql-file`
Add the SQL you need to the up and down sql files
Bring the migration up `db-migrate up`
Bring the migration down `db-migrate down`

## API List


####  User API

- Create new user (POST)
  http://localhost:3000/users/

  Request body to be
  {
    firstname: string;
    lastname: string;
    username: string
    password: string;
  }

  Response is
  {
    id: number
    firstname: string;
    lastname: string;
    username: string
    password: string;
  }

- Authenticate (POST)
  http://localhost:3000/users/authenticate/

  Request body to be
  {
    "username": string,
    "password": (string)
  }

  Response
  {
    jwt_token or "invaild credentials"
  }

- Get all users (GET)
  http://localhost:3000/users/

  _Need to put bearer token in the header_

  Request body: None

  Response is an array
  [
    {
       id: number
        firstname: string;
        lastname: string;
        username: string
    },other ...  ]

- Get single user by user_id (GET)
  http://localhost:3000/users/:id

  _Need to put bearer token in the header_

  Request body: None

  Response
  {
        id: number
        firstname: string;
        lastname: string;
        username: string
  }



####  Product API

- Create new product (POST)

  
  http://localhost:3000/product/
    _Need to put bearer token in the header_

   Request body is
  {
    name: (string),
    price: (integer),
  }
  

  Response is
  {
    id: string,
    name: string,
    price: string,
  }

- Get all products (GET)
  http://localhost:3000/product/
  ```

  Request body: None

  Response is an array
  [
    {
        id: string,
        name: string,
        price: string,
    }, other items if any..]

- Get single product by product_id (GET)

  http://localhost:3000/product/:id

  _Need to put bearer token in the header_

  Request body: None

  Response is 
  {
        id: string,
        name: string,
        price: string,
  }

#### Order API

- Create new order (POST)
  http://localhost:3000/orders/
  ```

  _Need to put bearer token in the header_

  Request body is
  {
        quantity: number,
        user_id: number,
        status: string,
  }

  Response is
  {
        quantity: number,
        user_id: number,
        status: string,
  }

- Get all orders (GET)
  http://localhost:3000/orders/

  Request body: None

  Response is an array
  [
    {
      quantity: number,
        user_id: number,
        status: string,
    },other items...  ]
  ```

- Get single order by order_id (GET)
  http://localhost:3000/orders/:id

  _Need to put bearer token in the header_

  Request body: None

  Response is
  {
    quantity: number,
        user_id: number,
        status: string,
  }






