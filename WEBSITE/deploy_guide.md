# Deploy Guide

## Put Your Website on the Real Internet

**Time:** 60–90 minutes
**Difficulty:** Intermediate

---

## Part 1: GitHub Pages (Free Hosting)

GitHub Pages lets you host a website for free, directly from your GitHub repository. Your site URL will be:

`https://yourusername.github.io/candy-builder-2026/website/`

### Step 1: Push Your Website Files

Make sure `index.html`, `style.css`, `script.js`, and `order.html` are all in the `website/` folder of your repository and pushed to GitHub.

```bash
git add .
git commit -m "Add candy business website"
git push
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right area of the repo)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source," select **Deploy from a branch**
5. Branch: `main` | Folder: `/ (root)`
   - GitHub Pages only lets you pick `/ (root)` or `/docs` here — not a `website` folder. That's fine: pick `/ (root)`. Because your files live in a `website/` subfolder, your site URL will simply include `/website/` at the end (see Step 3).
6. Click **Save**

### Step 3: Wait and Visit

GitHub takes 1–2 minutes to deploy. Then visit your URL.

If your files are in a `website/` folder inside your repo, your URL is:
`https://yourusername.github.io/candy-builder-2026/website/`

If they're at the root of the repo:
`https://yourusername.github.io/candy-builder-2026/`

---

## Part 2: Connect Orders to Google Sheets

This is the part that makes your site magical. When someone submits the order form, their order automatically appears in your Google Sheets Orders tab.

This uses **Google Apps Script** — a free tool from Google.

### Step 1: Open Your Google Sheets

Go to your Google Sheets candy business workbook.

### Step 2: Open Apps Script

Click **Extensions → Apps Script**

A new tab opens with a code editor.

### Step 3: Paste This Script

Delete everything in the editor and paste this:

```javascript
// Google Apps Script — Receives orders from Ricardo's website
// and adds them to the Orders tab

function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the Orders sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Orders");
    
    // If Orders tab doesn't exist, create it
    if (!sheet) {
      sheet = ss.insertSheet("Orders");
      sheet.appendRow([
        "Timestamp", "Customer Name", "Customer Email",
        "Phone", "Items", "Total ($)", "Notes", "Status"
      ]);
    }
    
    // Add the new order as a row
    sheet.appendRow([
      data.timestamp,
      data.customerName,
      data.customerEmail,
      data.customerPhone || "",
      data.items,
      data.total,
      data.notes || "",
      "Pending"
    ]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this to make sure the script is working
function testScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Orders");
  if (sheet) {
    Logger.log("Orders tab found! Rows: " + sheet.getLastRow());
  } else {
    Logger.log("Orders tab NOT found. It will be created on first order.");
  }
}
```

### Step 4: Save and Deploy

1. Click the **Save** icon (floppy disk) or press `Ctrl+S`
2. Give the project a name: "Candy Order Receiver"
3. Click **Deploy → New deployment**
4. Click the gear icon next to "Type" and select **Web app**
5. Fill in:
   - Description: "Receives orders from candy website"
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**
7. Copy the **Web app URL** — it looks like: `https://script.google.com/macros/s/LONG_ID_HERE/exec`

### Step 5: Connect to Your Website

Open `script.js` in VS Code.

Find this line near the top:
```javascript
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied.

Save and push to GitHub.

### Step 6: Test It

1. Visit your live website
2. Fill out the order form with a test order (your own name)
3. Submit it
4. Wait 5–10 seconds
5. Open your Google Sheets → Orders tab
6. Your test order should be there!

If it's not there:
- Check the URL in `script.js` is correct (no extra spaces)
- Make sure you clicked "Deploy" not just "Save" in Apps Script
- Make sure "Who has access" is set to "Anyone"

---

## Part 3: Your Domain (Optional Bonus)

If you want a custom URL like `ricardoscandy.com` instead of a GitHub Pages URL:

1. Buy a domain at Namecheap or Google Domains (about $12/year for .com)
2. In GitHub Pages settings, add your custom domain
3. In your domain registrar, add a CNAME record pointing to `yourusername.github.io`

This is optional — the GitHub Pages URL works just fine as a portfolio piece.

---

## Checklist: Before You Call It Done

- [ ] Website is live at your GitHub Pages URL
- [ ] Both pages load correctly (index.html and order.html)
- [ ] Product cards show your real products
- [ ] Order form submits successfully
- [ ] Test order appears in Google Sheets
- [ ] Website looks good on your phone (responsive)
- [ ] URL shared with Dad
- [ ] URL posted in your portfolio

---

## Congratulations

You just deployed a real website with a live backend connection.

That's something most adults have never done.

---

*Deploy Guide — Ricardo's Summer Builder Program v1.0*
