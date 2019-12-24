[![Build Status](https://travis-ci.org/AlexandreLamb/Project-NodeJs-TypeScript-DevOps.svg?branch=master)](https://travis-ci.org/AlexandreLamb/Project-NodeJs-TypeScript-DevOps)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-green.svg?style=flat-square)](#contributors-)

# Projet NodeJs DevOps

Simple app using nodejs express mongodb jest docker docker-compose travis 

## Installation

Use the package manager [npm](https://www.npmjs.com) to install the project.

```bash
npm install
```

## Usage
Create a .env file like in the .env.example file in root directory or like this 
```bash
NODE_ENV= XXXX	

PORT= XXXX	

MONGODB_URI= your_mongodb_url (mongodb://localhost:27017 for most usage)	
MONGODB_DATABASE= your_data_base_name	

LENGTH_PASSWORD= your_length	
JWT_SECRET_TOKEN= your_token
```
After that be sure you'r mongodb server is running before start project or download it [here](https://www.mongodb.com/what-is-mongodb)
Please check if mongodb port on your device is 27017

You can populate the database before run the project with 

```bash
npm run populate
```

## Start the project
For start the project in dev mode ( with nodemon ) you can simply run 

```bash
npm run dev 
```
or just run the project in start mode with 

```bash
npm run start
```
## Test 

Jest is the framework use for the test, for testing the app you can run 

```bash
npm run test
```
Or you can checkout to branch ft/travis-docker and you have a container docker configure to run the test script in the travis environment but there is a litle probleme to fix, the container exit but when conatainer exit the travis doesn't exit, if you have an idea to execute the test on traviCi on a docker conatenaire please open an Issue or a Pull request ( See Contributing ) 
the link to the [build](https://travis-ci.org/AlexandreLamb/Project-NodeJs-TypeScript-DevOps/builds/629150670) 

## Docker Usage
you can also use the app in docker container if you have docker and docker-compose with 

```bash
docker-compose up
```
## API
Route auth

Register http://localhost:3030/api/register
```bash
req = { body: {
   email:string,
   username:string,
   password:string
  } }
res = { json: {  } }
```

Login http://localhost:3030/api/login
```bash
req = { body: {
   email:string,
   password:string
  } }
res = { json: { token: 'xxxx' } }
```

Route metrics 

Create http://localhost:3030/api/metrics/create
```bash
req = { body: { 
              timestamp : String,
              value : String,          
          } 
           cookie : {
               userEmail : string
             }
  }
  res = { }
```
Delete http://localhost:3030/api/metrics/delete/:id
```bash
req = { params : { id : string } }
res = { } 
```
Read http://localhost:3030/api/metrics/read
```bash
req = { header: { "token" } }
res = { json: [{ 
                   "_id": "string",
                   "timestamp" : "string",
                   "value" : "string",
                   "userId" : "string"
                }] 
  }
```

Update http://localhost:3030/api/metrics/update/:id
```bash
req = { body: { 
              timestamp : String,
              value : String, 
              id : String
          }  }
res = { } 
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contributors
Lambert Alexandre
Sartoris Louis

## License
[MIT](https://choosealicense.com/licenses/mit/)

