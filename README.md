# CMD
docker container run -it -p 8000:8000 --name nsvr -v ${PWD}/src:/app/src shun/nsvr:latest


# データベース作成
mysql -u root -p
password

create database lucid character set utf8mb4