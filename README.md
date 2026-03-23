# Flexi Buy — E-Commerce Website

## Project Description
Flexi Buy is a multi-page e-commerce web application built with HTML, CSS, and vanilla JavaScript. It allows users to browse products, filter by category, add items to a cart, manage cart quantities, and complete a checkout process. All data is handled using the browser's localStorage with no backend required.

## Group Members

| # | Name | Student Number | Registration Number |
|---|------|---------------|-------------------|
| 1 | Magumba Benjamin Samuel *(Group Leader)* | 2400723155 | 24/U/23155 |
| 2 | Joshua Joram Kyewalabye | 2400700611 | 24/U/0611 |
| 3 | Magala Eric | 2400700659 | 24/U/0659 |
| 4 | Matovu Mathew Phillip | 2400716689 | 24/U/16689/EVE |
| 5 | Natukunda Anita V | 2400709944 | 24/U/09944/PS |
| 6 | Nakabuye Pamella Fancy | 2400708188 | 24/U/08188/PS |
| 7 | Gloria Aol | 2400703540 | 24/U/03540/PS |
| 8 | Kushaba Adrona | 2400700594 | 24/U/0594 |
| 9 | Mutesi Joanita Musakira | 2400707502 | 24/U/07502/PS |
| 10 | Kasozi Sharif | 2400715620 | 24/U/15620/EVE |

## Project Structure
```
Flexi-Buy/
├── index.html        # Products page
├── cart.html         # Cart page
├── checkout.html     # Checkout page
├── css/
│   └── style.css     # Stylesheet
├── jsfiles/
│   ├── index.js      # Products page logic
│   ├── cart.js       # Cart page logic
│   └── checkout.js   # Checkout page logic
└── resources/        # Product images
```

## How to Run the Project

### Option 1 — Live Server (Recommended)
1. Open the project folder in VS Code
2. Install the Live Server extension if not already installed
3. Right-click `index.html` and select **Open with Live Server**
4. The site will open in your browser at `http://127.0.0.1:5500/index.html`

### Option 2 — GitHub Pages
1. Visit the deployed link provided by the group leader
2. The site loads directly in the browser — no installation needed

### Option 3 — Direct Browser Open
1. Download or clone the repository
2. Open the `index.html` file directly in any modern browser

## Pages
- **Products** (`index.html`) — Browse and filter all products, add to cart
- **Cart** (`cart.html`) — View cart items, adjust quantities, remove items, see order summary
- **Checkout** (`checkout.html`) — Enter delivery details and place order


some email validation explanation

  // regex explanation:
            // ^           : start of string
            // [^\s@]+     : one or more characters except whitespace and '@'
            // @           : must contain '@'
            // [^\s@]+     : one or more characters except whitespace and '@'
            // \.          : literal dot
            // [^\s@]+     : one or more characters except whitespace and '@'
            // $           : end of string