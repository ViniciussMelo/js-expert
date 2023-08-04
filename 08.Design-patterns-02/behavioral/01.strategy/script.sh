docker run \
  --name js-expert-postgres \
  -e POSTGRES_USER=viniciussmelo \
  -e POSTGRES_PASSWORD="senha0001" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs js-expert-postgres
docker exec -it js-expert-postgres psql --username viniciussmelo --dbname heroes
CREATE TABLE warriors (id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

# mongodb
docker run \
  --name js-expert-mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=viniciussmelo \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -p 27017:27017 \
  -d \
  mongo:4

docker logs js-expert-mongodb