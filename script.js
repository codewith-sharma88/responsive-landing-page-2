 
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close mobile menu
menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});
// Shopping Cart
let cart = [];

function addToOrder(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayOrder();

    alert(name + " added to your order!");
}

// Display Order
function displayOrder() {

    const orderItems = document.getElementById("order-items");
    const totalPrice = document.getElementById("total-price");

    orderItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        orderItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        orderItems.innerHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
                <button class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalPrice.textContent = "Total: ₹" + total;
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    displayOrder();
}

// Place Order
function placeOrder() {

    if (cart.length === 0) {
        alert("Please add something to your order!");
        return;
    }

    let message = "Thank you for ordering from Brew & Bliss!\n\n";

    let total = 0;

    cart.forEach(item => {
        message += item.name + " x " + item.quantity +
            " = ₹" + (item.price * item.quantity) + "\n";

        total += item.price * item.quantity;
    });

    message += "\nTotal Amount: ₹" + total;

    alert(message + "\n\nYour order has been prepared for confirmation!");

    cart = [];
    displayOrder();
}