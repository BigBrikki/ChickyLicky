import { menuArray } from '/data.js'

const paymentForm = document.getElementById('payment-form')
const mainMenu = document.getElementById('menu')
const orderSummary = document.getElementById('order-summary')
const checkoutPrice = document.getElementById('order-total')
const checkoutBtn = document.getElementById('complete-order-btn')
const closeModalBtn = document.getElementById('close-modal')
const payBtn = document.getElementById('pay-btn')

let checkoutCart = []

paymentForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(paymentForm.checkValidity())
    const inputName = document.getElementById('input-name').value
    const inputCardInfo = document.getElementById('input-card').value
    const inputCardCVV = document.getElementById('input-cvv').value
    document.getElementById('payment-form').style.display="none"
    renderReceipt(checkoutCart) 
})

document.addEventListener('click', function(e){
    if (e.target.id === "menuItem0"){
        checkoutCart.push(menuArray[0])
    }
    if (e.target.id === "menuItem1"){
        checkoutCart.push(menuArray[1])
    }
    if (e.target.id === "menuItem2"){
        checkoutCart.push(menuArray[2])
    }
    if (e.target.id === "remove"){
        console.log(e.target.dataset.index)
        checkoutCart.splice(e.target.dataset.index, 1)
    }
    renderCart(checkoutCart)
    
    
})

function getMenu(menuArray){
    const menuHtml = menuArray.map(menuItem => {
        return (`<div class='menu-item'>
                    <img class='food-img' src=${menuItem.img}>
                    <div class='food-item-detail'>
                        <h3>${menuItem.name}</h3>
                        <p>${menuItem.comesWith}</p>
                        <p class='price'>$${menuItem.price}</p>
                    </div>
                    <button class='add-item' id=menuItem${menuItem.id}>+</button>
                </div>`)
    }).join('')
    return menuHtml
}

function getCart(checkoutCart){
    let total = 0
    const cart = checkoutCart.map((item, i) => {
        total+=item.price
        return `<div class='order-items'>
                    <div class='item'>
                        <h3>${item.name}</h3>
                        <p id='remove' area-label='remove-${item.name}' data-index='${i}'>remove</p>
                    </div>
                    <div>
                        <p class='price'>$${item.price}</p>
                    </div>
                </div>`
    }).join("")
    checkoutPrice.innerHTML = 
        `<div class='order-total'>
             <h3>Total price:</h3>
             <p class='price'>$${total}</p>
        </div>`
    return cart
}

function getReceipt(checkoutCart){
    let receiptHtml = `Thank you for your chicky order, ${document.getElementById('input-name').value}!` 
    return receiptHtml
}

function renderMenu(menuArray){
    mainMenu.innerHTML = getMenu(menuArray)
}

function renderCart(checkoutCart){
    if(checkoutCart.length === 1){
        document.getElementById('order-area').classList.remove('hide')
    }
    if(checkoutCart.length === 0){
        document.getElementById('order-area').classList.add('hide')
    }
    orderSummary.innerHTML = getCart(checkoutCart)
}

function renderReceipt(checkoutCart){
    document.getElementById('modal-txt').textContent = getReceipt(checkoutCart)
}



checkoutBtn.addEventListener('click', () =>{
    document.getElementById('payment-modal').classList.remove('hide')
    checkoutBtn.style.display = 'none'
})

closeModalBtn.addEventListener('click', () => {
    document.getElementById('payment-modal').classList.add('hide')
    checkoutBtn.style.display = 'inherit'
})

renderMenu(menuArray)
renderCart(checkoutCart)