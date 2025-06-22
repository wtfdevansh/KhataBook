# KhataBook

KhataBook is a digital ledger application designed to help small businesses and individuals manage their customer accounts and transactions seamlessly. It provides an easy-to-use and friendly user interface, built with modern web technologies.

## Features

*   **Customer Management:** Add, view, and manage your customer details.
*   **Transaction Tracking:** Record and track transactions associated with each customer.
*   **User-Friendly Interface:** Intuitive design for easy navigation and data entry.
*   **API Endpoints:** Provides API routes for managing bios, customers, and transactions.

## Technologies Used

*   **Next.js:** A React framework for building server-side rendered and static web applications.
*   **Prisma:** A modern database toolkit that includes an ORM for Node.js and TypeScript.
*   **SQLite:** A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **React:** A JavaScript library for building user interfaces.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 20 or later recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/khatbook.git
    cd khatbook
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Set up the database:**
    Prisma will typically create the SQLite database file automatically when you first run the application or specific Prisma commands. To initialize the database and create the schema:
    ```bash
    npx prisma db push
    ```
    You might also want to seed your database with initial data if a seed script is available (e.g., `npx prisma db seed`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

A brief overview of the key directories:

*   `prisma/`: Contains the Prisma schema file (`schema.prisma`) which defines your database models and relations.
*   `src/app/`: Core application directory for a Next.js app using the App Router.
    *   `api/`: Contains API route handlers.
    *   `components/`: Reusable React components.
    *   `layout.tsx`: The main layout component for the application.
    *   `page.tsx`: The main page component for the root URL.
    *   `transactions/`: Pages and components related to transactions.
*   `src/lib/`: Contains library code, such as Prisma client initialization (`prisma.js`).
*   `public/`: Static assets that are served directly.
*   `next.config.ts`: Configuration file for Next.js.
*   `package.json`: Lists project dependencies and scripts.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Don't forget to give the project a star! Thanks again!
