import { getData, addItem, removeItem, names } from "./helper.js"
const logoCart = document.getElementById("cart-logo")

const container = document.querySelector("#cart-container")

const render = () => {
    container.innerHTML = ""

    const productData = getData(names.product)
    const userCart = getData(names.userCart)
    const userId = getData(names.user)
    let cart = userCart.filter((item) => item.id === userId)[0].cart

    logoCart.innerText = cart.filter((item) => item.quantity > 0).length
    productData.forEach((item, index) => {

        const quantity = cart.find((ele) => ele.id == item.id).quantity
        if (quantity !== 0) {
            console.log(quantity)
            const cartCard = document.createElement("div")
            cartCard.classList.add("cart-card")

            const cardInfo = document.createElement("div")
            cardInfo.classList.add("card-info")
            cartCard.appendChild(cardInfo)

            const cardImg = document.createElement("div")
            cardImg.classList.add("card-img")
            cardInfo.appendChild(cardImg)

            const image = document.createElement("img")
            image.src = item.img
            image.alt = item.title
            cardImg.appendChild(image)

            const titlePriceContainer = document.createElement("div")
            cardInfo.appendChild(titlePriceContainer)

            const title = document.createElement("h4")
            title.textContent = item.title
            titlePriceContainer.appendChild(title)

            const price = document.createElement("h5")
            price.textContent = "Rs. " + item.price
            titlePriceContainer.appendChild(price)

            const totalPriceContainer = document.createElement("div")
            cardInfo.appendChild(totalPriceContainer)

            const totalPrice = item.price * quantity

            const totalPriceHeading = document.createElement("h4")
            totalPriceHeading.textContent = "Total price"
            totalPriceContainer.appendChild(totalPriceHeading)

            const totalPriceElement = document.createElement("h5")
            totalPriceElement.textContent = "Rs. " + totalPrice
            totalPriceContainer.appendChild(totalPriceElement)

            const numberGroup = document.createElement("div")
            numberGroup.classList.add("number-group")
            cartCard.appendChild(numberGroup)

            const decrementButton = document.createElement("span")
            decrementButton.setAttribute("uid", item.id)
            decrementButton.classList.add("decreament")
            decrementButton.textContent = "-"
            numberGroup.appendChild(decrementButton)

            const quantityDisplay = document.createElement("span")
            quantityDisplay.textContent = quantity
            numberGroup.appendChild(quantityDisplay)

            const incrementButton = document.createElement("span")
            incrementButton.setAttribute("uid", item.id)
            incrementButton.classList.add("increament")
            incrementButton.textContent = "+"
            numberGroup.appendChild(incrementButton)

            container.appendChild(cartCard)
        }
    })

    const decreament = document.querySelectorAll(".decreament")
    const increament = document.querySelectorAll(".increament")

    decreament.forEach((item) => {
        item.addEventListener("click", () => {
            removeItem(item.getAttribute("uid"))
            render()
        })
    })

    increament.forEach((item) => {
        item.addEventListener("click", () => {
            addItem(item.getAttribute("uid"))
            render()
        })
    })

    const logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        localStorage.removeItem(names.user)
        location.replace("login.html")
    })
}
render()
