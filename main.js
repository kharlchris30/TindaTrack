// Linked List Node class for inventory items
class InventoryNode {
    constructor(product) {
        this.product = product;
        this.next = null;
    }
}

// Linked List class for inventory management
class InventoryLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a product to the inventory
    addProduct(product) {
        const newNode = new InventoryNode(product);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        this.saveToLocalStorage();
    }

    // Edit a product in the inventory
    editProduct(productName, updatedProduct) {
        let current = this.head;
        while (current) {
            if (current.product.name === productName) {
                current.product = updatedProduct;
                this.saveToLocalStorage();
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Delete a product from the inventory
    deleteProduct(productName) {
        if (!this.head) {
            return false;
        }

        // If head needs to be removed
        if (this.head.product.name === productName) {
            this.head = this.head.next;
            this.size--;
            this.saveToLocalStorage();
            return true;
        }

        // Find the product to delete
        let current = this.head;
        let previous = null;

        while (current && current.product.name !== productName) {
            previous = current;
            current = current.next;
        }

        // If product not found
        if (!current) {
            return false;
        }

        // Remove the product
        previous.next = current.next;
        this.size--;
        this.saveToLocalStorage();
        return true;
    }

    // Find a product by name
    findProduct(productName) {
        let current = this.head;
        while (current) {
            if (current.product.name === productName) {
                return current.product;
            }
            current = current.next;
        }
        return null;
    }

    // Get all products as an array
    getAllProducts() {
        const products = [];
        let current = this.head;
        
        while (current) {
            products.push(current.product);
            current = current.next;
        }
        
        return products;
    }

    // Save the inventory to localStorage
    saveToLocalStorage() {
        const products = this.getAllProducts();
        localStorage.setItem('inventoryData', JSON.stringify(products));
    }

    // Load inventory from localStorage
    loadFromLocalStorage() {
        const data = localStorage.getItem('inventoryData');
        if (data) {
            const products = JSON.parse(data);
            this.head = null;
            this.size = 0;
            
            products.forEach(product => {
                this.addProduct(product);
            });
        }
    }
}

// Product class
class Product {
    constructor(name, unit, quantity, capital, sales, amount, expenses) {
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
        this.capital = capital;
        this.sales = sales;
        this.amount = amount; // Now using directly provided amount
        this.expenses = expenses;
        
        // Calculate derived fields
        this.calculateDerivedFields();
    }

    calculateDerivedFields() {
        this.remainingQuantity = this.quantity - this.sales;
        this.totalSales = this.amount * this.sales;
        this.income = this.totalSales - this.capital;
        this.monthlyIncome = this.income - this.expenses;
    }
}

// Initialize inventory
const inventory = new InventoryLinkedList();

// Load data when page loads
window.addEventListener('DOMContentLoaded', () => {
    inventory.loadFromLocalStorage();
});