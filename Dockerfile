FROM node:20.15.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

ARG PORT=3000
EXPOSE ${PORT}

CMD ["npm", "run", "start"]
