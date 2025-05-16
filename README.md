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
- pnpm >= 10.10.0

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/BacaCerdas-AI.git
cd BacaCerdas-AI
```

2. Install dependecies
```bash
pnpm install
```

3. Preparing local development by copy `.env.example` into `.env` and fill the missing value

### Running the Application

#### Development Mode

To open the development mode on your local machine, use command `pnpm dev` or `pnpm run dev`, this command is going to run both frontend and the backend app simultaneously

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3030.

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

