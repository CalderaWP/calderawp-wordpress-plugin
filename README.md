# Caldera WordPress Plugin


## Requirements
* PHP 7.1 + 



## Install
Requires git and Composer and npm and Yarn

* Clone From Github:
    - `git clone git@github.com:CalderaWP/caldera-wordpress-plugin`
* Build for development:
    - `yarn && composer install`
* Setup test and local development environment:
    - `composer wp:install && composer wp:activate && composer cf:form-import`


### end to end (e2e) Tests
e2e tests are written using cypress.io in the directory `cypress`.

* Launch the test runner for cypress:
    `yarn test:e2e`
### JavaScript

* Start dev server for React app
    - `yarn start:app`
* Run JavaScript Unit Tests
    - `yarn test`
* Run Flow analysis
    - `yarn flow`


### PHP
* All PHP is developed in `/php`


#### Testing PHP
* Run PHP Tests, Lints And Sniffs
    - `composer tests`

* Run Unit Tests:
    - `composer test:unit`
    
    
### Install Local Development Environment
A  local development environment is included, and provided. It is used for integration tests. Requires Composer, Docker and Docker Compose.

* Install Local Environment And WordPress "Unit" Test Suite
- `composer wp:install`

You should now have WordPress at [http://localhost:8218/](http://localhost:8218/)
* Username: admin
* password: password

#### Setup plugins and test forms
* Activate Plugins
    - `composer wp:activate`
* Import test forms
    - `composer cf:form-import`

### Using Already Installed Local Development Environment

* (re)Start Server: Once server is installed, you can start it again
- `composer wp:start`

* (re)Activate Plugins
- `composer wp:activate`

* (re)Set WordPress permalinks
- `composer wp:config`

### Testing With Local Environment
Tests will also run in Travis on each push. You should also run tests locally as you develop.

#### Install Test Suites
Follow the steps above to create local development environment, then you can use the commands listed in the next section.
### Install Local Development Environment
A  local development environment is included, and provided. It is used for integration tests. Requires Composer, Docker and Docker Compose.

* Install Local Environment And WordPress "Unit" Test Suite
- `composer wp:install`
* Import test forms and put them on pages
- `composer cf:test:install`

You should now have WordPress at [http://localhost:8218/](http://localhost:8218/)
* Username: admin
* password: password

### Using Already Installed Local Development Environment

* (re)Start Server: Once server is installed, you can start it again
- `composer wp:start`

* (re)Activate Plugins
- `composer wp:activate`

* (re)Set WordPress permalinks
- `composer wp:config`

### Testing With Local Environment
Tests will also run in Travis on each push. You should also run tests locally as you develop.

#### Install Test Suites
Follow the steps above to create local development environment, then you can use the commands listed in the next section.

### Other CLI Commands

* `cwp import`
    - Import all test forms that are not currently imported
* `cwp pages`
    - Add pages, with form shortcodes needed to run tests.
