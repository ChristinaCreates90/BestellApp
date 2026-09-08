let warenkorbprice = 0;
let warenkorb = []

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

    warenkorb.forEach(dish => {
        basketdishes.innerHTML += basketTemplate(dish);
    });
}

function saveBasketToLocalStorage() {
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
}

function loadBasketFromLocalStorage() {
    const savedBasket = localStorage.getItem("warenkorb");

    if (savedBasket) {
        warenkorb = JSON.parse(savedBasket);
    }

    renderBasket();
    updateBasketCosts();
}

function addToBasket(event, dishid) {
    dishid = Number(dishid);

    dishes.forEach(dish => {
        if (dish.id === dishid) {
            warenkorbprice += dish.price;

            let item = warenkorb.find((element) => element.id === dishid)

            if (item) {

                if (item.menge < 50) {
                    item.menge += 1;
                }
            } else {
                item = { id: dish.id, name: dish.name, menge: 1, price: dish.price };
                warenkorb.push(item);
            }

            event.target.innerText = `Added ${item.menge}`;

            basketdishes.innerHTML = "";

            renderBasket();
            updateBasketCosts();
            saveBasketToLocalStorage();
        }
    });

};


function removeFromBasket(dishid) {
    dishid = Number(dishid);

    let item = warenkorb.find(element => element.id === dishid);

    if (item.menge > 1) {
        item.menge -= 1;
    }

    renderBasket();
    updateBasketCosts();
    saveBasketToLocalStorage();
}


function deleteFromBasket(dishid) {
    dishid = Number(dishid);

    warenkorb = warenkorb.filter(item => item.id !== dishid);

    renderBasket();
    updateBasketCosts();
    saveBasketToLocalStorage();
}


function updateBasketCosts() {
    let subtotal = 0;
    let dishCount = 0;

    warenkorb.forEach(dish => {
        subtotal += dish.price * dish.menge;
        dishCount += dish.menge;
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

renderMenu();
loadBasketFromLocalStorage();


function openDialog() {

    if (warenkorb.length === 0) {
        return;
    }
    
    const overlay = document.getElementById("body-overlay");
    overlay.classList.add("visible");
    document.body.classList.add("no-scroll");

    warenkorb = [];

    saveBasketToLocalStorage();
    renderBasket();
    updateBasketCosts();
}


function closeDialog() {
    const overlay = document.getElementById("body-overlay");
    overlay.classList.remove("visible");
    document.body.classList.remove("no-scroll");
}


function openMobileBasket() {
    mobileBasket.classList.toggle("visible-basket");
    document.body.classList.toggle("no-scroll");
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