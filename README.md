# newsletter-subscription-slim-react
Technologies used for the realization of this project:

**Front-End:** ReactJs, Tailwind


**Back-End:** Php-Pdo, Slim4, Mysql

**Docker**

The purpose of this project is for el customers to register in the newsletter and become part of our newsletter.
Then the login and admin site was implemented where we can see all the data found in the database. And to be able to modify them in the admin after logging in.
The actions that we can take are to delete and edit the data.

The first step you need to do is to clone the project.
```bash
git clone git@github.com:Loeffelhardt/newsletter-subscription-slim-react.git
```
The project can be run in two ways: 

1. Make sure to install the dependencies if you want to develop or build locally:
```bash
 # /docker-newsletter/api > 
 composer install
 # /docker-newsletter > 
 docker compose up --build
```
2. Start dependency application stack with docker http://localhost:3000/newsletter
```bash
 # /docker-newsletter > 
 docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
 ```