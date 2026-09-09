function dishTemplate(dish) {
    return `
        <div class="dishes-content">

            <div class="dish-img"
                style="background-image: url('${dish.image}')">
            </div>

            <div class="dish-text">
                <h3 class="dish-title">${dish.name}</h3>

                <p>
                    ${dish.description}
                </p>

            </div>
                
            <div class="basket-add">
                <span class="price">${dish.price.toFixed(2)} €</span>
                <button class="dish-btn" onclick="addToBasket(event, ${dish.id})">
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
                <div class="dish-added-bakset">
                    <span> 1x </span>
                    <span> ${dish.name}</span>
                </div>
                    
                <div class="dish-adjust">
                    <div class="meal-adjust">
                        <button onclick="deleteFromBasket(${dish.id})"><img src="./assets/img/delete.png" alt="Löschen"></button>
                        ${dish.menge > 1 ? `
                            <button 
                                onclick="removeFromBasket(${dish.id})">
                                -
                            </button>
                        ` : ""}
                        <button>${(dish.menge)}</button>
                        <button onclick="addToBasket(event, ${dish.id})"> + </button>
                    </div>
                        <span class="dish-count">${(dish.price*dish.menge).toFixed(2)} €</span>
                </div>
        </div>
    `;
}