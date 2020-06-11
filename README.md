# rideshare
This app is basically a clone of Lyft/Uber that leverages Django and React to provide a lightning-fast lightweight intro on how these two frameworks interact with each other. Users are updated on the status of a ride `(requested, started, in progress, completed)` with real-time alerts. I integrated websockets using Django Channels to achieve this functionality.

In addition to Django and React, this app makes use of the following:
* Cypress
* Docker
* Django REST Framework
* nginx

Signup, login, routing, and everything else front-end related are handled in React while Django is responsible for issuing JWT tokens, writing data to tables, and all other API-related tasks.
