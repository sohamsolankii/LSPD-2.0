# LSPD Website Documentation

## Table of Contents

-   [API Routes Summary](#api-routes-summary)
    -   [Most Wanted List](#most-wanted-list)
    -   [News & Announcements](#news--announcements)
    -   [Careers at LSPD](#careers-at-lspd)
    -   [Tips Submission](#tips-submission)
    -   [Authentication](#authentication)
-   [Bonus Features](#bonus-features)
    -   [Face Recognition](#face-recognition)
    -   [Multi-Language Support](#multi-language-support)
    -   [Notification System](#notification-system)
    -   [Interactive Maps](#interactive-maps)
    -   [Crime Alert Subscriptions](#crime-alert-subscriptions)
    -   [Community Engagement Platform](#community-engagement-platform)
    -   [Anonymous Feedback System](#anonymous-feedback-system)

---

## API Routes Summary

### Most Wanted List

#### done

| Route Name      | Method | URL Pattern             |
| --------------- | ------ | ----------------------- |
| List Criminals  | GET    | `/api/most-wanted`      |
| Get Criminal    | GET    | `/api/most-wanted/{id}` |
| Add Criminal    | POST   | `/api/most-wanted`      |
| Update Criminal | PUT    | `/api/most-wanted/{id}` |
| Delete Criminal | DELETE | `/api/most-wanted/{id}` |

### News & Announcements

#### done

| Route Name          | Method | URL Pattern      |
| ------------------- | ------ | ---------------- |
| List Announcements  | GET    | `/api/news`      |
| Get Announcement    | GET    | `/api/news/{id}` |
| Post Announcement   | POST   | `/api/news`      |
| Update Announcement | PUT    | `/api/news/{id}` |
| Delete Announcement | DELETE | `/api/news/{id}` |

### Careers at LSPD

| Route Name    | Method | URL Pattern               |
| ------------- | ------ | ------------------------- |
| List Jobs     | GET    | `/api/careers`            |
| Get Job       | GET    | `/api/careers/{id}`       |
| Post Job      | POST   | `/api/careers`            |
| Update Job    | PUT    | `/api/careers/{id}`       |
| Delete Job    | DELETE | `/api/careers/{id}`       |
| Apply for Job | POST   | `/api/careers/{id}/apply` |

### Tips Submission

#### done

| Route Name             | Method | URL Pattern |
| ---------------------- | ------ | ----------- |
| Submit Tip             | POST   | `/api/tips` |
| List Tips (Admin Only) | GET    | `/api/tips` |

### Authentication

#### done

| Route Name       | Method | URL Pattern         |
| ---------------- | ------ | ------------------- |
| User Login       | POST   | `/api/auth/login`   |
| User Signup      | POST   | `/api/auth/signup`  |
| User Logout      | POST   | `/api/auth/logout`  |
| Get User Profile | GET    | `/api/auth/profile` |

## Bonus Features

### Face Recognition

-   **Upload Suspect Image**: Users can upload a suspect image, which will be matched against the most wanted list using face recognition technology.

| Route Name    | Method | URL Pattern                  |
| ------------- | ------ | ---------------------------- |
| Upload Image  | POST   | `/api/face-recognition`      |
| Match Results | GET    | `/api/face-recognition/{id}` |

### Multi-Language Support

-   **Support for Multiple Languages**: The website can be viewed in multiple languages to cater to a diverse user base.

### Notification System

-   **Real-time Notifications**: Users receive notifications for new announcements, job postings, and updates on the most wanted list.

| Route Name        | Method | URL Pattern                    |
| ----------------- | ------ | ------------------------------ |
| Get Notifications | GET    | `/api/notifications`           |
| Mark as Seen      | PATCH  | `/api/notifications/{id}/seen` |

### Interactive Maps

-   **Crime Hotspots**: Users can view interactive maps showing crime hotspots and recent incidents in their area.

| Route Name | Method | URL Pattern                |
| ---------- | ------ | -------------------------- |
| View Map   | GET    | `/api/maps/crime-hotspots` |

### Crime Alert Subscriptions

-   **Email and SMS Alerts**: Users can subscribe to receive crime alerts for their area via email or SMS.

| Route Name         | Method | URL Pattern               |
| ------------------ | ------ | ------------------------- |
| Subscribe Alerts   | POST   | `/api/alerts/subscribe`   |
| Unsubscribe Alerts | POST   | `/api/alerts/unsubscribe` |

### Community Engagement Platform

-   **Forums and Discussions**: Users can engage with the community, share information, and discuss safety concerns.

| Route Name        | Method | URL Pattern           |
| ----------------- | ------ | --------------------- |
| List Discussions  | GET    | `/api/community`      |
| Post Discussion   | POST   | `/api/community`      |
| Get Discussion    | GET    | `/api/community/{id}` |
| Delete Discussion | DELETE | `/api/community/{id}` |

### Anonymous Feedback System

-   **Feedback on Police Services**: Users can provide anonymous feedback on police services to help improve public safety efforts.

| Route Name            | Method | URL Pattern     |
| --------------------- | ------ | --------------- |
| Submit Feedback       | POST   | `/api/feedback` |
| List Feedback (Admin) | GET    | `/api/feedback` |
