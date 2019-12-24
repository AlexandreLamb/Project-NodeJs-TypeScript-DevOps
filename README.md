[![Build Status](https://travis-ci.org/AlexandreLamb/Project-NodeJs-TypeScript-DevOps.svg?branch=master)](https://travis-ci.org/AlexandreLamb/Project-NodeJs-TypeScript-DevOps)
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

## Docker Usage
you can also use the app in docker container if you have docker and docker-compose with 

```bash
docker-compose up
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

