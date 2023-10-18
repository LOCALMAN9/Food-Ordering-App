import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

export const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        price: 14.15,
        emoji: "./images/pizza.jpg",
        uuid: uuidv4()
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12.12,
        emoji: "./images/hamburger.jpg",
        uuid: uuidv4()
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12.25,
        emoji: "./images/beer.jpg",
        uuid: uuidv4()
    }
]