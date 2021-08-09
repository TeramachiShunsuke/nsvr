FROM node:16.4.1
WORKDIR /app/src

#ローカル環境をコピー
COPY ./src /app/src
#yarn の最新化
RUN yarn upgrade 

RUN yarn add @adonisjs/lucid
RUN yarn add @adonisjs/auth
RUN yarn add mysql
RUN yarn add crypto-js
RUN yarn add @types/crypto-js
RUN yarn add phc-argon2
RUN yarn add @adonisjs/shield
RUN node ace configure @adonisjs/lucid


# #シェル起動
# CMD ["/bin/bash"]

# CMD ["node","ace","serve","--watch"]
