# README

To run this you need:

* Docker Toolbox
  * Docker Compose specifically
  * [Docker Toolbox is Install](https://www.docker.com/products/docker-toolbox)
  * node v5.5.0

## Notes

 * Database schema is in `db/schema.sql` which is automatically added to the docker postgres image or with `npm run start-docker`
 * The .config.json.template shows the format of .config.json file that is configurable. The default file is attached

# Install Deps

* npm install

# Run the tests

* npm test

# Improvements

 * Only insert if data is new instead of upsert
 * Handle API limits




