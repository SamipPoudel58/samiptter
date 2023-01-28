FROM node:16.18.0-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["sh","-c","npm","rebuild","esbuild","&&","npm","run","dev"]
