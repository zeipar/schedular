# Interview Scheduler

Interview Scheduler is a single page application (SPA) for schedule management.

A user can freely add, edit or delete interviews throughout the week with a list of interviewers.

This student project focuses on learning and practicing  React skills that dynamically renders components in the client.

Along with React, these important development skills are addressed: 
- API server with PostgreSQL on **Heroku**,
- **Axios**, 
- Testing libraries such as **Jest** with **Storybook** and **Cypress**,
- **Webpack** & **Babel**,
- **Webpack Dev Server**
- **Create React App**

## Major Features of this Product

- Interviews can be booked, canceled and edited between Monday and Friday.

- A user can switch between weekdays.

- A user can book an interview in an empty appointment slot, by typing in a student name and clicking on an interviewer from a list of available interviewers.

- A user can cancel/edit an existing interview.

- The list of days informs the user how many slots are available for each day.

- The expected day updates the number of spots available when an interview is booked or canceled.

- A user is presented with a confirmation when they attempt to cancel an interview.

- A user is shown an error if an interview cannot be saved or deleted.

- A user is shown a status indicator while asynchronous operations are in progress.

- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).

- The application makes API requests to load and persist data. We do not lose data after a browser refresh.


## Known Issues

- N/A at this moment


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
