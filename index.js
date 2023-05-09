// Write your code here...
function initialize(){
    fetch('http://localhost:3000/menu')
    .then(r=>r.json())
    .then(menu=>{menu.forEach((item)=>{
        let span = document.createElement('span');
        const menuItems = document.querySelector('#menu-items')
        span.textContent = item.name;
        menuItems.appendChild(span);
        span.addEventListener('click', ()=>{
            displayDish(item);
        })
    }) 
    displayDish(menu[0])
    })
}

function displayDish(dish){
    const dishView = document.querySelector('#dish')
    const count = document.querySelector('#number-in-cart')
    var currentId = dish.id;
    count.textContent = dish.number_in_bag;
    dishView.querySelector('#dish-image').src = dish.image;
    dishView.querySelector('#dish-text').querySelector('#dish-name').textContent = dish.name;
    dishView.querySelector('#dish-text').querySelector('#dish-description').textContent = dish.description;
    dishView.querySelector('#dish-text').querySelector('#dish-price').textContent = dish.price;
}
const form = document.querySelector('#cart-form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addToCart()
})
function addToCart() {
    let cartAdd = parseInt(form.querySelector('#cart-amount').value);
    let count = document.querySelector('#number-in-cart');
    let oldCart = parseInt(count.textContent);
    let newCart = oldCart += cartAdd;
    count.textContent = newCart;
    newPatch (newCart);
}


function newPatch(cartCount){
    let item = document.querySelector('#dish-name').textContent
    fetch ('http://localhost:3000/menu')
    .then(r=>r.json())
    .then(menu=>menu.forEach((data)=>{
        if (data.name === item) {
            let currentId = data.id;
            debugger
            fetch(`http://localhost:3000/menu/${currentId}`,{
                method: 'PATCH',
                headers:{
                    'content-type':'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({"number_in_bag": cartCount})
            })
        }
    }))
}
initialize();