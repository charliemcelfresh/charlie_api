##README
### Overview
This is a JSONAPI.org-compliant api whose purpose is to accept JSON events at api/v1/events, and queue them for processing by workers.
### Prerequisites
* Postgres (10+ recommended)
* Node 11.0.0
### Install
* Create two databases, charlie_test and charlie_dev
* npm install
* DATABASE_URL=postgresql://<username:password>@localhost:5432/charlie_dev npm run migrate up
* DATABASE_URL=postgresql://<username:password>@localhost:5432/charlie_test npm run migrate up
### Run tests
* npm test

Questions? cwmcelfresh@gmail.com
