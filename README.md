# LSPD Eagle-eye

**LSPD Eagle-eye** is a comprehensive web application for the Los Santos Police Department (LSPD), inspired by the GTA game series. This project was developed by a team of two as part of the Website Making Challenge (WMC) 5.0 held at Ahmedabad University.

## Project Overview

LSPD Eagle-eye is a tool designed for users and citizens to access crucial information and provide necessary inputs to stay informed. The website is feature-rich and aims to enhance communication between the police department and the public.

## Features

### User Features

-   **Login, Logout, Signup, Forgot Password**: Secure authentication system.
-   **Most Wanted List**: View information about notorious criminals.
-   **Careers at LSPD**: Browse and apply for various jobs and internships.
-   **Submit a Tip**: Users can submit tips anonymously or with their account.
-   **AI Chatbot - Trevor Salamanca**: Engage with a police officer-styled chatbot that provides informative but sarcastic and non-boring answers relevant to LSPD.
-   **News Section**: Read, like, dislike, and comment on news articles.
-   **Live Video Press/News**: Join live video conferences with chat functionality.
-   **Report a Crime**: Submit crime reports easily.
-   **Support Page**: Access important helplines and numbers.

### Admin Features

-   **Admin Login with Passcode**: Secure admin access.
-   **Job Postings**: Add new job postings and manage applications.
-   **News Articles**: Add and manage news articles.
-   **Video Press**: Start and manage live video conferences.
-   **Tips Management**: View and delete tips shared by users.
-   **Crime Reports Management**: View and manage crime reports.
-   **Most Wanted Management**: Add, update, and delete most wanted criminals.
-   **Parallax Animations and Stylish UI**: Enhanced user experience with animations and modern styles.

## Technology Stack

### Frontend

-   **React.js**: JavaScript library for building user interfaces.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **CSS**: Custom styles for various components.

### Backend

-   **MongoDB**: NoSQL database for storing data.
-   **Express.js**: Web application framework for Node.js.

## File Structure

The project consists of various components, including forms for user authentication, admin dashboards, pages for different functionalities, and utility components.

### Design

Figma Design file link : https://www.figma.com/design/Bg1OfgHJE4JNCtTZSPh7kN/WMC-V---GTA-V---LSPD?node-id=0-1&t=U1mBHtedgYLJ0M2C-1

### Project Vidoes

Videos and core functionality : https://lnkd.in/dFqK_BFT


## Getting Started

### Prerequisites

-   Node.js
-   MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/lspd-eagle-eye.git
    ```

2. Navigate to the project directory:

    ```bash
    cd lspd-eagle-eye
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    npm run server
    ```
2. Start the frontend development server:
    ```bash
    npm start
    ```

### Environment Variables

Ensure you have a .env file with the following variables:

    ```bash
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    PORT=3000
    ```

### Contribution

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgements

We would like to thank the organizers of the Website Making Challenge (WMC) 5.0 at Ahmedabad University for providing this opportunity.
