# Dashboard Guide

## Build a Business Dashboard That Actually Tells You Something

**Time:** 60–90 minutes
**Difficulty:** Beginner-Intermediate

---

## What a Dashboard Is

A dashboard is a single page that shows you the most important numbers at a glance.

The goal: in 30 seconds, you should be able to answer:
- How much have I made this month?
- What's selling best?
- Do I need to restock anything?
- Are there any orders waiting?

If you have to dig through multiple tabs to find that information, the dashboard needs work.

---

## Section 1: Key Metrics

These are your top-line numbers. Put them at the top of the Dashboard tab.

**Set up a grid like this (starting in B3):**

```
                        B                   C
Row 3:    Total Revenue (All Time)    [formula]
Row 4:    Revenue This Month          [formula]  
Row 5:    Total Items Sold            [formula]
Row 6:    Total Transactions          [formula]
Row 7:    Average Sale Price          [formula]
Row 8:    Pending Orders              [formula]
Row 9:    Most Popular Product        [formula]
Row 10:   Low Stock Alerts            [formula]
```

**Formulas:**

```
Total Revenue (All Time):
=SUM('Sales Log'!G:G)

Revenue This Month:
=SUMIFS('Sales Log'!G:G, 'Sales Log'!A:A, ">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))

Total Items Sold:
=SUM('Sales Log'!E:E)

Total Transactions:
=COUNTA('Sales Log'!A:A)-1

Average Sale Price:
=IFERROR(AVERAGE('Sales Log'!F:F), 0)

Pending Orders:
=COUNTIF(Orders!H:H,"Pending")

Most Popular Product (by quantity sold):
=INDEX('Sales Log'!D:D, MATCH(MAX(COUNTIF('Sales Log'!D:D, 'Sales Log'!D2:D1000)), COUNTIF('Sales Log'!D:D, 'Sales Log'!D2:D1000), 0)+1)
```

---

## Section 2: Revenue Chart (Sales Over Time)

**Build this chart:**

1. Click on the Sales Log tab
2. Select column A (Date) and column G (Revenue)
   - Click A, hold Ctrl, click G
3. Insert → Chart
4. Change chart type to **Line chart**
5. Set: X-axis = Date, Values = Revenue
6. Give it a title: "Revenue Over Time"

**Move it to the Dashboard:**
- Click the chart
- Three dots (top right of chart) → Move to own sheet → pick "Dashboard"
- Resize by dragging the corners

---

## Section 3: Sales By Product (Bar Chart)

This shows which candies sell the most.

**Create a summary table first (in the Dashboard tab, around row 15):**

```
Column E: Product Name
Column F: Units Sold
Column G: Revenue
```

In E16: `=Products!B2` (pulls product name)
In F16: `=SUMIF('Sales Log'!C:C, Products!A2, 'Sales Log'!E:E)` (total units sold for this product)
In G16: `=SUMIF('Sales Log'!C:C, Products!A2, 'Sales Log'!G:G)` (total revenue for this product)

Copy these three formulas down for each product.

**Now build a bar chart from this table:**
1. Select E16:G25 (or however many products you have)
2. Insert → Chart
3. Chart type: Bar chart (horizontal) or Column chart (vertical)
4. Title: "Sales By Product"
5. Move to Dashboard

---

## Section 4: Inventory Status

In the Dashboard tab (around row 30), show current inventory:

```
Column B: Product Name
Column C: On Hand (from your inventory formulas)
Column D: Status (OK or REORDER!)
```

Use conditional formatting to make low-stock cells turn red:
1. Select column D
2. Format → Conditional formatting
3. Rule: "Text contains" → "REORDER!"
4. Format: Red background

---

## Section 5: Monthly Summary (Optional but Impressive)

This is a table showing each month's performance:

```
Month     | Revenue | Transactions | Avg Sale
Jan 2026  | $0      | 0            | $0
Feb 2026  | $0      | 0            | $0
...
```

The formulas use `SUMIFS` and `COUNTIFS` with date ranges. This is more advanced — try it as a bonus if you want.

---

## Make It Look Good

A dashboard your business partner (or your dad) can read at a glance should:

1. **Use consistent colors** — pick one main color and stick to it
2. **Have clear labels** — never a number without a label
3. **Format all numbers correctly** — currency as $, percentages as %, dates as dates
4. **Have a title at the top** — "CANDY BUSINESS DASHBOARD — Updated [date]"

**Add today's date automatically:**
In A1 put: `="DASHBOARD — Last Updated: "&TEXT(TODAY(),"MMMM D, YYYY")`

This updates automatically every time you open the sheet.

---

## Share It With Dad

1. Click Share (top right)
2. Add Dad's email
3. Set to "Viewer" (he can see, not edit)
4. Turn on "Notify people"

He'll get an email with the link. Now he can see how the business is doing without asking.

---

## The Power Move: Bookmark This

Bookmark your Google Sheets dashboard in your browser.

Check it after every selling session. Watch the numbers grow.

This is your business at a glance. You built it.

---

## Next Phase

You've built your business system. Now it's time to build the public face of your business.

→ `WEBSITE/README.md`

---

*Dashboard Guide — Ricardo's Summer Builder Program v1.0*
