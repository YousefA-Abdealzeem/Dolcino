document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-details");
    const submitButton = document.querySelector(".final-btn");

    // قائمة الدول والمدن
    const citiesByCountry = {
        "Egypt": ["Cairo", "Alexandria", "Giza", "Sharm El-Sheikh", "Luxor"],
        "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
        "UAE": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
        "USA": ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"]
    };

    // عناصر HTML الخاصة بالقوائم
    const countrySelect = document.getElementById("inputCountry");
    const citySelect = document.getElementById("inputCity");

    // تحديث قائمة المدن عند اختيار الدولة
    if (countrySelect) {
        countrySelect.addEventListener("change", function () {
            const selectedCountry = this.value;
            citySelect.innerHTML = "<option selected disabled>Choose a city...</option>"; // إعادة تعيين المدن

            if (citiesByCountry[selectedCountry]) {
                citiesByCountry[selectedCountry].forEach(city => {
                    const option = document.createElement("option");
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });
    }

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        let isValid = true;

        // جميع الحقول المطلوبة
        const requiredFields = [
            "inputFirstName",
            "inputLastName",
            "inputAddress",
            "inputAddress2",
            "inputCity",
            "inputZip",
            "inputCountry",
            "inputEmail",
            "inputPhone"
        ];

        requiredFields.forEach((id) => {
            const field = document.getElementById(id);
            if (!field || field.value.trim() === "" || field.value === "Choose a city..." || field.value === "Select a country...") {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
                isValid = false;
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid");
            }
        });

        // التحقق من البريد الإلكتروني
        const emailField = document.getElementById("inputEmail");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            emailField.classList.add("is-invalid");
            emailField.classList.remove("is-valid");
            isValid = false;
        } else {
            emailField.classList.remove("is-invalid");
            emailField.classList.add("is-valid");
        }

        // التحقق من رقم الهاتف
        const phoneField = document.getElementById("inputPhone");
        const phoneRegex = /^[0-9]{8,15}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            phoneField.classList.add("is-invalid");
            phoneField.classList.remove("is-valid");
            isValid = false;
        } else {
            phoneField.classList.remove("is-invalid");
            phoneField.classList.add("is-valid");
        }

        // لو الحقول ناقصة يظهر Alert ويوقف العملية
        if (!isValid) {
            alert("Please enter all required data!");
            return;
        }

        // لو كل شيء صحيح، يظهر Alert "Done" ثم يحول المستخدم إلى index.html
        alert("Done");
        window.location.href = "index.html";
    });
});

// تصفير العربه 
document.addEventListener("DOMContentLoaded", function () {
    // تصفير بيانات السلة عند تحميل صفحة الـ Checkout
    localStorage.removeItem("cart");
    localStorage.setItem("cartCount", 0);

    // تحديث العداد في الصفحة (في حال كان هناك عنصر يعرض العداد)
    let cartCounter = document.querySelector(".mkdf-cart-number");
    if (cartCounter) {
        cartCounter.innerText = "0";
    }
});

