# Dev-Academy-Preassignment

# Description:

This is a repo for dev academy 2023 exercise: Helsinki city bike app using: React, Apollo client, Node.js, express, GraphQL, MongoDB, mongoose. Below are the details of the exercise and instructions for installation:

---

#Project structure:

├── index.js

├── build (same as the client/build)

├── client (folder for frontend)

├── server (folder for backend)

├── Dockerfile

---

#Contents of the exercise:

0. Data import:

Data from CSV files were imported to MongoDB database (Atlas). Unwanted data (i.e.,journeys that lasted for less than ten seconds, and journeys that covered distances shorter than 10 meters) were filtered in the backend.

1. Journey list view

1.1 List journeys

For each journey, departure and return stations, covered distance in kilometers and duration in minutes are showed in the "Journey" page.

1.2 Additional points

Pagination, Ordering per column, Searching by departure/return station names, and Filtering by journey duration are included.

2. Station list view

2.1 List all the stations

In the "Station" page, Pagination, Searching, ordering per column, and deleting a station are included. Single station view can be found by clicking on each station row.

In the "Single Station view" page, Station name, Station address, Total number of journeys starting from the station, Total number of journeys ending at the station are included.

2.2 Additional

Station location on the map, The average distance of a journey starting from the station The average distance of a journey ending at the station are shown on Single Station View.

3. Extra functions:

3.1 Endpoints for storing new bicycle stations.

3.2 Items per page setup (10/15/20).

3.3 Running backend in Docker container, Running database in Cloud (MongoDB).

3.4 Implement E2E tests Create UI for adding bicycle stations Create UI for updating. bicycle stations information.

3.5 Googlemap autocomplete functionality.

3.6 Deployment: https://citybike-website.onrender.com/

---

#Install:

1.  Install Docker on your computer (for linux system, use the correct guide for your distribution): https://docs.docker.com/get-docker/

2.  Clone this repository

3.  To run the application properly, a working google map api key and MongoDB URI are required. Used keys in .env file: `REACT_APP_GOOGLE_MAP_API_KEY, MONGO_URI`

4.  Run the application in docker:

        docker compose up --build

5.  By default the application will run on localhost:9000, but you can change the ports in docker-compose.yml before run the build command in the previous step:

        - 9000:9000
            └─change the first "9000" to the port you want
