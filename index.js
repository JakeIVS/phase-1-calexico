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
    dishView.querySelector('#dish-image').src = dish.image;
    dishView.querySelector('#dish-text').querySelector('#dish-name').textContent = dish.name;
    dishView.querySelector('#dish-text').querySelector('#dish-description').textContent = dish.description;
    dishView.querySelector('#dish-text').querySelector('#dish-price').textContent = dish.price;
}
initialize();