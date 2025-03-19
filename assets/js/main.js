document.addEventListener("DOMContentLoaded", function () {
    let cartCounter = document.querySelector(".mkdf-cart-number");
    let cartCount = localStorage.getItem("cartCount") || 0;
    cartCounter.innerText = cartCount;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = {
                id: this.getAttribute("data-id"),
                name: this.getAttribute("data-name"),
                price: this.getAttribute("data-price"),
                image: this.getAttribute("data-image"),
                quantity: 1
            };

            // جلب المنتجات من localStorage أو إنشاء مصفوفة جديدة
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // التأكد مما إذا كان المنتج موجودًا بالفعل
            let existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            // localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // تحديث العداد
            cartCount++;
            localStorage.setItem("cartCount", cartCount);
            cartCounter.innerText = cartCount;

            // عرض رسالة نجاح
            showSuccessAlert("Product added successfully!");
        });
    });
});

// دالة عرض رسالة النجاح
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


document.querySelector("#checkoutButton").addEventListener("click", function () {
    localStorage.removeItem("cart");
    localStorage.setItem("cartCount", 0);
});
