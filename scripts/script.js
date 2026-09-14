let cartprice = 0;
let cart = []

const burgermenu = document.getElementById("burgermenu");
const pizzamenu = document.getElementById("pizzamenu");
const saladmenu = document.getElementById("saladmenu");
const basketdishes = document.getElementById("basketDishes");

const mealCosts = document.getElementById("meal-costs");
const totalCosts = document.getElementById("total-costs");
const buyTotalCosts = document.getElementById("buy-total-costs");

const dishCountBar = document.getElementById("dish-count-bar");
const mobileBasket = document.getElementById("shopping-cart-wrapper");



function renderMenusFromTemplate(menu, category) {
    menu.innerHTML = "";

    dishes.forEach(dish => {
        if (dish.category == category) {
            menu.innerHTML += dishTemplate(dish);
        }
    });
}


function renderMenu() {
    renderMenusFromTemplate(burgermenu, "Burger");
    renderMenusFromTemplate(pizzamenu, "Pizza");
    renderMenusFromTemplate(saladmenu, "Salad");
}


function renderBasket() {
    basketdishes.innerHTML = "";

    cart.forEach(dish => {
        basketdishes.innerHTML += basketTemplate(dish);
    });
}


function saveBasketToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function loadBasketFromLocalStorage() {
    const savedBasket = localStorage.getItem("cart");

    if (savedBasket) {
        cart = JSON.parse(savedBasket);
    }
    renderBasket();
    updateBasketCosts();

    cart.forEach(item => {
        updateDishButton(item.id, item.amount);
    });
}


function updateBasket() {
    renderBasket();
    updateBasketCosts();
    saveBasketToLocalStorage();
}


function updateDishButton(dishid, amount) {
    const button = document.getElementById(`dish-btn-${dishid}`);

    if (button) {
        button.innerText = `Added ${amount}`;
    }
}


function addToBasket(event, dishid) {
    dishes.forEach(dish => {
        if (dish.id === dishid) {
            cartprice += dish.price;

            let item = cart.find((element) => element.id === dishid)

            if (item) {

                if (item.amount < 50) {
                    item.amount += 1;
                }
            } else {
                item = { id: dish.id, name: dish.name, amount: 1, price: dish.price };
                cart.push(item);
            }

            updateDishButton(dishid, item.amount);
            updateBasket();
        }
    });
};


function removeFromBasket(dishid) {
    let item = cart.find(element => element.id === dishid);

    if (item.amount > 1) {
        item.amount -= 1;
    }

    updateDishButton(dishid, item.amount);
    updateBasket();
}


function deleteFromBasket(dishid) {
    cart = cart.filter(item => item.id !== dishid);
    const button = document.getElementById(`dish-btn-${dishid}`);

    if (button) {
        button.innerText = "Add to basket";
    }

    updateBasket();
}


function updateBasketCosts() {
    let subtotal = 0;
    let dishCount = 0;

    cart.forEach(dish => {
        subtotal += dish.price * dish.amount;
        dishCount += dish.amount;
    });

    mealCosts.innerText = `${subtotal.toFixed(2)} €`;

    let total = 0;

    if (subtotal > 0) {
        total = subtotal + 4.99;
    }

    totalCosts.innerText = `${total.toFixed(2)} €`;
    buyTotalCosts.innerText = `${total.toFixed(2)} €`;
    dishCountBar.innerText = dishCount;
}

function clearBasket() {
    cart = [];
    updateBasket();
}


function resetDishButtons() {
    document.querySelectorAll(".dish-btn").forEach(button => {
        button.innerText = "Add to basket";
    });
}


function openDialog() {
    if (cart.length === 0) {
        return;
    }

    const overlay = document.getElementById("body-overlay");

    overlay.classList.add("visible");
    document.body.classList.add("no-scroll");

    clearBasket();
    resetDishButtons();
    closeMobileBasket();

    setTimeout(closeDialog, 3000);
}


function closeDialog() {
    const overlay = document.getElementById("body-overlay");

    overlay.classList.remove("visible");
    document.body.classList.remove("no-scroll");
}


function openMobileBasket() {
    mobileBasket.classList.toggle("visible-basket");

    const isOpen = mobileBasket.classList.contains("visible-basket");
    const basketOverlay = document.getElementById("basket-overlay");

    basketOverlay.classList.toggle("visible", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
}


function closeMobileBasket() {
    mobileBasket.classList.remove("visible-basket");
    document.getElementById("basket-overlay").classList.remove("visible");
}


document.getElementById("body-overlay").addEventListener("click", function (event) {
    if (event.target === this) {
        closeDialog();
    }
});


document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeDialog();
    }
});


renderMenu();
loadBasketFromLocalStorage();