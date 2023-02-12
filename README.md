# Welcome to my Yelp Clone Project: Holler!
# Live link: [Holler: A Yelp Clone](https://holler-yelp-clone.onrender.com/)


The following project is another stepping stone to improve my skills as a software developer and engineer. It is representative of my retention and the application of the skills I have learned through App Academy. This is a web application inspired by the web platform Yelp. It allows a user to view, create, edit, and delete their businesses and reviews of their experiences during their visit. Additionally, a user is able to create a profile. It is a full stack application utilizing multiple technologies including, React/Redux for the frontend, Postgres/SQLAlchemy/Flask for the backend.


## Table of Contents
1. [Getting Started](#getting_started)
2. [Technologies](#technologies)
3. [Landing Page](#landing_page)
4. [Business Page](#business_Page)
5. [Reviews](#review)
6. [Features](#feature)
7. [Future Implementation](#futute_implementation)


<a name="technologies">
## Technologies
* Flask
* WTForms
* SQLAlchemy
* Python
* Node.js
* React
* Redux
* Material UI
* JavaScript
* Render


<a name="getting_started"/>
## Getting Started
1. [Clone Repository](https://github.com/gmerida92/Holler)
2. In the root folder, create a **.env** file that contains:
   ```
   SECRET_KEY=«generate_strong_secret_here»
   DATABASE_URL=sqlite:///dev.db
   ```
3.  In the root folder, install dependencies:
    ```bash
    pipenv install --dev -r dev-requirements.txt &&
    pipenv install -r requirements.txt
    ```
4. In the root folder, run build code:
   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
5. Key into react-app folder, install dependencies:
   ```bash
   npm install
   ```
6. In the react-app folder, run build code:
   ```bash
   npm start
   ```
      
      
<a name="landing_page">
## Landing Page
![holler_landing_page](https://user-images.githubusercontent.com/66697456/218296716-838aa857-c1dc-4da4-a187-001c29944cf2.png)
      
      
<a name="business_page">
## Business Page
![business_page](https://user-images.githubusercontent.com/66697456/218296770-b21d7c1b-21a3-42f1-b939-623c4151c850.png)
      
      
<a name="review">
## Review
![review](https://user-images.githubusercontent.com/66697456/218296926-7667739d-5dad-41c7-a888-2735452a7774.png)
        

<a name="features">
## Features
### Primary Features
* Create a new User
* Log in a user
* Demo user login
* View, create, edit, and delete business
* View, create, edit, and delete review
      
<a name="futute_implementation">
## Future Implementation
* Google API
* AWS Cloud
* Add and Delete Images
