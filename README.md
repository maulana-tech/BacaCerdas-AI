# BacaCerdas-AI

BacaCerdas-AI is a modern web application that combines a Next.js frontend with an Express.js backend.

## Project Overview

This project utilizes the following key technologies:
- **Frontend**: Next.js with TypeScript, Tailwind CSS, and shadcn/ui
- **Backend**: Express.js with TypeScript

## Directory Structure

```
BacaCerdas-AI/
├── frontend/           # Next.js frontend application
├── backend/            # Express.js backend API
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 8.x

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/BacaCerdas-AI.git
cd BacaCerdas-AI
```

2. Set up the frontend
```bash
cd frontend
npm install
```

3. Set up the backend
```bash
cd ../backend
npm install
```

### Running the Application

#### Development Mode

1. Start the backend server
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend
```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001.

## Technologies Used

### Frontend
- Next.js 15.x
- React 19.x
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Express.js 5.x
- TypeScript
- Node.js

## Development Guidelines

- Follow the established directory structure
- Use TypeScript types for all new components and functions
- Document new API endpoints in their respective README files
- Run tests before submitting pull requests

## License

This project is licensed under the ISC License.

