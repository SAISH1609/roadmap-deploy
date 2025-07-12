# Frontend Application

This is a modern frontend application built with Vite, React, TypeScript, and TailwindCSS. It serves as the user interface for our platform, allowing users to manage teams, roadmaps, and their personal accounts.

## Project Structure

The project is organized into the following directories:

```
src/
├── assets/           # Static assets (images, icons, etc.)
├── components/       # Reusable UI and shared components
│   ├── shared/
│   └── ui/
├── features/         # Feature-specific modules (e.g., create-team, dashboard)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page-level components
├── store/            # Zustand state management stores
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd frontend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

### Running Tests

To run the tests in headless mode, use the following command:

```bash
npm run test:e2e
```

To run the tests with the Playwright UI, use the following command:

```bash'
npm run test:e2e:ui
```

This will open the Playwright UI, where you can watch your tests run in a browser.