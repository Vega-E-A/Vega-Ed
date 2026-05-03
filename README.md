# Vega Educational Associates

A premium technical redesign of the Vega Educational Associates wiki, featuring the AI Ascension Strategy mission manifest.

## Features

- **Mission Manifest**: Strategic roadmap for educational AI integration.
- **Academic Portal**: Curated toolkits and mission-critical components for educators.
- **Terminal Interface**: Polished, tech-forward UI with real-time logs and immersive design.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **React 18+** with **Vite**
- **Tailwind CSS** for styling
- **Motion** for animations
- **Lucide React** for icons
- **Google Gemini API** integration

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Create a `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment

This repository is configured for automatic deployment to **GitHub Pages** via GitHub Actions. 

### ⚠️ IMPORTANT: Fix Deployment Errors
If your GitHub Action fails with `HttpError: Resource not accessible` or `Not Found`, follow these EXACT steps:

1. **Enable GitHub Actions for Pages (CRITICAL):**
   - Go to your repository on GitHub.
   - Navigate to **Settings** (top tab) > **Pages** (left sidebar).
   - Under **Build and deployment** > **Source**, click the dropdown and select **"GitHub Actions"**.
   - *Note: If you don't see this option or it's already selected, try toggling it back and forth.*

2. **Grant Permissions to Actions:**
   - Navigate to **Settings** > **Actions** > **General**.
   - Scroll to the bottom to **Workflow permissions**.
   - Select **"Read and write permissions"**.
   - Check the box **"Allow GitHub Actions to create and approve pull requests"** (optional but recommended).
   - Click **Save**.

3. **Check Repository Visibility:**
   - If your repository is **Private**, GitHub Pages requires a GitHub Pro, Team, or Enterprise account.
   - If you are on a free account, you may need to make the repository **Public** to use GitHub Pages.

After fixing these, go to the **Actions** tab and **Re-run** the failed job, or push a new commit.

---
© 2025 Michael A. Breslow | Vega Educational Associates
