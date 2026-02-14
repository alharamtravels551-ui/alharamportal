# MongoDB Atlas Setup Guide (Free)

To keep your "AL-HARAM PORTAL" data safe forever, follow these steps to create a free database.

### Step 1: Create a Free Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Register for a free account.

### Step 2: Create a Cluster
1. Choose the **FREE** (Shared) plan.
2. Select a provider (like AWS or Google Cloud) and a region near you (e.g., Mumbai for India).
3. Click **"Create Cluster"**.

### Step 3: Security Configuration
1. **Network Access**: Click "Network Access" in the sidebar. Click **"Add IP Address"** and select **"Allow Access from Anywhere"**.
2. **Database User**: Click "Database Access" in the sidebar. Click **"Add New Database User"**.
   - Create a username (e.g., `admin`).
   - Create a strong password. **Remember this password!**

### Step 4: Get Connection String
1. Go to "Database" (Clusters) in the sidebar.
2. Click the **"Connect"** button.
3. Select **"Drivers"** (Node.js).
4. Copy the connection string. It will look like this:
   `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
5. Replace `<password>` with the password you created in Step 3.

---

### Step 5: Send it to me!
Paste your connection string here in the chat, and I will connect it to your portal.
Once connected, your "File Status" portal will be ready to go LIVE!
