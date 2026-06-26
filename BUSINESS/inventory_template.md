# Inventory Template

## Track Every Product You Have

---

## The Basic Rule of Inventory

You always want to know:
- **What** you have
- **How much** you have
- **How much it cost** to get it
- **When** it'll run out

That's inventory management. You're going to automate it.

---

## Your Product Categories

Organize your candy into categories. It makes everything easier to manage.

Common categories:
- **Fruity** — Skittles, Starbursts, Jolly Ranchers, etc.
- **Chocolate** — Snickers, Twix, Kit Kats, etc.
- **Sour** — Sour Patch, Warheads, etc.
- **Gummy** — Swedish Fish, Gummy Bears, Worms, etc.
- **Hard Candy** — Lollipops, Blow Pops, etc.
- **Seasonal** — Whatever's special right now

---

## Filling In the Google Sheets Inventory System

### Tab: Products

Go through every candy you sell and add it to the Products tab.

Be honest about costs. Look at what you actually paid per unit.

```
Cost per unit = (what you paid for the whole pack) ÷ (how many candies in it)

Example: You bought 24 Skittles fun-size bags for $6.00
Cost per unit = $6.00 ÷ 24 = $0.25 per bag
```

Then set your price. Good rule of thumb: price should be at least 2x your cost.

```
Margin check formula:
Profit per sale = Price - Cost
Margin % = (Price - Cost) / Price × 100

If you sell a Skittles bag for $0.50 and it costs $0.25:
Profit = $0.25
Margin = 50%

That's actually pretty good. Grocery stores work on 2-3% margins.
```

### Tab: Inventory

Add one row for each time you receive new stock.

Example:
```
Date       | Product ID | Product Name        | Qty In | Qty Out | Notes
7/1/2026   | C001       | Skittles fun size   | 24     | 0       | Bought at Costco
7/3/2026   | C002       | Snickers fun size   | 18     | 0       | Bought at Walmart
```

Each time you sell a batch, add a row with `Qty Out`:
```
7/5/2026   | C001       | Skittles fun size   | 0      | 8       | Sold at school
```

The **Current Stock formula** (from the setup guide) will automatically calculate what's left.

---

## Reorder Alerts

Add a column to the Products tab: `Reorder Point`

This is the number at which you need to restock. When your Current Stock drops below this number, it's time to buy more.

Example: If you usually sell 5 bags per day and it takes 2 days to restock, your reorder point = 10 bags.

Formula for Dashboard to flag low stock:
```
=IF(I3 < Products!G2, "REORDER!", "OK")
```

Put this in the Dashboard tab next to each product's stock count.

---

## Monthly Review Routine

At the end of every month, spend 20 minutes on this:

1. Look at everything in your inventory
2. Cross-reference with your Sales Log
3. Which products sold the most? The least?
4. Which ones have the best margins?
5. Anything that's been sitting too long? (Candy expires)

This monthly review is how you make your business smarter over time.

---

## Calculate Your Inventory Value

Add this to your Dashboard:

Total inventory value = sum of (current stock × cost) for each product

In Google Sheets:
```
=SUMPRODUCT(CurrentStockArray, CostArray)
```

Or do it the simple way: add a column to your stock summary for "Value" = Stock × Cost.

Knowing your inventory value helps you understand how much money is "sitting" in products.

---

*Inventory Template — Ricardo's Summer Builder Program v1.0*
