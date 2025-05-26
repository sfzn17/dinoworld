# Interactive 2D Dino World

A simple frontend project showcasing an interactive 2D world with multiple dinosaurs engaging in their own activities. Created using HTML, CSS, and vanilla JavaScript.

## Project Structure

- `index.html`: The main HTML file that structures the webpage and includes the canvas for animations.
- `style.css`: Contains all the styles for the page, including centering the canvas and basic visual enhancements.
- `script.js`: Holds the JavaScript logic for the dinosaur animations, including dinosaur class definition, movement, activities (random walking, pausing), and rendering on the canvas.

## Running Locally

1.  Clone or download the repository/files (`index.html`, `style.css`, `script.js`) to your local machine.
2.  Navigate to the directory where you saved the files.
3.  Open the `index.html` file directly in your web browser (e.g., Chrome, Firefox, Safari, Edge).

You should see the dinosaurs moving around on the canvas.

## Deploying to GitHub Pages

GitHub Pages is a great way to host this project live on the web for free.

1.  **Create a GitHub Repository:**
    *   Go to [GitHub](https://github.com/) and log in or sign up.
    *   Create a new repository. You can name it, for example, `interactive-dino-world`.
    *   Make sure it's a **public** repository if you want to use GitHub Pages for free.
    *   You can choose to initialize it with a README (though we are creating one now) or .gitignore, but it's not strictly necessary for these files.

2.  **Push Project Files to the Repository:**
    *   If you have Git installed:
        *   Initialize a Git repository in your local project folder (if you haven't already):
            ```bash
            git init
            git branch -M main
            ```
        *   Add your files:
            ```bash
            git add index.html style.css script.js README.md
            ```
        *   Commit the files:
            ```bash
            git commit -m "Initial commit of dino world project"
            ```
        *   Add the remote repository URL (you can find this on your GitHub repository page):
            ```bash
            git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
            ```
            (Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` accordingly)
        *   Push your code to GitHub:
            ```bash
            git push -u origin main
            ```
    *   Alternatively, GitHub allows you to directly upload files through their web interface if you prefer not to use Git commands. Go to your repository on GitHub and look for an "Add file" -> "Upload files" option.

3.  **Enable GitHub Pages:**
    *   In your GitHub repository, go to the "Settings" tab.
    *   In the left sidebar, scroll down to the "Pages" section.
    *   Under "Build and deployment", for the "Source", select "Deploy from a branch".
    *   Under "Branch", select `main` (or `master` if that's your default branch) and `/ (root)` folder, then click "Save".
    *   GitHub Pages will then build your site and provide you with a URL (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`). This might take a few minutes.

Once deployed, you can visit the provided URL to see your interactive dino world live!
