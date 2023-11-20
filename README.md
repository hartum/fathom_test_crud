# Documentation for Installing and Running the Application Locally

## Context before installation

The original test is written to test the skills of a fullstack and the test has been written for a frontend developer. In this development the Postgress, Prisma and fastify part has been omitted. Instead, https://mockapi.io/ has been used to simulate the API calls.

## Mock API Info

For this development, mockapi.io has been used to simulate API calls. You can find specific information on how to set up the mock API in the `apiService.ts` file.

## Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js and npm:** You can download them from [https://nodejs.org/](https://nodejs.org/).

## Steps to Install the Application

1.  **Clone the Repository:**

    bashCopy code

    `git clone https://github.com/hartum/fathom_test_crud.git`

2.  **Navigate to the Project Directory:**

    bashCopy code

    `cd users-crud`

3.  **Install Dependencies:**

    bashCopy code

    `npm install`

## Steps to Run the Application

4.  **Start the Application in Development Mode:**

    bashCopy code

    `npm run dev`

    This command will start the application in development mode and open your default browser at [http://localhost:5173](http://localhost:5173/).

5.  **View the Application:** Open your web browser and visit [http://localhost:5173](http://localhost:5173/) to see the application in action.

## Using the Application

6.  **Interact with the Application:**

    - Use the user interface to create, update, or delete users based on the provided functionalities.
    - Observe how the list of users dynamically updates.

7.  **Stop the Application:** When you have finished testing the application, you can stop it using the command:

    bashCopy code

    `Ctrl + C`

## Common Issues

- **Dependency Errors:** If you encounter errors related to dependencies, ensure that all dependencies are installed correctly by running `npm install` again.
