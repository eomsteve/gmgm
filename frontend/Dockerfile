FROM node:16.15.0 as build-stage

WORKDIR /var/jenkins_home/workspace/gamulgamul/frontend

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --force

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/gamulgamul/frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g","daemon off;"]