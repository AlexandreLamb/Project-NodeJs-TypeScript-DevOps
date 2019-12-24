FROM node:10 

WORKDIR /app 

COPY package.json package.json 

RUN npm install 

COPY . . 

EXPOSE 3030 

CMD [ "npm","run","test" ]