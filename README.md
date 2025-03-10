# Neo-Aspect

**Neo-Aspect** is a tryout project built for portfolio purposes. It is a Q&A application where the admin can create, edit, and delete questions, and users can answer them. Questions are of three types—**True/False**, **Multiple Choices**, and **Form**—and each question is assigned one of three difficulty levels: **Easy**, **Medium**, or **Hard**. The application also includes filtering features to view questions based on their creation time, type, or difficulty.

---

## Features

- **Question Management (Admin Only)**
  - **Create Questions:** Admin can add new questions with a key answer.
  - **Edit/Delete Questions:** Admin can edit or delete questions.
- **Answering Questions (User)**
  - Answer questions using one of three input types:
    - **True/False:** Select either "true" or "false".
    - **Multiple Choices:** Choose from radio options.
    - **Form:** Submit a free-form text answer.
- **Filtering**
  - Filter questions by **Creation Time:** Today, This Week, This Month, This Year.
  - Filter by **Question Type:** True/False, Form, Multiple Choices.
  - Filter by **Difficulty:** Easy, Medium, Hard.

---

## Tech Stack

- **Frontend:** Next.js with [Shadcn UI](https://ui.shadcn.com/)
- **Backend:** Express.js running on Node.js
- **Database:** MongoDB

---

## Demo Credentials

For demo purposes, this project uses hard-coded credentials (since the registration system is not completed):

- **User Account** (can only answer questions)
  - **Username:** `user`
  - **Password:** `user123`
- **Admin Account** (can answer, create, edit, and delete questions)
  - **Username:** `admin`
  - **Password:** `admin24`

---

## Deployment

- **Frontend:**  
  The frontend is deployed on Vercel at: [neo-aspect.vercel.app](https://neo-aspect.vercel.app)  
  The API URL is set via an environment variable (`NEXT_PUBLIC_API_URL`).

- **Backend & Database:**  
  The backend server and MongoDB are deployed on Railway.  
  The required environment variables on Railway include:
  - `PORT`
  - `MONGODB_URI`

---

## Installation Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (or yarn)
- MongoDB (either a local installation or a connection string)

### Frontend Setup (Next.js)

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <frontend-directory>
    ```
2. **install dependencies:**
   ```bash
   npm install
    ```
3. **Create a .env file in the frontend directory and add:**
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
4. **run it:**
   ```bash
   npm run dev
    ```
### Backend Setup (Express.js)

1. **Navigate to the backend directory:**
   ```bash
   cd <backend-directory>
    ```
2. **install dependencies:**
   ```bash
   npm install
    ```
3. **Create a .env file in the frontend directory and add:**
   ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
    ```
4. **run it:**
   ```bash
   node server.js
    ```

## Usage

- **Admin Functionality:**  
  Log in using the admin account to add, edit, and delete questions.

- **User Functionality:**  
  Log in using the user account to answer questions.

- **Filtering:**  
  Use the filtering options on the main page to view questions by creation time, question type, or difficulty.

