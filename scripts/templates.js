function getBasketItem(index) {
    // how to fix decimals here: https://www.w3schools.com/jsref/jsref_tofixed.asp
    let totalPrice = (basket[index].price * basket[index].amount).toFixed(2);
    totalPrice = totalPrice.replace('.', ',');

    return '<div class="basket_card_item">' +
        '<div class="basket_info_top">' +
        '<span class="basket_name">' + basket[index].name + '</span>' +
        '</div>' +
        '<div class="basket_controls">' +
        '<div class="amount_controls">' +
        '<button class="control_btn" onclick="removeAmount(' + index + ')">-</button>' +
        '<span class="amount_display">' + basket[index].amount + '</span>' +
        '<button class="control_btn" onclick="addAmount(' + index + ')">+</button>' +
        '</div>' +
        '<span class="basket_price_item">' + totalPrice + '€</span>' +
        '<button class="delete_icon_btn_text" onclick="deleteItem(' + index + ')"><img src="assets/icons/delete.png" alt="Delete" class="delete_icon_img"></button>' +
        '</div>' +
        '</div>';
}

function getDishHTML(dish, index) {
    let priceFormatted = dish.preis.toFixed(2).replace('.', ',') + '€';
    let myClass = '';

    if (index == 0) { myClass = 'burger_card_1'; }
    if (index == 1) { myClass = 'burger_card_2'; }
    if (index == 2) { myClass = 'burger_card_3'; }
    if (index == 3) { myClass = 'burger_card_4'; }

    if (index == 4) { myClass = 'pizza_card_1'; }
    if (index == 5) { myClass = 'pizza_card_2'; }
    if (index == 6) { myClass = 'pizza_card_3'; }
    if (index == 7) { myClass = 'salad_card_1'; }
    if (index == 8) { myClass = 'salad_card_2'; }
    if (index == 9) { myClass = 'salad_card_3'; }

    if (myClass == '') { myClass = 'burger_card_1'; }

    return '<div class="' + myClass + '">' +
        '<div class="burger_img_div_1">' +
        '<img src="' + dish.img + '" alt="' + dish.name + '" class="food_img_1">' +
        '</div>' +
        '<div class="burger_info_1">' +
        '<h3 class="burger_title_1">' + dish.name + '</h3>' +
        '<p class="burger_desc_1">' + dish.discription + '</p>' +
        '<div class="price_row_1">' +
        '<span class="price_text_1">' + priceFormatted + '</span>' +
        '<button class="add_btn_1" onclick="addToBasket(\'' + dish.name + '\', ' + dish.preis + ')">+</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function getEmptyBasketTemplate() {
    return '<div class="basket_empty_state">' +
        '<img src="assets/icons/shopping_cart.png" alt="Empty" style="opacity: 0.3; height: 40px; margin-bottom: 15px;">' +
        '<h3>Wähle dein Festmahl</h3>' +
        '<p>Stöbere durch unsere Speisekarte, stelle dein Menü zusammen und genieße deine Mahlzeit.</p>' +
        '</div>';
}

function getSuccessBasketTemplate() {
    return '<div class="basket_success_state">' +
        '<h3>Vielen Dank für deine Bestellung!</h3>' +
        '<p>Dein Essen wird schon bald frisch und heiß zu dir geliefert.</p>' +
        '</div>';
}