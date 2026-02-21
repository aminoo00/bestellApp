var basket = [];
let summe = 0;

function init() {
    console.log('init start');
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
        let card = getDishHTML(dishes[i], i);
        if (dishes[i].category == 'burger') burgerRef.innerHTML += card;
        if (dishes[i].category == 'pizza') pizzaRef.innerHTML += card;
        if (dishes[i].category == 'salad') saladRef.innerHTML += card;
    }
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
    for (let i = 0; i < basket.length; i++) {
        contentRef.innerHTML += getBasketItem(i);
        summe = summe + (basket[i].price * basket[i].amount);
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


// toggle class for mobile menu
// https://www.w3schools.com/jsref/prop_element_classlist.asp
function toggleBasket() {
    let basketContainer = document.getElementById('basket_container_1');
    let mobileBtn = document.querySelector('.mobile_basket_btn');
    basketContainer.classList.toggle('show_basket');

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
    if (mobileBtn) mobileBtn.classList.remove('d_none');
}

init();