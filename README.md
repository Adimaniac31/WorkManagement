
# Project Report: Skill Learning Website with Task Management and CRUD Operations

This project focuses on developing a **skill-learning website** that helps users manage their learning process by breaking down tasks into daily, weekly, and other categories. The core of the application allows users to create, read, update, and delete (CRUD) tasks, providing a flexible and organized way to track progress. To deploy the backend, I utilized **AWS EC2** and **Docker** for a scalable and containerized infrastructure.

## 1. Purpose and Functionality of the Website

The website was designed to facilitate efficient learning by allowing users to create personalized **learning plans**. These plans could be divided into:

- **Daily Tasks**: Small, manageable actions for each day.
- **Weekly Tasks**: Broader tasks to be completed over the course of a week.
- **Other Tasks**: Larger tasks that may span more than a week.

Users can track and update their progress by performing CRUD operations on the tasks they set, including marking tasks as complete, modifying task details, or removing tasks altogether.

## 2. Key Features

The website includes the following main features:

- **Task Creation**: Users can define new tasks, specifying deadlines, priorities, and descriptions.
- **Task Listing**: A clear, interactive list that shows tasks categorized by day, week, or other timeframes.
- **Task Updating**: Users can modify the details of tasks, adjusting deadlines, or marking them as completed.
- **Task Deletion**: Users can delete tasks that are no longer needed or have been completed.
- **Progress Tracking**: A simple yet effective system for tracking task completion over time, helping users stay organized and motivated.

## 3. Backend Architecture

To support the functionality of the website, I developed the **backend** using a suitable technology stack, which allows for CRUD operations on the tasks. The backend is built on a RESTful architecture and communicates with a database to store user and task data.

- **AWS EC2**: I deployed the backend on an AWS EC2 instance, which provides scalable computing power in the cloud. EC2 allowed me to run the backend application securely, with the flexibility to scale based on user demand.
  
- **Docker**: I containerized the backend application using Docker. Docker enabled me to isolate the application in a lightweight, portable container that could be easily deployed, replicated, or updated. This made the deployment process faster and more consistent across different environments.

## 4. Database Integration

The backend is integrated with a **relational database** (such as MySQL) to store tasks, user data, and other necessary information. This enables efficient management of tasks and allows users to interact with their data using CRUD operations.

## 5. Task Management System

The core of the website's functionality lies in its **task management system**. Users can perform the following CRUD operations:

- **Create**: Add a new task by specifying details such as task name, category (daily/weekly), description, and due date.
- **Read**: View a list of tasks, filtered by timeframes (daily/weekly), with the option to track progress or details.
- **Update**: Modify the properties of existing tasks, such as adjusting deadlines, changing task names, or marking tasks as complete.
- **Delete**: Remove unnecessary tasks from the list, helping users maintain a clean and organized workspace.

## 6. Deployment with Docker on AWS EC2

To deploy the backend of the website, I used **Docker** to containerize the application. This containerization ensured that the backend could be easily packaged with all dependencies and deployed on any system. The backend, once containerized, was deployed on an **AWS EC2 instance**, where it could scale as needed based on user load.

- Docker containers encapsulate the entire environment, making deployment faster and reducing compatibility issues.
- The EC2 instance provided the necessary compute power and scalability for handling user requests and task operations.

## 7. Benefits of the Approach

- **Scalability**: By leveraging AWS EC2 and Docker, the website can easily scale based on demand, ensuring that the backend can handle more users as the platform grows.
- **Flexibility**: Docker allows me to update and deploy the backend quickly, ensuring continuous improvement and integration of new features.
- **Organized Learning**: The task management system, divided into daily and weekly tasks, offers users an organized approach to managing their learning goals, making it easier to track progress and stay motivated.
- **Efficiency**: The CRUD operations provide users with full control over their tasks, enhancing the website's usability and practicality.

## Conclusion

This skill-learning website is an effective tool for individuals looking to structure their learning process through task management. By utilizing AWS EC2 and Docker, I ensured that the backend is robust, scalable, and easy to maintain. The website’s task management system, powered by CRUD operations, provides users with a flexible and organized way to track their learning progress and achieve their goals. The combination of cloud computing and containerization technologies ensures that the application can grow and evolve as user needs change.

## Link of Deployment
Project Link: (might not be up all time to save cost on aws)
https://work-management-fawn.vercel.app/
Github Link: 
https://github.com/Adimaniac31/WorkManagement
Backend Deployed Link :
https://skill-planner-backend.duckdns.org
