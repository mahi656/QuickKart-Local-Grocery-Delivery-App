// Cart Service - Easy integration point for cart and checkout features
class CartService {
    constructor() {
        this.cart = [];
        this.listeners = [];
    }

    // Add items to cart (for repeat orders)
    addItems(items) {
        items.forEach(item => {
            const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                this.cart.push({ ...item });
            }
        });
        this.notifyListeners();
    }

    // Add single item to cart
    addItem(item) {
        const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.notifyListeners();
    }

    // Get cart items
    getCart() {
        return this.cart;
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.notifyListeners();
    }

    // Subscribe to cart changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners of cart changes
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.cart));
    }

    // Get cart item count
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}

// Export singleton instance
export default new CartService();