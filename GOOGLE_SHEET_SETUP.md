# Google Sheet Setup Guide — Ai Mobile & Computers

This guide explains how to manage your products using Google Sheets. **No coding required!**

---

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and sign in
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `Ai Mobile Products`

## Step 2: Set Up Columns

In **Row 1** (header row), type these exact column names:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Image URL** | **Product Name** | **Category** | **Price** | **Details** | **Status** |

### Column Descriptions:

- **Image URL**: Paste a link to the product image (use Google Drive, Imgur, or any image hosting)
- **Product Name**: The name of the product (e.g., "Fast Charging Type-C Cable")
- **Category**: Must be one of: `Mobile`, `Computer`, or `CCTV`
- **Price**: The price with ₹ symbol (e.g., "₹199")
- **Details**: A short description (e.g., "20W Fast charging, 1m length")
- **Status**: Type `active` to show, `hidden` to hide from website

## Step 3: Add Your Products

Simply add one product per row, starting from Row 2:

| Image URL | Product Name | Category | Price | Details | Status |
|---|---|---|---|---|---|
| https://example.com/cable.jpg | Fast Charging Cable | Mobile | ₹199 | 20W, 1m braided | active |
| https://example.com/mouse.jpg | Wireless Mouse | Computer | ₹399 | 2.4GHz, Ergonomic | active |
| https://example.com/smps.jpg | CCTV Power Supply | CCTV | ₹599 | 4 Channel, 12V 5A | active |

## Step 4: Publish the Sheet

1. Go to **File → Share → Publish to web**
2. In the popup:
   - Select **Entire Document**
   - Choose **Comma-separated values (.csv)** from the dropdown
3. Click **Publish**
4. **Copy the URL** that appears

The URL will look like: `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`

## Step 5: Connect to Your Website

1. Open the file `js/products.js`
2. Find the line that says:
   ```javascript
   const SHEET_CSV_URL = '';
   ```
3. Paste your Google Sheet URL between the quotes:
   ```javascript
   const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv';
   ```
4. Save the file and push to GitHub

## 📝 How to Manage Products

### Add a New Product
1. Open your Google Sheet
2. Add a new row at the bottom
3. Fill in all columns
4. The product will appear on the website within minutes!

### Hide a Product (Out of Stock)
1. Find the product row
2. Change the **Status** column to `hidden`
3. The product will disappear from the website

### Show a Product Again
1. Change the **Status** column back to `active`

### Delete a Product
1. Right-click the row number
2. Click **Delete row**

### Edit a Product
1. Simply click on any cell and change the text
2. Changes appear on the website automatically!

---

## 🖼️ Tips for Product Images

### Option 1: Google Drive (Recommended)
1. Upload the image to Google Drive
2. Right-click → **Share** → **Anyone with the link**
3. Copy the link and convert it:
   - Original: `https://drive.google.com/file/d/FILE_ID/view`
   - Converted: `https://drive.google.com/uc?id=FILE_ID`

### Option 2: Imgur
1. Go to [imgur.com](https://imgur.com)
2. Upload the image
3. Right-click on the image → **Copy Image Address**
4. Paste in the Image URL column

### Option 3: Take a Photo
1. Take a clear photo of the product
2. Upload to Google Drive or Imgur
3. Use the link as described above

---

## ❓ Troubleshooting

**Products not showing?**
- Make sure the sheet is published (Step 4)
- Check that column headers match exactly
- Verify the URL in products.js is correct

**Image not loading?**
- Make sure the image URL is publicly accessible
- Try opening the URL in a new browser tab to verify

**Need help?**
Contact the developer who set up this website.
