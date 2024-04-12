# Diabetes Monitoring System

## Introduction

The Diabetes Monitoring System is a web-based application designed to assist individuals in monitoring their blood glucose levels. The system allows users to easily log their glucose readings, receive real-time feedback based on their results, and access detailed help at any point within the application.

## Features

### User Login

- **Name Selection:** Upon opening the application, users are presented with a list of names fetched from a predefined JSON file. Each user can click on their name to log in to the system.
- **Help Tooltip:** A help message, "Please select your name to display your information," guides new users in logging in.

### Dashboard

- **Glucose Reading Input:** Once logged in, users are prompted to input their daily glucose reading. The system accepts numeric inputs ranging from 0 to 999.
- **Immediate Feedback:** Based on the glucose reading:
  - **Normal Range:** Users receive a confirmation that their glucose level is normal.
  - **Low/High Levels:** Users are alerted if their readings are too low or too high. Specific instructions are provided, such as consuming sugar or contacting their doctor, respectively.
  - **Additional Questions for High Levels:** If the reading is too high, users are asked about the presence of ketones in their urine.
  - **Explanation Request:** For abnormal readings, users are prompted to explain possible reasons for their abnormal glucose levels (e.g., meal intake, medication, etc.).

### Help System

- **Interactive Help Button:** A question mark icon fixed at the bottom right corner of the application serves as a help button. Clicking this button toggles a popover containing helpful information about the current screen or feature.
- **Dynamic Content:** The help content changes depending on the context or current view, providing relevant information to assist users in using the application effectively.

### Accessibility and User Experience

- **Responsive Design:** The application is fully responsive, ensuring that it is accessible and usable on a variety of devices and screen sizes.
- **Easy Navigation:** Clear and concise navigation options are provided, making it easy for users to find and use different features of the system.
- **Visual Feedback:** Color-coded alerts and messages provide visual cues that help users quickly understand their glucose levels and any required actions.

## Technology Stack

- **React:** Utilizes React for building the user interface, ensuring a responsive and dynamic experience for users.
- **Bootstrap:** Used for styling and to make the application responsive and accessible.
- **React Icons:** Provides icons used throughout the application for intuitive visual cues.