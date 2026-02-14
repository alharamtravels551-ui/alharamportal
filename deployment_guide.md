# Deployment Guide: AL-HARAM PORTAL

Since I am an AI, I cannot directly create accounts or buy domains for you, but I have prepared your code to be **"Deployment Ready"**. You can make it live for free on **Render** in just 5 minutes.

### Step 1: Upload to GitHub
1. Create a free account on [GitHub.com](https://github.com).
2. Create a new repository (e.g., `al-haram-portal`).
3. Upload all your files from `c:\Users\DELL\OneDrive\Desktop\AL-HARAM-PORTAL` to this repository.

### Step 2: Deploy on Render (Free)
1. Go to [Render.com](https://render.com) and sign up with your GitHub account.
2. Click **"New +"** and select **"Web Service"**.
3. Connect your GitHub repository.
4. Use these settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **"Create Web Service"**.

### Step 3: Your Live Links
Once deployed, Render will give you a free domain (e.g., `al-haram-portal.onrender.com`).
- **Search (User View)**: `https://al-haram-portal.onrender.com/`
- **Admin Panel (Your View)**: `https://al-haram-portal.onrender.com/admin-page`

---

### ⚠️ Important Note on Free Hosting:
Free platforms like Render/Railway usually "reset" files when the server restarts. 
- Currently, your candidates are saved in `data.json`.
- If the server restarts on Render, your data might disappear unless you use a real database (like **MongoDB Atlas** - which is also free).

If you want me to help you connect a **Permanent Database** so your data never gets deleted, just let me know!
