FROM node:16.15.0 as build-stage

WORKDIR /var/jenkins_home/workspace/gamulgamul/frontend

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]