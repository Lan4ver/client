# build environment
FROM node:lts as build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
RUN npm i
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /client/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]