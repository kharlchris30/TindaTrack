document.addEventListener('DOMContentLoaded', function() {
    inventory.loadFromLocalStorage();

    const nameInput = document.getElementById('edit_name');
    const unitInput = document.getElementById('edit_unit');
    const quantityInput = document.getElementById('edit_quantity');
    const capitalInput = document.getElementById('edit_amount(capital)');
    const amountInput = document.getElementById('edit_amount');
    const salesInput = document.getElementById('edit_sales');
    const expensesInput = document.getElementById('edit_expenses');
    const saveButton = document.getElementById('save_add');

    const urlParams = new URLSearchParams(window.location.search);
    const productNameToEdit = urlParams.get('name');

    if (productNameToEdit) {
        // If product name passed via URL, load product details directly
        const product = inventory.findProduct(productNameToEdit);
        if (product) {
            nameInput.value = product.name;
            unitInput.value = product.unit;
            quantityInput.value = product.quantity;
            capitalInput.value = product.capital;
            amountInput.value = product.amount;
            salesInput.value = product.sales;
            expensesInput.value = product.expenses;
        } else {
            alert('Product not found!');
            window.location.href = 'list_product.html';
        }
    } else {
        // No product name in URL -> show dropdown to select product

        // Create container div for dropdown
        const container = document.createElement('div');
        container.className = 'product-selector';
        container.innerHTML = `
            <h4>Select a product to edit:</h4>
            <select id="product-select">
                <option value="">-- Select a product --</option>
            </select>
            <br><br>
        `;

        // Insert the dropdown above the form inputs inside container div in edit_product.html
        // Your HTML's main form inputs are inside a div with class 'container'
        // We'll insert this dropdown at the top of that container
        const mainContainer = document.querySelector('.container');
        mainContainer.insertBefore(container, mainContainer.firstChild);

        const productSelect = document.getElementById('product-select');
        const products = inventory.getAllProducts();

        if (products && products.length > 0) {
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.name;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.disabled = true;
            option.textContent = 'No products available';
            productSelect.appendChild(option);
        }

        // When product is selected, fill in the form inputs
        productSelect.addEventListener('change', function() {
            const selectedProduct = this.value;
            if (selectedProduct) {
                const product = inventory.findProduct(selectedProduct);
                if (product) {
                    nameInput.value = product.name;
                    unitInput.value = product.unit;
                    quantityInput.value = product.quantity;
                    capitalInput.value = product.capital;
                    amountInput.value = product.amount;
                    salesInput.value = product.sales;
                    expensesInput.value = product.expenses;
                }
            } else {
                // Clear the form if no product selected
                nameInput.value = '';
                unitInput.value = '';
                quantityInput.value = '';
                capitalInput.value = '';
                amountInput.value = '';
                salesInput.value = '';
                expensesInput.value = '';
            }
        });
    }

    saveButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const unit = unitInput.value.trim();
        const quantity = parseFloat(quantityInput.value);
        const capital = parseFloat(capitalInput.value);
        const amount = parseFloat(amountInput.value);
        const sales = parseFloat(salesInput.value);
        const expenses = parseFloat(expensesInput.value);

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

        const updatedProduct = new Product(name, unit, quantity, capital, sales, amount, expenses);

        // Use original product name from URL if available; else from input
        const originalName = productNameToEdit || nameInput.value.trim();
        const success = inventory.editProduct(originalName, updatedProduct);

        if (success) {
            alert('Product updated successfully!');
            window.location.href = 'list_product.html';
        } else {
            alert('Failed to update product.');
        }
    });
});
