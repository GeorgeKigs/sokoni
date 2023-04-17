FROM node:16 as base
RUN apt-get update && apt-get install -y python3
WORKDIR /shop
COPY package.json .
# if the test builds correctly 
# we can spin up the production container
# FROM base as test
# RUN npm install
# COPY . .
# RUN npm run test

# production section
FROM base as production
RUN npm install --omit=dev
EXPOSE 5000
COPY . .
CMD [ "node","index.js" ]
