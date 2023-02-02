FROM node:14.16.0-alpine3.13

# -S creates a system-user -G sets the users to a group
RUN addgroup usrgrp && adduser -S -G usrgrp newusr
USER newusr

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001 

CMD ["npm", "run", "server"]
