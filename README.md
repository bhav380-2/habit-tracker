# Habit Tracker

A  Habit Tracker application built with Node.js, Express, and MongoDB.


![View habits](/assets/readmeScreenShots/habitsList.png)


## Features

- **Track Multiple Habits**: Add and monitor various habits, such as reading a book, going to the gym, etc.

- **Daily Habit Status**: Log the status of each habit for every day - Done, Not Done, or None.

- **Current Habits View**: Display all current habits with an option to add new habits.

- **Weekly Habit Overview**: View a summary of the last 7 days for each habit, allowing users to toggle between statuses.



![View habits](/assets/readmeScreenShots/weekview.png)

- **Edit Historical Data**: Users can change the status of a habit for any of the previous 6 days.



## Folder Structure

The project follows a structured organization to ensure modularity and maintainability. Here's a brief overview of the main folders:

- **assets:** Contains static files like CSS, images and client-side JavaScript.

- **controllers:** Handles the application's business logic.

- **routes:** Defines the routes and their corresponding controller actions.
   - **index.js** file: Redirects requests to specific routes (habits.js)
   - **habits.js** file: Handles all habits requests

- **config:** Houses utility functions and configuration files.

- **models:** contains files specifying models schema

- **views:** Contains .ejs files

- **index.js:** file : server file


## Getting Started

1. **Clone the repository:**

   ```bash
    git clone https://github.com/your-username/habit_tracker.git
2. **Install dependencies:**

   ```bash
    cd habit_tracker
    npm install
3. **Set up MongoDB:**

    - Ensure that MongoDB is installed and running on your machine.
    - Update the MongoDB connection URL in server.js to match your configuration.

4. **Start the application:**
    ```bash
    npm start
