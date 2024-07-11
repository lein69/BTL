document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const editProductForm = document.getElementById('edit-product-form');
    const editModal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close');

    let products = []; // Khởi tạo mảng sản phẩm trống
    let currentEditProductId = null; // ID của sản phẩm đang chỉnh sửa

    // Fetch dữ liệu từ file JSON khi trang được tải
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; // Lưu dữ liệu vào biến products
            renderProducts(products); // Hiển thị danh sách sản phẩm
        })
        .catch(error => console.error('Error fetching products:', error));

    // Hàm hiển thị danh sách sản phẩm từ một mảng
    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p><strong>Thương hiệu:</strong> ${product.brand}</p>
                <p><strong>CPU:</strong> ${product.cpu}</p>
                <p><strong>Giá:</strong> ${product.price}</p>
                <p><strong>Màn Hình:</strong> ${product.screen}</p>
                <p><strong>Đánh giá:</strong> ${product.rating} / 5</p>
                <p>${product.review}</p>
            </div>
            <button class="edit-btn" onclick="editProduct(${product.id})">Sửa</button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
        `;
            productList.appendChild(productItem);
        });
    }

    // Hàm thêm sản phẩm mới
    function addProduct(event) {
        event.preventDefault();
        const newProduct = {
            id: Date.now(), // Tạo id duy nhất với timestamp hiện tại
            name: document.getElementById('name').value,
            brand: document.getElementById('brand').value,
            cpu: document.getElementById('cpu').value,
            price: document.getElementById('price').value,
            screen: document.getElementById('screen').value,
            rating: parseFloat(document.getElementById('rating').value),
            review: document.getElementById('review').value,
            image: document.getElementById('image').value
        };
        // Thêm sản phẩm vào danh sách
        products.push(newProduct);
        renderProducts(products); // Cập nhật giao diện hiển thị
        addProductForm.reset(); // Xóa dữ liệu trong form
        // Lưu dữ liệu vào Local Storage hoặc gửi lên server
        saveProductsToJsonFile(products);
    }

    // Hàm mở modal và điền thông tin sản phẩm cần sửa
    window.editProduct = function(id) {
        const product = products.find(product => product.id === id);
        if (product) {
            currentEditProductId = id;
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-brand').value = product.brand;
            document.getElementById('edit-cpu').value = product.cpu;
            document.getElementById('edit-price').value = product.price;
            document.getElementById('edit-screen').value = product.screen;
            document.getElementById('edit-rating').value = product.rating;
            document.getElementById('edit-review').value = product.review;
            document.getElementById('edit-image').value = product.image;

            editModal.style.display = 'block';
        }
    };

    // Đóng modal
    closeModal.onclick = function() {
        editModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    };

    // Hàm cập nhật sản phẩm
    function updateProduct(event) {
        event.preventDefault();
        const product = products.find(product => product.id === currentEditProductId);
        if (product) {
            product.name = document.getElementById('edit-name').value;
            product.brand = document.getElementById('edit-brand').value;
            product.cpu = document.getElementById('edit-cpu').value;
            product.price = document.getElementById('edit-price').value;
            product.screen = document.getElementById('edit-screen').value;
            product.rating = parseFloat(document.getElementById('edit-rating').value);
            product.review = document.getElementById('edit-review').value;
            product.image = document.getElementById('edit-image').value;

            renderProducts(products);
            editProductForm.reset();
            editModal.style.display = 'none';

            // Lưu dữ liệu vào Local Storage hoặc gửi lên server
            saveProductsToJsonFile(products);
        }
    }

//Hàm xóa dữ liệu
 window.deleteProduct = function(id) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        const modal = document.getElementById('confirmDeleteModal');
        if (modal) {
            modal.style.display = 'block'; // Hiển thị modal xác nhận

            // Xử lý khi người dùng xác nhận xóa
            const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
            if (confirmDeleteBtn) {
                confirmDeleteBtn.addEventListener('click', function() {
                    products.splice(index, 1); // Xóa sản phẩm khỏi danh sách
                    renderProducts(products); // Cập nhật lại giao diện
                    modal.style.display = 'none'; // Đóng modal

                    // Lưu dữ liệu vào Local Storage hoặc gửi lên server
                    saveProductsToJsonFile(products);
                });
            }

            // Xử lý khi người dùng hủy bỏ
            const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
            if (cancelDeleteBtn) {
                cancelDeleteBtn.addEventListener('click', function() {
                    modal.style.display = 'none'; // Đóng modal
                });
            }

            // Xử lý khi người dùng nhấn dấu x để đóng modal
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none'; // Đóng modal
                });
            }
        }
    }
};

    
    // Hàm lưu dữ liệu vào file JSON
    function saveProductsToJsonFile(products) {
        fetch('save-products.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(products)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log('Updated products:', data))
        .catch(error => console.error('Error updating data:', error));
    }

    // Sự kiện submit form thêm sản phẩm
    addProductForm.addEventListener('submit', addProduct);

    // Sự kiện submit form cập nhật sản phẩm
    editProductForm.addEventListener('submit', updateProduct);
});
