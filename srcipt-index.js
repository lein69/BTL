$(document).ready(function() {
    // Function to load products from JSON and update UI
    function loadProducts() {
        $('.product-container').empty(); // Clear old content

        fetch('./products.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    var productHTML = `
                        <div class="product-section">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-details">
                                <h2 class="product-title">${product.name}</h2>
                                <p><strong>Thương hiệu:</strong> ${product.brand}</p>
                                <p><strong>CPU:</strong> ${product.cpu}</p>
                                <p><strong>Giá:</strong> ${product.price}</p>
                                <p><strong>Màn Hình:</strong> ${product.screen}</p>
                                <p><strong>Đánh giá:</strong> ${product.rating} / 5</p>
                                <p>${product.review}</p>
                                <a href="#" class="product-link">Xem thêm</a>
                            </div>
                        </div>
                    `;
                    $('.product-container').append(productHTML);
                });
            })
            .catch(error => console.error('Fetch error:', error));
    }

    // Call loadProducts function when the page is loaded initially
    loadProducts();

    // Example event handler for adding a new product
    $('#add-product-form').submit(function(event) {
        event.preventDefault();
        // Assume you have form fields for new product data
        var productName = $('#product-name').val();
        var productBrand = $('#product-brand').val();
        // Retrieve other fields similarly

        // Example of sending data to a backend or updating JSON directly
        // After adding the product, you might want to reload the products list
        // In a real scenario, you would send an AJAX request to your backend here

        // Reload products after adding a new product (this is just an example)
        loadProducts();
    });

    // Other event handlers for editing or deleting products can be added similarly
    // Example: $('#edit-product-form').submit(function(event) { ... });

});
