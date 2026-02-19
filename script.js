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

    for (let i = 0; i < dishes.length; i++) {
        let card = getDishHTML(dishes[i], i);

        if (dishes[i].category == 'burger') {
            burgerRef.innerHTML += card;
        }
        if (dishes[i].category == 'pizza') {
            pizzaRef.innerHTML += card;
        }
        if (dishes[i].category == 'salad') {
            saladRef.innerHTML += card;
        }
    }
}

function addToBasket(name, price) {
    console.log('add ' + name);
    let found = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name == name) {
            basket[i].amount = basket[i].amount + 1;
            found = true;
        }
    }

    if (found == false) {
        basket.push({
            name: name,
            price: price,
            amount: 1
        });
    }

    renderBasket();
}

function renderBasket() {
    let contentRef = document.getElementById('basket_content');
    contentRef.innerHTML = '';
    summe = 0;

    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    if (basket.length == 0) {
        contentRef.innerHTML = `
            <div class="basket_empty_state">
                <img src="assets/icons/shopping_cart.png" alt="Empty" style="opacity: 0.3; height: 40px; margin-bottom: 15px;">
                <h3>Wähle dein Festmahl</h3>
                <p>Stöbere durch unsere Speisekarte, stelle dein Menü zusammen und genieße deine Mahlzeit.</p>
            </div>
        `;
        if (totalSection) { totalSection.style.display = 'none'; }
        if (checkoutBtn) { checkoutBtn.style.display = 'none'; }
        return;
    }

    if (totalSection) { totalSection.style.display = 'block'; }
    if (checkoutBtn) { checkoutBtn.style.display = 'block'; }

    for (let i = 0; i < basket.length; i++) {
        contentRef.innerHTML += getBasketItem(i);
        summe = summe + (basket[i].price * basket[i].amount);
    }

    updateBasketTotal(summe);
}

function updateBasketTotal(totalAmount) {
    let formatted = totalAmount.toFixed(2).replace('.', ',');

    let totalSpan = document.getElementById('total_sum');
    if (totalSpan) {
        totalSpan.innerHTML = formatted + ' €';
    }

    let btn = document.getElementById('checkout_btn');
    if (btn) {
        btn.innerHTML = 'Bezahlen (' + formatted + ' €)';
    }
}

function placeOrder() {
    console.log('Orrder place');
    basket = [];

    let contentRef = document.getElementById('basket_content');
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    if (totalSection) totalSection.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';

    contentRef.innerHTML = `
        <div class="basket_success_state">
             <h3>Vielen Dank für deine Bestellung!</h3>
             <p>Dein Essen wird schon bald frisch und heiß zu dir geliefert.</p>
        </div>
    `;
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
    // toggle class for mobile menu
    // https://www.w3schools.com/jsref/prop_element_classlist.asp
    basketContainer.classList.toggle('show_basket');

    if (basketContainer.classList.contains('show_basket')) {
        if (mobileBtn) mobileBtn.classList.add('d_none');
    } else {
        if (mobileBtn) mobileBtn.classList.remove('d_none');
    }
}

function closeBasket() {
    let basketContainer = document.getElementById('basket_container_1');
    basketContainer.classList.remove('show_basket');

    let mobileBtn = document.querySelector('.mobile_basket_btn');
    if (mobileBtn) mobileBtn.classList.remove('d_none');
}

init();