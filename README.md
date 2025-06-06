# SkandaDev - Portfolio Coming Soon

This project is a "Coming Soon" page for SkandaDev, a Full Stack Developer. It features a countdown timer, an email subscription form for launch notifications, and a dynamic display of technologies and skills.

## Project Structure

The project is built with Next.js and TypeScript. Here's a brief overview of the key directories and files:

-   **`src/app/`**: Contains the main application files.
    -   `page.tsx`: The main page component for the "Coming Soon" site.
    -   `layout.tsx`: The main layout component.
    -   `globals.css`: Global styles for the application.
    -   `favicon.ico`: The favicon for the site.
-   **`src/components/`**: Contains reusable UI components.
    -   `ui/`: Likely contains UI components from a library like Shadcn/ui (e.g., Button, Input).
-   **`src/lib/`**: Contains utility functions or library-specific configurations.
    -   `utils.ts`: Contains utility functions (e.g., `cn` for classnames).
-   **`public/`**: Contains static assets like images and icons.
    -   `bg.jpg`: Background image for the page.
    -   `icons/`: Directory containing SVG icons for various technologies.

## Key Features

-   **Countdown Timer**: Displays the time remaining until the portfolio launch. The target date is stored in `localStorage` to persist across sessions.
-   **Email Subscription**: Allows users to subscribe for notifications when the portfolio launches.
-   **Technologies Marquee**: A sliding marquee showcasing various programming languages, web technologies, databases, version control systems, and prototyping tools.
-   **Responsive Design**: The page is designed to be responsive and work well on different screen sizes.
-   **Loading State**: A loading animation is displayed while the page initializes.
-   **Framer Motion Animations**: Smooth animations are used for various elements to enhance the user experience.

## Technologies Used

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **TypeScript**: Typed superset of JavaScript.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Framer Motion**: Animation library for React.
-   **Lucide React**: Icon library.
-   **Shadcn/ui (assumed)**: Based on the `components/ui` structure, likely used for pre-built UI components like `Button` and `Input`.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd skandadev
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate an optimized version of the app in the `.next` folder.

## Deployment

This Next.js application can be deployed to various platforms. Vercel (from the creators of Next.js) is a highly recommended platform for seamless deployment.

1.  **Using Vercel CLI:**
    -   Install Vercel CLI: `npm i -g vercel`
    -   Deploy: `vercel`

2.  **Other platforms like Netlify or GitHub Pages** can also be used. Refer to their respective documentation for Next.js deployment. For GitHub Pages, you'll need to configure `next.config.js` for static export.

## Customization

-   **Countdown Target Date**: The countdown timer is initialized to 21 days from the first visit. This is managed in `src/app/page.tsx` within the `useState` hook for `targetDate`.
-   **Technologies List**: The list of technologies and their icons can be updated in the `technologies` object in `src/app/page.tsx`. Ensure new icons are added to the `public/icons/` directory.
-   **Styling**: Styles can be customized using Tailwind CSS classes directly in the components or by modifying `src/app/globals.css`.

## Contributing

This is a personal portfolio project. Contributions are not expected but feel free to fork the repository and adapt it for your own use.
