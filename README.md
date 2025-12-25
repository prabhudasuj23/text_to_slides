# text_to_slides

Simple tool to generate presentation slides from prompts and input data.

## Overview

This repository is a Vite + React app that generates slides programmatically. The following steps explain how to set up, run, and deploy the project locally and on a static host.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A Gemini-compatible API key (set as an environment variable)

## Setup (step-by-step)

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/prabhudasuj23/text_to_slides.git
cd text_to_slides
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create an environment file at the project root named `.env.local` and add your API key:

```text
# .env.local
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

Open the app in your browser at the address shown by Vite (usually http://localhost:5173).

## How to use the app (quick guide)

1. Open the app in the browser.
2. If prompted, enter your API key using the API key modal.
3. Use the input stage to provide a prompt or data for slide generation.
4. Click the Generate / Create Slides button to start generation.
5. Preview generated slides in the viewer and download/export as a PPTX if available.

Note: UI labels may vary; look for `Generate`, `Preview`, or `Download` actions in the app.

## Build and deploy

To build a production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

For deployment, upload the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Common commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Contributing

If you'd like to contribute:

1. Fork the repo
2. Create a branch for your feature
3. Open a pull request with a description of changes

## License

Include a license file if you wish to make this code reusable by others.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1cfXneZ6ay1jb6xwgjDqJy75VOxXH_iuR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
