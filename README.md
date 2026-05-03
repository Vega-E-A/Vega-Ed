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

### ⚠️ IMPORTANT: Fix "Resource not accessible" or "Not Found" errors:
If your GitHub Action fails with `HttpError: Resource not accessible by integration`, you **MUST** update these settings in your GitHub repository:

1. **Enable GitHub Actions for Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, change the dropdown from "Deploy from a branch" to **"GitHub Actions"**.

2. **Grant Write Permissions to Actions:**
   - Navigate to **Settings** > **Actions** > **General**.
   - Scroll down to **Workflow permissions**.
   - Select **"Read and write permissions"** and click **Save**.

After changing these settings, push a new commit or manually re-run the failed workflow.

---
© 2025 Michael A. Breslow | Vega Educational Associates
