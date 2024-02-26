import { product } from "../Data/data.js";
import { getData, setData, removeItem, addItem, enums } from "./helper.js";

const container = document.getElementById("product-container");
const sortItems = document.querySelectorAll(".sort");
const filterItems = document.querySelectorAll(".filter");
const logoCart = document.getElementById("cart-logo");
const sliderMin = document.getElementById("sliderMin");
const sliderMax = document.getElementById("sliderMax");
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const searchBtn = document.getElementById("search-input")


if (!getData(enums.priceRange))
    setData(enums.priceRange, { min: 0, max: 100000 });

if (!getData(enums.product)) setData(enums.product, product);

const render = () => {

    container.innerHTML = "";
    const userId = getData(enums.user);
    if (!userId) location.replace("./HTML/login.html");

    let productData = getData(enums.product);


    const range = getData(enums.priceRange);

    productData = productData.filter(item => item.price > range.min && item.price < range.max);

    const sort = getData(enums.sort);

    productData = productData.filter(item => item.title.toLowerCase().includes(searchBtn.value.toLowerCase()))

    if (sort === enums.lowtoHigh)
        productData = productData.sort((a, b) => a.price - b.price);
    else if (sort === enums.hightoLow)
        productData = productData.sort((a, b) => b.price - a.price);
    else if (sort === enums.byRatings)
        productData = productData.sort((a, b) => b.ratings - a.ratings);

    const userCart = getData(enums.userCart);
    const cart = userCart.filter(item => item.id === userId)[0].cart;

    logoCart.innerText = cart.filter(item => item.quantity > 0).length;

    productData.forEach((item) => {
        const quantity = cart.filter(
            (element) => element.id.toString() === item.id
        )[0].quantity;

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.id = item.id;

        const image = document.createElement("img");
        image.src = item.img;
        image.alt = item.title;
        productCard.appendChild(image);

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");
        productCard.appendChild(cardInfo);

        const title = document.createElement("h3");
        title.textContent = item.title;
        cardInfo.appendChild(title);

        const description = document.createElement("h5");
        description.textContent = item.description;
        cardInfo.appendChild(description);

        const ratingsContainer = document.createElement("h4");
        ratingsContainer.textContent = "ratings : ";
        const ratingsSpan = document.createElement("span");
        ratingsSpan.textContent = item.ratings;
        ratingsContainer.appendChild(ratingsSpan);
        cardInfo.appendChild(ratingsContainer);

        const starImage = document.createElement("img");
        starImage.src = "./images/star-solid.svg";
        starImage.alt = "star";
        ratingsContainer.appendChild(starImage);

        const price = document.createElement("h4");
        price.textContent = "Price : ";
        const priceSpan = document.createElement("span");
        priceSpan.textContent = "Rs. " + item.price;
        price.appendChild(priceSpan);
        cardInfo.appendChild(price);

        if (quantity === 0) {
            const addButton = document.createElement("button");
            addButton.setAttribute("uid", item.id);
            addButton.classList.add("increament");
            addButton.textContent = "Add to Cart";
            cardInfo.appendChild(addButton);
        } else {
            const numberGroup = document.createElement("div");
            numberGroup.classList.add("number-group");

            const incrementButton = document.createElement("span");
            incrementButton.setAttribute("uid", item.id);
            incrementButton.classList.add("increament");
            incrementButton.textContent = "+";
            numberGroup.appendChild(incrementButton);

            const quantityDisplay = document.createElement("span");
            quantityDisplay.textContent = quantity;
            numberGroup.appendChild(quantityDisplay);

            const decrementButton = document.createElement("span");
            decrementButton.setAttribute("uid", item.id);
            decrementButton.classList.add("decreament");
            decrementButton.textContent = "-";
            numberGroup.appendChild(decrementButton);

            cardInfo.appendChild(numberGroup);
        }
        container.appendChild(productCard);
    });

    const increament = document.querySelectorAll(".increament");

    increament.forEach((element) => {
        element.addEventListener("click", () => {
            addItem(element.getAttribute("uid"));
            render();
        });
    });

    const decreament = document.querySelectorAll(".decreament");
    decreament.forEach((element) => {
        element.addEventListener("click", () => {
            removeItem(element.getAttribute("uid"));
            render();
        });
    });

    const logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("user");
        location.replace("./HTML/login.html");
    });
};
render();

filterItems.forEach((item) => {
    item.addEventListener("click", () => {
        setData("filter", item.getAttribute("id"));
        render();
    });
});

sortItems.forEach((item) => {
    item.addEventListener("click", () => {
        setData(enums.sort, enums[item.getAttribute("id")]);
        render();
    });
});

sliderMin.addEventListener("change", () => {
    let priceRange = getData(enums.priceRange);
    priceRange.min = sliderMin.value;
    setData(enums.priceRange, priceRange);
    minRange.innerText = sliderMin.value;
    render();
});

sliderMax.addEventListener("change", () => {
    let priceRange = getData(enums.priceRange);
    priceRange.max = sliderMax.value;
    setData(enums.priceRange, priceRange);
    maxRange.innerText = sliderMax.value;
    render();
});

searchBtn.addEventListener("input", () => {
    render()
})
