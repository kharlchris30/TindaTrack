

document.addEventListener('DOMContentLoaded', function() {
    // Make sure the inventory is loaded
    inventory.loadFromLocalStorage();
    
    // Get form elements
    const productSelect = document.getElementById('product-select');
    const confirmDeleteButton = document.getElementById('confirm_delete');
    
    // Load products into dropdown
    const products = inventory.getAllProducts();
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    // Add event listener to confirm delete button
    confirmDeleteButton.addEventListener('click', function() {
        const productName = productSelect.value;

        if (!productName) {
            alert('Please select a product to delete');
            return;
        }

        // Check if product exists
        const product = inventory.findProduct(productName);
        if (!product) {
            alert('Product not found!');
            return;
        }

        // Confirm deletion
        const confirmDelete = confirm(`Are you sure you want to delete ${productName}?`);
        if (confirmDelete) {
            // Delete product from inventory
            const success = inventory.deleteProduct(productName);
            
            if (success) {
                alert('Product deleted successfully!');
                
                // Refresh the dropdown
                while (productSelect.options.length > 1) {
                    productSelect.remove(1);
                }
                
                const updatedProducts = inventory.getAllProducts();
                updatedProducts.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.name;
                    option.textContent = product.name;
                    productSelect.appendChild(option);
                });
                
                // Reset selection
                productSelect.value = '';
            } else {
                alert('Failed to delete product.');
            }
        }
    });
});