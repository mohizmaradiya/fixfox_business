# Deployment to Hostinger Guide

This project is optimized for deployment to Hostinger. You have two main options depending on your hosting plan:

## Option 1: Shared Hosting (Recommended & Easiest)
Best for "Cloud Hosting" or "Premium/Business Shared Hosting" plans.

1. **Build the project locally:**
   ```bash
   npm run build
   ```
2. **Upload content:**
   Open your **Hostinger File Manager** or use **FTP**.
3. **Copy files:**
   Upload the **entire contents** of the `dist/` folder (including the `.htaccess` file) into your `public_html` directory.
   - *Note:* The included `.htaccess` ensures that React's internal routing works correctly when you refresh the page.

---

## Option 2: Node.js Hosting
Best if you want to use Hostinger's "Node.js Selector".

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Upload everything:**
   Upload all project files (including `package.json`, `server.js`, and the `dist/` folder) to your server.
3. **Configure Node.js Selector:**
   - **App Root:** `/` (or your project folder)
   - **App URL:** `yourdomain.com`
   - **Application startup file:** `server.js`
4. **Install Dependencies:**
   Click "Run npm install" in the Hostinger panel.
5. **Start:**
   The server will use `npm start` by default.

---

## Important: Environment Variables
If you use Firebase or Gemini AI, make sure to:
- Fill in your `firebase-applet-config.json` with your real production config.
- If you use environment variables (like `GEMINI_API_KEY`), Vite bakes them into the `dist/` folder at **build time**. Make sure your environment variables are set on the machine performing the build.

For Hostinger Shared Hosting, you can simply upload the `dist` folder generated after running `npm run build` locally.
