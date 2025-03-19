document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector("main .container");
    // message on empty cart
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <p class='text-center pt-5 fs-4'>The cart is Empty</p>
            <div class='return text-center mt-3'>
                <button class='btn return-to-shop'>Return to Shop</button>
            </div>
        `;
        // Event back to home
        document.querySelector(".return-to-shop").addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
    
    

    cartItems.forEach(item => {
        let cartRow = document.createElement("div");
        cartRow.classList.add("row", "align-items-center", "text-center", "border-bottom", "py-3");
        cartRow.setAttribute("data-id", item.id); 

        cartRow.innerHTML = `
            <div class="col-4 d-flex align-items-center">
                <button class="btn btn-link text-dark fs-4 me-3 remove-item" data-id="${item.id}">&times;</button> 
                <img src="${item.image}" alt="${item.name}" class="w-25 img-item">
                <span class="type-item fs-5 ps-3">${item.name}</span>
            </div>
            <div class="col-2">
                <span class="fs-5 price-item">$${item.price}</span>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <div class="input-group quantity-input border">
                    <input type="text" class="form-control text-center border-0 item-quantity" value="${item.quantity}" data-id="${item.id}">
                    <div class="d-flex flex-column justify-content-center align-items-center pe-2">
                        <button class="btn btn-sm border-bottom increase-qty" data-id="${item.id}">+</button>
                        <button class="btn btn-sm decrease-qty" data-id="${item.id}">-</button>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <span class="fs-5 subtotal-item">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;

        cartContainer.appendChild(cartRow);
    });

    updateCartUI();
});

// تحديث الـ Subtotal و Total عند تغيير الكمية
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("increase-qty") || event.target.classList.contains("decrease-qty")) {
        let productId = event.target.getAttribute("data-id");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let product = cart.find(item => item.id === productId);

        if (product) {
            if (event.target.classList.contains("increase-qty")) {
                product.quantity++;
            } else if (event.target.classList.contains("decrease-qty") && product.quantity > 1) {
                product.quantity--;
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    }
});

// تحديث واجهة المستخدم
function updateCartUI() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
        let row = document.querySelector(`[data-id="${item.id}"]`);
        if (row) {
            row.querySelector(".item-quantity").value = item.quantity;
            row.querySelector(".subtotal-item").innerText = `$${(item.price * item.quantity).toFixed(2)}`;
        }
    });

    document.querySelector(".subtotal-value").innerText = `$${subtotal.toFixed(2)}`;
    document.querySelector(".total-value").innerText = `$${subtotal.toFixed(2)}`;
}

// إضافة منتج جديد كصف منفصل
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        let product = {
            id: `${this.getAttribute("data-id")}-${Date.now()}`, // ID فريد لكل منتج جديد
            name: this.getAttribute("data-name"),
            price: parseFloat(this.getAttribute("data-price")),
            image: this.getAttribute("data-image"),
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", cartCount);
        document.querySelector(".mkdf-cart-number").innerText = cartCount;

        updateCartUI();
    });
});

// دالة عرض رسالة نجاح عند الإضافة
function showSuccessAlert(message) {
    let alertBox = document.createElement("div");
    alertBox.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x p-3 shadow";
    alertBox.style.zIndex = "1050";
    alertBox.innerText = message;

    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 2000);
}




document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        let productId = event.target.getAttribute("data-id");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // تصفية المنتجات وإزالة المنتج المحدد
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));

        // تحديث عداد السلة
        let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", cartCount);

        let cartNumberElement = document.querySelector(".mkdf-cart-number");
        if (cartNumberElement) {
            cartNumberElement.innerText = cartCount;
        }

        // حذف الصف من الـ DOM بدون إعادة تحميل الصفحة
        let rowToDelete = event.target.closest(".row");
        if (rowToDelete) {
            rowToDelete.remove();
        }

        // إذا كانت السلة فارغة، عرض رسالة "السلة فارغة"
        let cartContainer = document.querySelector("main .container");
        if (cart.length === 0 && cartContainer) {
            cartContainer.innerHTML = `
            <p class='text-center pt-5 fs-4'>The cart is Empty</p>
            <div class='return text-center mt-3'>
                <button class='btn return-to-shop'>Return to Shop</button>
            </div>
        `;
        }
    }
});


         // إضافة حدث عند الضغط على الزر
        document.querySelector(".checkout").addEventListener("click", function () {
            window.location.href = "chick.html"; // إعادة التوجيه
        });
        // Backe to more shopping
        document.querySelector(".back-more").addEventListener("click", function () {
            window.location.href = "index.html"; // إعادة التوجيه
        });




