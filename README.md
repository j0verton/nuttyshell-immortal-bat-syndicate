# Nutshell: The Information Dashboard

## Overview
Nutshell is an application that enables a user to organize their daily tasks, events, news articles, friends, and chat messages.

## Learning Objectives

1. Functions
2. Databases
3. Github
4. Objects
5. CSS/Flexbox
6. Array methods
7. Components
8. Handling user events
9. Implementing CRUD operations
10. Relational data
11. ERDs

## Planning Tools

1. [Wireframe](./src/images/IBS_wireframe.jpg)
2. [ERD](./src/images/IBS_ERD.png)

## Instructions for running this app:
Make sure you have Node.js and npm installed. After those are installed, make sure you use npm to install serve and json-server.
1. ```git clone``` the repository URL
2. ```cd``` into the directory it creates
3. 
4. Delete the ```.ignore``` file in the ```api``` directory
5. ```touch src/scripts/Settings.js```
6. Visit https://openweathermap.org/guide#how to create an account and get your API key
7. In ```Settings.js``` write the following code:<br>
```export default { weatherKey: "your API key here" }```
8. In the API directory change ```sample_database.json``` to ```database.json``` 
9. Serve JSON file utilizing ```json-server -w database.json -p 8088```
10. In a new tab in your terminal, ```cd``` into ```src```, and ```serve```
11. Go to the localhost address in your browser that serve is serving on and register an account

## Contributors

[Aaron Gertler](https://github.com/asgertler)<br>
[Jerry Robertson](https://github.com/BlackTousen)<br>
[Joe Overton](https://github.com/j0verton)<br>
[Rick Blake](https://github.com/blaker814)
