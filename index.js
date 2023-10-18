import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let orderedListArr = []
let cardNumberLength = 1

document.addEventListener('click', function(e){
    if(e.target.dataset.add) {
        document.querySelector('.order-placed').style.display = 'none'
        handleAddOrder(e.target.dataset.add)
    }
    else if (e.target.id === 'remove') {
        handleRemoveOrder(e.target.dataset.remove)
    }
    else if (e.target.id === 'order-btn'){
        handleOrder()
    }
    else if((e.target.parentElement.id !== 'payment') && (e.target.parentElement.id !== 'main')) {
        document.querySelector('.payment').style.display = 'none'
    }
    else if (e.target.id === 'pay-btn') {
        if(checkInput()) {
            document.querySelector('.payment').style.display = 'none'
            document.querySelector('.order-container').style.display = 'none'
            document.querySelector('.order-placed').style.display = 'block'
            orderedListArr = []
            cardNumberLength = 1
        }
    }
})


const handleAddOrder = (orderId) => {
    orderedListArr.push(menuArray.filter(function(order) {
       return order.uuid === orderId
    })[0])
    orderedListArr = orderedListArr.map(order => {
        return {
            ...order,
            uuid: uuidv4()
        }
    })
    renderOrder(orderedListArr)
}

const handleRemoveOrder = (orderId) => {
    orderedListArr = orderedListArr.filter(order => order.uuid !== orderId)
    renderOrder(orderedListArr)
}

const handleOrder = () => {
    document.querySelector('.payment').style.display = 'flex'
}

const checkInput = () => {
    const name = document.getElementById('name')
    const cardNumber = document.getElementById('cardNumber')
    const cvvNumber = document.getElementById('cvvNumber')

    document.getElementById('customer').innerHTML = name.value
    if(name.value === '') {
        name.style.borderColor = 'red'
        return false
    } else {
        name.style.borderColor = '#757575'
    }

    if(cardNumber.value === '' || cardNumber.value.length < 16) {
        cardNumber.style.borderColor = 'red'
        return false
    } else {
        cardNumber.style.borderColor = '#757575'
    }

    if (cvvNumber.value === '') {
        cvvNumber.style.borderColor = 'red'
        return false
    } else {
        cvvNumber.style.borderColor = '#757575'
    }

    return true
}

const menuListHtml = () => {
    let menuList = ''
    menuArray.forEach(order => {
        menuList += `
        <div class="menu">
        <div class = "menu-start">
            <img src="${order.emoji}" alt="${order.name}" class="menu-img">
        </div>
        <div class="menu-mid">
            <h4 class="card-title">${order.name}</h4>
            <p class="card-artist">${order.ingredients}</p>
            <h3>$${order.price}</h3>
        </div>
        <div class="menu-end">
            <p class="add-menu" data-add="${order.uuid}">+</p>
        </div>
        </div>
        `
    })
    document.querySelector('.main').innerHTML = menuList
}


const renderOrder = function(orderArr) {
    let orderList = ''
    let totalCheck = 0
    document.querySelector('.order-container').style.display = 'block'
    orderArr.forEach(order => {
       totalCheck += order.price
       orderList += `
        <div class="order-list-items">
            <div class="order-list-items-item">
                <span>${order.name}</span>
                <span id="remove" data-remove="${order.uuid}">remove</span>
            </div>
            <span>$${order.price}</span>
        </div>
       `
    });
    document.querySelector('.order-list').innerHTML = orderList
    document.getElementById('total').innerHTML = `$${totalCheck.toFixed(2)}`
}

menuListHtml()