export const getData = (str) => JSON.parse(localStorage.getItem(str))

export const setData = (str, data) => localStorage.setItem(str, JSON.stringify(data))

export const enums = Object.freeze({
    hightoLow: 1,
    lowtoHigh: 2,
    byRatings: 3,
    priceRange: "priceRange",
    product: "product",
    user: "user",
    productData: "productData",
    sort: "sort",
    userCart: "userCart",
    registeredUser: "registeredUser"
})

export const addItem = (productId) => {

    let userId = getData(enums.user)
    let userCart = getData(enums.userCart)

    userCart.forEach((item, index) => {
        if (item.id === userId) {
            item.cart.forEach((ele, i) => {
                if (ele.id === parseInt(productId)) {
                    userCart[index].cart[i].quantity++
                }
            })
        }
    })
    setData(enums.userCart, userCart)
}

export const removeItem = (productId) => {
    let userId = getData(enums.user)
    let userCart = getData(enums.userCart)

    userCart.forEach((item, index) => {
        if (item.id === userId) {
            item.cart.forEach((ele, i) => {
                if (ele.id === parseInt(productId)) {
                    if (userCart[index].cart[i].quantity > 0)
                        userCart[index].cart[i].quantity--
                }
            })
        }
    })
    setData(enums.userCart, userCart)
};
