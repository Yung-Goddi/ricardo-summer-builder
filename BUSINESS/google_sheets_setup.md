# Google Sheets Setup

## Build Your Business System from Scratch

**Time:** 90–120 minutes
**Difficulty:** Beginner

---

## What You're Building

A Google Sheets workbook with 5 tabs that together form a complete business management system.

When you're done, you'll have a place to track:
- Every product you sell
- Your current inventory
- Every sale you make
- Orders that come in from your website
- A dashboard showing how the business is doing

---

## Step 1: Create the Spreadsheet

1. Go to `sheets.google.com`
2. Click the `+` (Blank) to create a new spreadsheet
3. Click "Untitled spreadsheet" at the top and rename it: **Ricardo's Candy Business**
4. Click the share button and add Dad's email with "Viewer" access

---

## Step 2: Create 5 Tabs

At the bottom of the screen, you see "Sheet1". You need 5 tabs.

Click the `+` button at the bottom to add tabs. Rename each one by double-clicking the tab name:

1. `Products`
2. `Inventory`
3. `Sales Log`
4. `Orders`
5. `Dashboard`

---

## Step 3: Set Up the Products Tab

This is your master product list.

**Click the Products tab. Set up these columns in row 1:**

| A | B | C | D | E |
|---|---|---|---|---|
| Product ID | Product Name | Category | Price | Cost |

**Format row 1 as headers:**
1. Select row 1 (click the "1" on the left)
2. Click Bold (Ctrl+B)
3. Fill with a color: Format → Alternating colors, or just fill manually with a light color

**Enter your actual products starting in row 2.**

Example (replace with YOUR real products and prices):

| Product ID | Product Name | Category | Price | Cost |
|------------|-------------|----------|-------|------|
| C001 | Skittles (fun size) | Fruity | $0.50 | $0.15 |
| C002 | Snickers (fun size) | Chocolate | $0.75 | $0.25 |
| C003 | Sour Patch Kids (bag) | Sour | $1.00 | $0.40 |
| C004 | Jolly Ranchers (3pk) | Hard Candy | $0.50 | $0.12 |
| C005 | Swedish Fish (bag) | Gummy | $1.00 | $0.35 |

**Important formulas to add in column F (Profit Margin):**

In F1, type: `Profit Margin`
In F2, type: `=(D2-E2)/D2`
Format F2 as a percentage: Format → Number → Percent

Then copy F2 down to all your product rows.

This shows you what percent of each sale is profit. Eye-opening.

---

## Step 4: Set Up the Inventory Tab

**Click the Inventory tab. Set up these columns:**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Date | Product ID | Product Name | Quantity In | Quantity Out | Notes |

**Row 1:** Bold headers, same color as Products tab.

**Row 2:** Enter your starting inventory (what you have RIGHT NOW).

- Date: today's date
- Product ID: C001 (or whatever)
- Product Name: Skittles (fun size)
- Quantity In: 24 (how many you have)
- Quantity Out: 0
- Notes: Starting inventory

**Every time you restock**, add a row with the date and new quantity.
**Every time you sell**, you'll log it in Sales Log.

**Add a "Current Stock" summary section:**

In column H, add a mini summary:

H1: `Current Stock Summary`
H2: `Product`
H3: (leave blank, you'll populate with your products)

Actually, let's use a formula to automatically total each product's inventory.

In cell H2: `Product`
In cell I2: `On Hand`

In H3: `=Products!B2` (pulls product name from Products tab)
In I3: `=SUMIF(Inventory!B:B, Products!A2, Inventory!D:D) - SUMIF(Inventory!B:B, Products!A2, Inventory!E:E)`

This formula: total Quantity In for this product MINUS total Quantity Out for this product = what you have right now.

Copy these two formulas down for each product.

---

## Step 5: Set Up the Sales Log Tab

**Click the Sales Log tab. Set up these columns:**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Date | Time | Product ID | Product Name | Quantity | Sale Price |

**Add column G:** `Revenue` = `=F2*E2`
**Add column H:** `Notes` (for anything special: discount, location, etc.)

**Bold row 1, freeze it:** View → Freeze → 1 row (so the header stays visible when you scroll down)

**Log every sale here** with the date and time. Use this tab daily.

---

## Step 6: Set Up the Orders Tab

This tab will eventually be filled automatically by your website (in Phase 3). For now, just set it up with the right columns.

**Important:** These columns must match exactly what the website sends (you'll set that up in the Website phase). Use these 8 columns, in this order:

**Click the Orders tab. Set up these columns:**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Customer Name | Customer Email | Phone | Items | Total | Notes | Status |

Leave this empty for now. The website will fill it in automatically.

**Add a "Status" dropdown for column H:**
1. Click column H header to select the whole column
2. Data → Data validation
3. Criteria: List of items
4. Enter: `Pending,Fulfilled,Cancelled`
5. Click Save

Now when you click any cell in the Status column, you get a dropdown menu.

---

## Step 7: Set Up the Dashboard Tab

The Dashboard is where all the data comes together into something useful.

**Click the Dashboard tab.**

This tab will have summary numbers pulled from your other tabs, plus charts.

**Section 1: Key Numbers (rows 1–10)**

In A1: `CANDY BUSINESS DASHBOARD`
Format A1: Bold, large font, maybe a background color

| Cell | Label | Formula |
|------|-------|---------|
| B3 | Total Sales (all time) | `=COUNTA('Sales Log'!A:A)-1` |
| B4 | Total Revenue (all time) | `=SUM('Sales Log'!G:G)` |
| B5 | Total Items Sold | `=SUM('Sales Log'!E:E)` |
| B6 | Pending Orders | `=COUNTIF(Orders!H:H,"Pending")` |
| B7 | Average Sale Price | `=AVERAGE('Sales Log'!F:F)` |

Put labels in A3:A7 next to the formulas.

**Section 2: Charts (rows 12 onwards)**

Build a chart showing sales over time:
1. Select columns A and G from the Sales Log tab (Date and Revenue)
2. Insert → Chart
3. Chart type: Line chart or Bar chart
4. Title: "Revenue Over Time"
5. Move the chart to the Dashboard tab: click the chart, three dots → Move to own sheet → change to "Dashboard"

---

## Step 8: Color-Code and Polish

Make it look professional:
- Consistent colors across tabs (pick one color theme)
- All currency formatted with $: Format → Number → Currency
- All dates formatted consistently: Format → Number → Date
- Freeze row 1 on every tab that has headers

---

## Test Your System

Enter 10 fake sales in the Sales Log. Watch the Dashboard update automatically.

Then delete those test entries.

---

## Push Documentation to GitHub

Take screenshots of each tab and put them in your GitHub repository under `business/screenshots/`.

Write a short `business/README.md` in your GitHub explaining what you built.

---

## Next: Customer Research

→ `BUSINESS/customer_research.md`

---

*Google Sheets Setup — Ricardo's Summer Builder Program v1.0*
