[![pl](https://img.shields.io/badge/lang-pl-blue.svg)](https://github.com/ukashu/reactmap/blob/main/README.pl.md)
# Flight Planning web application

> :warning: The calculations are incorrect at the moment.

>## Description

&nbsp;&nbsp;&nbsp;&nbsp;This application calculates data needed for a flight plan based on input data and a route drawn on an OpenLayers map. It features an option to read magnetic declination and wind data from external sources via HTTP. It provides authorization built around google sign in and JWT tokens and a possibility of saving previous flights in a PostgreSQL database.

>## Technology stack

<ul>
  <p>server:</p>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
    </ul>
  <p>client:</p>
    <ul>
      <li>React.js</li>
      <li>Vite</li>
    </ul>
  <p>database:</p>
    <ul>
      <li>PostgreSQL</li>
      <li>Prisma</li>
    </ul>
  <p>authorization:</p>
    <ul>
      <li>Google Sign In</li>
      <li>Json Web Token</li>
    </ul>
  <p>testing:</p>
    <ul>
      <li>Jest</li>
      <li>Puppeteer</li>
    </ul>
</ul>

>## Installation

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prerequisites:
<ul>
  <li>node installed</li>
  <li>npm installed</li>
  <li>PostgreSQL (or other) database</li>
  <li>Google Cloud Platform access and an application with client id</li>
</ul>

1. Run the initialization script ```npm run init```. This will run npm install for backend and frontend and create the ```.env``` file. When asked, specify the environment variables. 

2. If you're on Windows, you might have to create the ```.env``` file and initialize the database manually. You'll need the following variables:
  - PORT (backend servers port number)
  - NODE_ENV (variable for specifying the apps environment - "development" or "production")
  - GOOGLE_CLIENT_ID (your applications google client id - found in google cloud console)
  - JWT_SECRET (key for generating JWT tokens)
  - DATABASE_URL (for postgresql database hosted on local machine  - ```postgres://[USERNAME]:[PASSWORD]@localhost:5432/[DATABASE_NAME]```)
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After creating the ```.env``` file run the command ```npx prisma migrate dev``` to initialize the database.

3. Inside the file ```reactmap\frontend\src\components\Main.jsx``` inside function ```google.accounts.id.initialize``` set the ```client_id``` value to your applications google client id

4. To start the server and client concurrently run ```npm run start```.

5. Go to ```http://localhost:5173```.