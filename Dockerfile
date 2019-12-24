FROM node:10 

WORKDIR /app 

COPY package.json package.json 

RUN npm install 

COPY . . 

EXPOSE 3030 

RUN npm install -g nodemon 

CMD [ "nodemon", "backend/server.ts" ] 