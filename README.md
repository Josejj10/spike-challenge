# Spike Software Engineer Challenge

This project is a monorepo for a web application that fetches two addresses using the [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/) and finds the distance in kilometers between them.

Since this project is being made as a part of the technical assesment at Spike/Bain, it also has the answers for its theoretical part of the challenge are located in the Readme.md file on the folder `answers`.

App: http://spike-challenge.herokuapp.com/.

# Architecture

In order to store historical query data, instead of just using Local Storage I decided to make a backend project, and let it handle the algorithm for calculating the distance, too. In doing so, I hope to emulate a functional prototype for a concept in early stages.

Since both the frontend and backend are located in this repository, it is a monorepo. It was made like this in order to avoid moving between repositories to test the projects' integration. Furthermore, this decision made them simpler to deploy using docker-compose and a Dockerfile in each project.

I went with Django and React because of familiarity, and opted for a Heroku deployment because it removes many obstacles like setting up a free-tier DB. Since Heroku was being used, I went with a Postgres DB.

To avoid investing a lot of time into project configuration, I used [Alschn's django-react-docker-heroku-template](https://github.com/Alschn/django-react-docker-heroku-template) as a boilerplate.

## Frontend

React with TypeScript and Tailwind for quick styling. Since it is a small project, no external component library or Storybook will be used. Even so, there are some internal components to avoid repeating code. And it helps! The Distance Result Card used for SearchHistory is also used for the result in the Calculate Distance Tab.

Tailwind's mobile first breakpoint system and a combination of grid and flex displays allowed the project to be responsive without needing to go deep into styling. Also, I used react-select for its async loading options features that help in selecting the address, but also added a debounce to the fetch function to refrain from making many unused API calls to Nominatim.

## Backend

Django with DRF to make an API that handles the logic for calculating the distance between points, and also stores in a Postgres database the queries made.

There are a lot of fields that are not used in the models but, following the line of thought that this is a prototype that might scale up later, they were not left out.

## Delivery and Hosting

Docker's docker-compose tool is perfect for this monorepo because it simplifies the creation of its instances while also taking the phrase "but it worked locally" out of the equation. The hosting is handled by Heroku, since it is free, has a free-tier Postgres DB and also has a stack for a containerized application, such as this.

# Roadmap

This project was made incrementally, to mirror how a Scrum team would do it. And, like it happens to every project, the initial roadmap had to be reformulated as the project progressed.

1. Configure projects with Docker
2. Deploy to Heroku
3. Implement backend algorithm for calculating distance
4. Integrate backend API to frontend
5. Design frontend main layout
6. Add styles to frontend
7. Create Calculate Distance Component in frontend
8. Create Search History Component in frontend

---

If you have any questions, feel free to reach me!
