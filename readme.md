# QuickKart - Local Grocery Delivery Application

A production-grade frontend e-commerce mobile application built with React Native that simulates a complete shopping experience including favorites management, cart operations, order placement, address management, and user profiles without requiring a backend server.

## Application Overview

QuickKart is a frontend-only grocery delivery application demonstrating a complete e-commerce workflow using local state management and device storage. All data persists locally on the user's device using AsyncStorage, providing a seamless offline-capable shopping experience.

## Key Features

### User Management
- Mock authentication system with user validation
- Previous user login functionality remembering last authenticated user via AsyncStorage
- User profile viewing and editing capabilities
- Optional guest mode for browsing without authentication

### Favorites and Wishlist
- Add items to favorites collection
- Remove items from favorites
- Persistent favorites storage across app sessions
- Dedicated screen for viewing all favorited items

### Shopping Cart
- Add items to shopping cart
- Remove individual items from cart
- Update item quantities with real-time price calculation
- Automatic total price computation including taxes
- Persistent cart storage maintaining state between app launches

### Order Management
- Order placement workflow
- Order confirmation screen with order summary
- Unique order ID generation for each transaction
- Order history tracking with status updates
- Order status simulation (Confirmed, Preparing, Out for Delivery, Delivered)

### Address Management
- Add multiple delivery addresses
- Edit existing address information
- Delete unwanted addresses
- Set default address functionality
- Address validation before saving

### Grocery Browsing
- Category-based product listing (Fruits, Vegetables, Dairy, Snacks)
- Search functionality filtering items by name
- SectionList implementation for grouped category display
- Product details view with complete information

## Technology Stack

| Technology |
|------------|
| React Native (Expo) |
| JavaScript |
| React Navigation |
| React Native Paper |
| React Native Vector Icons |
| AsyncStorage |
| React Context API |
| React Hook Form |


## 🔄 Application Workflow

```text
+------------------------+    +------------------------+    +------------------------------+    +------------------------------+
|  User Launches App     | -> |  User Login            | -> |  Home Screen                 | -> |  Add to Favorites / Cart     |
|                        |    |  (Existing User)       |    |  (Browse Products)           |    |                              |
+------------------------+    +------------------------+    +------------------------------+    +------------------------------+

                                      |
                                      v

+------------------------------+    +------------------------+    +------------------------+    +------------------------+
|  Manage Favorites / Cart     | -> |  Proceed to Checkout   | -> |  Enter Address         | -> |  Place Order           |
|  (Add / Remove Items)        |    |                        |    |                        |    |                        |
+------------------------------+    +------------------------+    +------------------------+    +------------------------+

                                      |
                                      v

                          +------------------------+
                          |  Order Confirmation    |
                          +------------------------+
```


## How to Run the App

### 1. Install Expo CLI
```bash
npm install -g expo-cli
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm start
