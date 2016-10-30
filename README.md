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

![Running NPM Test](https://raw.githubusercontent.com/kthakore/musecal_chairs/master/test.gif)



# Run the script

* DEBUG=Runner,JOBS npm start


![Running NPM Start](https://raw.githubusercontent.com/kthakore/musecal_chairs/master/run.gif)



# Query 'How many jobs with the location "New York City Metro Area" were published from Sept. 1st to 30th 2016?"

Using a gin index on the locations field in the Jobs table. We can do:

`
select count(*) from jobs
where locations @> '[{"name" : "New York City Metro Area"}]' and publication_date between '2016-09-01' AND '2016-09-30'
`

# Debug Mode

You can show debug comments for:
  * JOBS
  * SQL
  * Runner

With the environment variable `DEBUG`

## Example

```
 DEBUG=JOBS,SQL npm start
```

or even: `DEBUG=*` for all levels of debugging

# Improvements

 * Only insert if data is new instead of upsert
 * Normalize the JSONB fields into specific fields
   * Would need to be able to create primary keys on specific fields
 * Update the varchar limit of `short_name` fields so that the data is store more efficiently




