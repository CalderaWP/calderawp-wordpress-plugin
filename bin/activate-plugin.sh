#!/usr/bin/env bash
docker-compose run --rm cli wp plugin activate caldera-wordpress-plugin
docker-compose run --rm cli wp plugin activate caldera-forms
docker-compose run --rm cli wp plugin activate gutenberg

# Install test form importer/Ghost Inspector runner
docker-compose run --rm cli wp plugin activate ghost-runner/plugin
cd wp-content/plugins/ghost-runner
if [ ! -d wp-content/plugins/ghost-runner/vendor ]
then
    composer install
fi

if [  -d wp-content/plugins/ghost-runner/vendor ]
then
    composer update --no-dev
fi