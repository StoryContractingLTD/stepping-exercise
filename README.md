# Stepping Exercise (live, phone-based)

A live version of the Jungian Preferences stepping exercise. People join on their phones by scanning a QR code, you advance the statements from the facilitator screen, and everyone's position shows on the big screen.

- `host.html` is the facilitator screen (project this).
- `index.html` is the phone page (people reach it by scanning the QR code).
- `statements.js` holds the statement wording.
- `config.js` is where your Firebase details go.

## Step 1: Put it on GitHub

1. On github.com, click **+** (top right), then **New repository**.
2. Name it `stepping-exercise`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in every file from this folder, click **Commit changes**.
4. Go to **Settings**, then **Pages** (left menu). Under **Branch** pick `main` and `/ (root)`, click **Save**.
5. After a minute or two the facilitator screen is at:
   `https://YOUR-USERNAME.github.io/stepping-exercise/host.html`

At this point it runs in demo mode (yellow banner). Phones cannot join until Step 2 is done.

## Step 2: Set up Firebase (free, about 10 minutes, one time only)

1. Go to https://console.firebase.google.com and sign in with a Google account.
2. Click **Create a project** (or **Add project**). Name it `stepping-exercise`. Turn Google Analytics off. Click **Create project**.
3. In the left menu open **Build**, then **Realtime Database**. Click **Create Database**.
   - Location: **Belgium (europe-west1)**.
   - Choose **Start in locked mode**. Click **Enable**.
4. Click the **Rules** tab, replace everything there with the block below, then click **Publish**:

```
{
  "rules": {
    "sessions": {
      "$code": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

5. Click the cog (top left), then **Project settings**. Scroll to **Your apps** and click the web icon `</>`. Give it any nickname, click **Register app**.
6. You will see a block called `firebaseConfig`. You need three values from it: `apiKey`, `databaseURL` and `projectId`.
   - If `databaseURL` is missing, go back to **Realtime Database**: it is the web address shown at the top of the **Data** tab (it starts with `https://` and ends with `firebasedatabase.app` or `firebaseio.com`).
7. On GitHub, open `config.js`, click the pencil icon, and paste the three values between the quote marks, like this:

```
const FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  databaseURL: "https://stepping-exercise-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "stepping-exercise"
};
```

8. Click **Commit changes**. Wait a minute, refresh `host.html`, and the yellow demo banner should be gone.

## Running it in a session

1. Open `host.html` on the projected screen. A QR code and a 4-letter session code appear.
2. People scan the code, type their first name and tap **Join**. The joined count goes up.
3. Click **Start Introversion / Extraversion**. Each statement shows on the big screen and on every phone. People tap **That's me** or **Not me**.
4. Click **Next** (or press the right arrow or space bar) to move on. Left arrow goes back.
5. After the last statement the final line-up stays on screen for your debrief.
6. Later in the day, click **Start Thinking / Feeling** for the second round. Leave the host tab open in between, or just reopen it: it remembers the session.
7. **New session** gives you a fresh code for a new group.

## Good to know

- The database rules are open to anyone who has the link. That is fine for first names and taps, but do not use it for anything sensitive.
- The site and the statement wording are publicly visible to anyone with the link.
- To change statement wording, edit `statements.js` on GitHub.
- Statements are from the Insights "Jungian Preferences Stepping Exercise", (c) The Insights Group Ltd, 2013-2014.
- `qrcode.js` is the open-source QR Code Generator by Kazuhiko Arase (MIT licence).
