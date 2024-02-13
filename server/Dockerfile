FROM alpine:3.17
RUN apk add nodejs npm

WORKDIR /app
COPY . .

RUN npm install
CMD [ "npm", "run", "dev" ]

EXPOSE 3001
