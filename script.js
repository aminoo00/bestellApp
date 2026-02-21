var basket = [];
let summe = 0;

function init() {
    renderMenu();
    renderBasket();
}

function renderMenu() {
    let burgerRef = document.getElementById('burger_content');
    let pizzaRef = document.getElementById('pizza_content');
    let saladRef = document.getElementById('salad_content');

    burgerRef.innerHTML = '';
    pizzaRef.innerHTML = '';
    saladRef.innerHTML = '';

    fillMenuCategories(burgerRef, pizzaRef, saladRef);
}

function fillMenuCategories(burgerRef, pizzaRef, saladRef) {
    for (let i = 0; i < dishes.length; i++) {
        let myClass = getCardClass(i);
        let priceFormatted = dishes[i].preis.toFixed(2).replace('.', ',') + '€';
        let card = getDishHTML(dishes[i], myClass, priceFormatted);

        if (dishes[i].category == 'burger') burgerRef.innerHTML += card;
        if (dishes[i].category == 'pizza') pizzaRef.innerHTML += card;
        if (dishes[i].category == 'salad') saladRef.innerHTML += card;
    }
}

function getCardClass(index) {
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
    return myClass;
}

function addToBasket(name, price) {
    let found = checkBasketForDish(name);

    if (found == false) {
        basket.push({
            name: name,
            price: price,
            amount: 1
        });
    }
    renderBasket();
}

function checkBasketForDish(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name == name) {
            basket[i].amount = basket[i].amount + 1;
            return true;
        }
    }
    return false;
}

function renderBasket() {
    let contentRef = document.getElementById('basket_content');
    contentRef.innerHTML = '';
    summe = 0;

    if (basket.length == 0) {
        showEmptyBasket(contentRef);
        updateMobileCounter(0);
        return;
    }

    showFullBasket(contentRef);
}

function showEmptyBasket(contentRef) {
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    contentRef.innerHTML = getEmptyBasketTemplate();
    if (totalSection) totalSection.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
}

function showFullBasket(contentRef) {
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    if (totalSection) totalSection.style.display = 'block';
    if (checkoutBtn) checkoutBtn.style.display = 'block';

    renderBasketItems(contentRef);
    updateBasketTotal(summe);
}

function renderBasketItems(contentRef) {
    let totalItems = 0;

    for (let i = 0; i < basket.length; i++) {
        let totalPrice = (basket[i].price * basket[i].amount).toFixed(2);
        let totalPriceFormatted = totalPrice.replace('.', ',');
        contentRef.innerHTML += getBasketItem(i, basket[i].name, basket[i].amount, totalPriceFormatted);
        summe = summe + (basket[i].price * basket[i].amount);
        totalItems = totalItems + basket[i].amount;
    }

    updateMobileCounter(totalItems);
}

function updateMobileCounter(count) {
    let counterSpan = document.getElementById('mobile_counter');
    if (counterSpan) {
        if (count > 0) {
            counterSpan.innerHTML = count;
            counterSpan.classList.remove('d_none');
        } else {
            counterSpan.classList.add('d_none');
        }
    }
}

function updateBasketTotal(totalAmount) {
    let formatted = totalAmount.toFixed(2).replace('.', ',');
    let totalSpan = document.getElementById('total_sum');
    let btn = document.getElementById('checkout_btn');

    if (totalSpan) totalSpan.innerHTML = formatted + ' €';
    if (btn) btn.innerHTML = 'Bezahlen (' + formatted + ' €)';
}

function placeOrder() {
    basket = [];
    let contentRef = document.getElementById('basket_content');
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    if (totalSection) totalSection.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';

    contentRef.innerHTML = getSuccessBasketTemplate();
    updateMobileCounter(0);
}

function deleteItem(index) {
    basket.splice(index, 1);
    renderBasket();
}

function removeAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }
    renderBasket();
}

function addAmount(index) {
    basket[index].amount++;
    renderBasket();
}

function toggleBasket() {
    let basketContainer = document.getElementById('basket_container_1');
    let mobileBtn = document.querySelector('.mobile_basket_btn');

    basketContainer.classList.toggle('show_basket');
    document.body.classList.toggle('no_scroll');

    if (basketContainer.classList.contains('show_basket')) {
        if (mobileBtn) mobileBtn.classList.add('d_none');
    } else {
        if (mobileBtn) mobileBtn.classList.remove('d_none');
    }
}

function closeBasket() {
    let basketContainer = document.getElementById('basket_container_1');
    let mobileBtn = document.querySelector('.mobile_basket_btn');

    basketContainer.classList.remove('show_basket');
    document.body.classList.remove('no_scroll');

    if (mobileBtn) mobileBtn.classList.remove('d_none');
}

init();