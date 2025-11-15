# Fahad Sikder - Personal Portfolio Website

This is a modern, animation-driven personal portfolio website for web developer Fahad Sikder. It's built with React, TypeScript, and Framer Motion to create a smooth, interactive, and visually engaging experience.

## Getting Started: A Guide for New Developers

This guide will walk you through every step needed to get this project running on your local computer.

### Step 1: Prerequisites (What You Need to Install First)

Before you can run this project, you need two essential tools installed on your computer:

1.  **Node.js**: This is a JavaScript runtime that lets you run JavaScript code outside of a web browser. It also includes `npm` (Node Package Manager), which you will use to install the project's dependencies.
    *   **How to install**: Go to the official [Node.js website](https://nodejs.org/). Download the **LTS** (Long-Term Support) version. The installer is very straightforward; just follow the on-screen instructions.
    *   **How to check if it's installed**: Open your terminal (on Windows, you can use Command Prompt or PowerShell; on macOS, use the Terminal app) and run these commands:
        ```bash
        node -v
        npm -v
        ```
        If they return version numbers (e.g., `v18.18.0`), you're all set!

2.  **Git**: This is a version control system used for tracking changes in code. You'll use it to download the project files from a repository.
    *   **How to install**: Go to the official [Git website](https://git-scm.com/downloads) and download the version for your operating system.
    *   **How to check if it's installed**: Open your terminal and run:
        ```bash
        git --version
        ```
        If it returns a version number, you're ready.

### Step 2: Download the Project Files

Now that you have the tools, you need to get the project code onto your computer.

1.  **Open your terminal**.
2.  **Navigate to the directory** where you want to store the project. For example, if you want to put it on your Desktop:
    ```bash
    cd Desktop
    ```
3.  **Clone the repository**: This command copies all the project files into a new folder called `portfolio-fahad-sikder`.
    ```bash
    git clone <repository_url> portfolio-fahad-sikder
    ```
    *(Note: Replace `<repository_url>` with the actual URL of the Git repository if you have one. If you just have the files, you can skip this and just place the files in a folder named `portfolio-fahad-sikder`)*
4.  **Go into the project directory**:
    ```bash
    cd portfolio-fahad-sikder
    ```

### Step 3: Install Project Dependencies

The project uses several libraries (like React and Framer Motion) to work. The `package.json` file lists all of these. You need to download them into your project.

1.  Make sure you are inside the project's root directory (`portfolio-fahad-sikder`) in your terminal.
2.  Run the following command:
    ```bash
    npm install
    ```
    This command reads the `dependencies` listed in `package.json` and downloads them into a new folder called `node_modules`. This might take a minute or two.

### Step 4: Run the Project on Your Local Host

You're all set! Now you can start the local development server to see the website.

1.  In your terminal (still inside the project directory), run this command:
    ```bash
    npm run dev
    ```
2.  This command will start a local web server. After a few seconds, your terminal will show a message like this:
    ```
    > Local: http://localhost:5173/
    ```
3.  **Open your web browser** (like Chrome, Firefox, or Edge) and go to the URL provided: **`http://localhost:5173`**.

You should now see the website running live on your computer! Any changes you make to the code will automatically update in the browser.

### Troubleshooting

*   **`command not found: npm`**: This means Node.js is not installed correctly or your terminal doesn't know where to find it. Go back to Step 1 and reinstall Node.js. You may need to restart your terminal.
*   **Errors during `npm install`**: Sometimes, network issues can cause this. Try running `npm install` again. If it still fails, check the error message for clues.

That's it! You have successfully set up and run the project. Happy coding!
