function dishTemplate(dish) {
    return `
        <div class="dishes-content">

            <div class="dish-img"
                style="background-image: url('${dish.image}')">
            </div>

            <div class="dish-text">
                <h3>${dish.name}</h3>

                <p>
                    ${dish.description}
                </p>

            </div>
                
            <div class="basket-add">
                <span class="price">${dish.price.toFixed(2)} €</span>
                <button class="dish-btn" id="dish-btn-${dish.id}" onclick="addToBasket(event, ${dish.id})">
                    Add to basket
                </button>
            </div>

        </div>
    `;
}


function basketTemplate(dish) {
    return `
        <div class="basket-content">
            <div>
                <div class="dish-added-basket">
                    <div class="meal-title-basket">
                        <span> 1x </span>
                        <span> ${dish.name}</span>
                    </div>
                        ${dish.amount > 1 ? `
                            <button onclick="deleteFromBasket(${dish.id})">
                                <img src="./assets/img/delete.png" alt="Löschen">
                            </button>
                        ` : ""}
                </div>
                    
                <div class="dish-adjust">
                    <div class="meal-adjust">
                         ${dish.amount <= 1 ? `

                        <button onclick="deleteFromBasket(${dish.id})">
                            <img src="./assets/img/delete.png" alt="Löschen">
                        </button>

                    ` : `

                        <button class="minus-icon" onclick="removeFromBasket(${dish.id})">
                            -
                        </button>

                    `}
                        <button>${(dish.amount)}</button>
                        <button onclick="addToBasket(event, ${dish.id})"> + </button>
                    </div>
                        <span class="dish-count">${(dish.price * dish.amount).toFixed(2)} €</span>
                </div>
        </div>
    `;
}