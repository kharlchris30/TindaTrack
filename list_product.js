document.addEventListener('DOMContentLoaded', function() {
    const productListDiv = document.getElementById('product_list');
    
    // Inject CSS styles for buttons with inline-block and margin-left on delete button
    const style = document.createElement('style');
    style.textContent = `
        .edit-button {
            display: inline-block;
            color: black;
            background-color: yellow;
            padding: 4px 8px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
        }
        .edit-button:hover {
            background-color: #f9e34d;
        }
        .delete-button {
            display: inline-block;
            color: white;
            background-color: red;
            padding: 4px 8px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            margin-left: 12px;
        }
        .delete-button:hover {
            background-color: #cc0000;
        }
    `;
    document.head.appendChild(style);

    inventory.loadFromLocalStorage();
    
    function displayProducts() {
        const products = inventory.getAllProducts();
        
        if (products.length === 0) {
            productListDiv.innerHTML = '<p>No products in inventory. Please add products first.</p>';
            return;
        }
        
        let tableHTML = `
            <table id="inventory-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Product Name</th>
                        <th>Unit</th>
                        <th>Pieces/Quantity</th>
                        <th>Amount (Capital)</th>
                        <th>Sales</th>
                        <th>Remaining Quantity</th>
                        <th>Price</th>
                        <th>Total Sales</th>
                        <th>Income</th>
                        <th>Expenses</th>
                        <th>Monthly Income</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        products.forEach((product, index) => {
            tableHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.unit}</td>
                    <td>${product.quantity}</td>
                    <td>${product.capital.toFixed(2)}</td>
                    <td>${product.sales}</td>
                    <td>${product.remainingQuantity}</td>
                    <td>${product.amount.toFixed(2)}</td>
                    <td>${product.totalSales.toFixed(2)}</td>
                    <td>${product.income.toFixed(2)}</td>
                    <td>${product.expenses.toFixed(2)}</td>
                    <td>${product.monthlyIncome.toFixed(2)}</td>
                    <td>
                        <a href="edit_product.html?name=${encodeURIComponent(product.name)}" class="edit-button">Edit</a>
                        <a href="#" class="delete-link delete-button" data-name="${product.name}">Delete</a>
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        productListDiv.innerHTML = tableHTML;
        
        const deleteLinks = document.querySelectorAll('.delete-link');
        deleteLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.getAttribute('data-name');
                const confirmDelete = confirm("Are you sure you want to delete " + productName + "?");
                
                if (confirmDelete) {
                    inventory.deleteProduct(productName);
                    displayProducts();
                }
            });
        });
    }
    
    displayProducts();
});
