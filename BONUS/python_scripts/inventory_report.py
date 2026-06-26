#!/usr/bin/env python3
"""
inventory_report.py
Ricardo's Summer Builder Program — Bonus Python Script

Generates a text inventory and sales report from Google Sheets CSV exports.

HOW TO USE:
1. Open your Google Sheets
2. Go to the Sales Log tab
3. File → Download → Comma Separated Values (.csv)
4. Save it as 'sales_log.csv' in the same folder as this script
5. Do the same for the Inventory tab → save as 'inventory.csv'
6. Run: python inventory_report.py

The script prints a summary report to the terminal.
"""

import csv
import os
from datetime import datetime
from collections import defaultdict


def load_csv(filename):
    """Load a CSV file and return a list of dictionaries."""
    rows = []
    if not os.path.exists(filename):
        print(f"  [!] File not found: {filename}")
        return rows

    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def format_currency(amount):
    """Format a float as $X.XX"""
    try:
        return f"${float(amount):.2f}"
    except (ValueError, TypeError):
        return "$0.00"


def generate_sales_report(sales_data):
    """Analyze sales log data and return a report dict."""
    if not sales_data:
        return None

    total_revenue = 0.0
    total_items   = 0
    by_product    = defaultdict(lambda: {"qty": 0, "revenue": 0.0})

    for row in sales_data:
        # Adjust these key names to match your actual column headers
        try:
            product  = row.get("Product Name", row.get("product_name", "Unknown"))
            quantity = float(row.get("Quantity", row.get("quantity", 0)) or 0)
            revenue  = float(row.get("Revenue", row.get("revenue", 0)) or 0)

            total_revenue += revenue
            total_items   += int(quantity)

            by_product[product]["qty"]     += int(quantity)
            by_product[product]["revenue"] += revenue

        except (ValueError, TypeError):
            continue

    return {
        "total_revenue": total_revenue,
        "total_items":   total_items,
        "total_sales":   len(sales_data),
        "by_product":    by_product,
    }


def generate_inventory_report(inventory_data):
    """Analyze inventory data and return a report dict."""
    if not inventory_data:
        return None

    by_product = defaultdict(lambda: {"in": 0, "out": 0})

    for row in inventory_data:
        try:
            product = row.get("Product Name", row.get("product_name", "Unknown"))
            qty_in  = float(row.get("Quantity In",  row.get("quantity_in",  0)) or 0)
            qty_out = float(row.get("Quantity Out", row.get("quantity_out", 0)) or 0)

            by_product[product]["in"]  += int(qty_in)
            by_product[product]["out"] += int(qty_out)

        except (ValueError, TypeError):
            continue

    return {"by_product": by_product}


def print_report(sales, inventory):
    """Print the formatted report."""
    width = 60
    divider = "─" * width

    print()
    print("=" * width)
    print("  CANDY BUSINESS REPORT")
    print(f"  Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}")
    print("=" * width)

    # ---- Sales Summary ----
    if sales:
        print()
        print("  SALES SUMMARY")
        print(divider)
        print(f"  Total Transactions:  {sales['total_sales']}")
        print(f"  Total Items Sold:    {sales['total_items']}")
        print(f"  Total Revenue:       {format_currency(sales['total_revenue'])}")
        if sales['total_sales'] > 0:
            avg = sales['total_revenue'] / sales['total_sales']
            print(f"  Average Sale Price:  {format_currency(avg)}")

        print()
        print("  SALES BY PRODUCT")
        print(divider)
        print(f"  {'Product':<30} {'Qty':>6} {'Revenue':>10}")
        print(f"  {'-------':<30} {'---':>6} {'-------':>10}")

        sorted_products = sorted(
            sales['by_product'].items(),
            key=lambda x: x[1]['revenue'],
            reverse=True
        )

        for product, data in sorted_products:
            name = product[:28] if len(product) > 28 else product
            print(f"  {name:<30} {data['qty']:>6} {format_currency(data['revenue']):>10}")

        if sorted_products:
            best = sorted_products[0][0]
            print()
            print(f"  ⭐ Best seller: {best}")
    else:
        print()
        print("  No sales data found.")

    # ---- Inventory Summary ----
    if inventory:
        print()
        print("  CURRENT INVENTORY")
        print(divider)
        print(f"  {'Product':<30} {'On Hand':>9} {'Status':>12}")
        print(f"  {'-------':<30} {'-------':>9} {'------':>12}")

        for product, data in sorted(inventory['by_product'].items()):
            on_hand = data['in'] - data['out']
            if on_hand <= 0:
                status = "OUT OF STOCK"
            elif on_hand <= 5:
                status = "LOW (reorder)"
            else:
                status = "OK"

            name = product[:28] if len(product) > 28 else product
            print(f"  {name:<30} {on_hand:>9} {status:>12}")
    else:
        print()
        print("  No inventory data found.")

    print()
    print("=" * width)
    print("  END OF REPORT")
    print("=" * width)
    print()


def main():
    print()
    print("Loading data files...")

    # Load data
    sales_data     = load_csv("sales_log.csv")
    inventory_data = load_csv("inventory.csv")

    print(f"  Sales records found:     {len(sales_data)}")
    print(f"  Inventory records found: {len(inventory_data)}")

    # Generate reports
    sales     = generate_sales_report(sales_data)
    inventory = generate_inventory_report(inventory_data)

    # Print report
    print_report(sales, inventory)

    # Optional: save to file
    save = input("Save report to 'report.txt'? (y/n): ").strip().lower()
    if save == 'y':
        import io, sys
        buffer = io.StringIO()
        old_stdout = sys.stdout
        sys.stdout = buffer
        print_report(sales, inventory)
        sys.stdout = old_stdout
        with open("report.txt", "w") as f:
            f.write(buffer.getvalue())
        print("  Report saved to report.txt")


if __name__ == "__main__":
    main()
