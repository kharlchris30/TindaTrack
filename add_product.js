document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const productNameInput = document.getElementById('add_product_name');
    const unitInput = document.getElementById('add_unit');
    const quantityInput = document.getElementById('add_quantity');
    const capitalInput = document.getElementById('add_amount(capital)');
    const amountInput = document.getElementById('add_amount');
    const salesInput = document.getElementById('add_sales');
    const expensesInput = document.getElementById('add_expenses');
    const saveButton = document.getElementById('save_add');

    // Add event listener to save button
    saveButton.addEventListener('click', function() {
        // Get input values
        const name = productNameInput.value.trim();
        const unit = unitInput.value.trim();
        const quantity = parseFloat(quantityInput.value);
        const capital = parseFloat(capitalInput.value);
        const amount = parseFloat(amountInput.value);
        const sales = parseFloat(salesInput.value);
        const expenses = parseFloat(expensesInput.value);

        // Validate inputs
        if (!name) {
            alert('Please enter a product name');
            return;
        }

        if (!unit) {
            alert('Please enter a unit type (e.g., box, pieces)');
            return;
        }

        if (isNaN(quantity) || isNaN(capital) || isNaN(amount) || isNaN(sales) || isNaN(expenses)) {
            alert('Please enter valid numbers for all numeric fields');
            return;
        }

        // Create new product
        const product = new Product(name, unit, quantity, capital, sales, amount, expenses);

        // Add product to inventory
        inventory.addProduct(product);

        // Alert success
        alert('Product added successfully!');

        // Clear form fields
        productNameInput.value = '';
        unitInput.value = '';
        quantityInput.value = '';
        capitalInput.value = '';
        amountInput.value = '';
        salesInput.value = '';
        expensesInput.value = '';
    });
});