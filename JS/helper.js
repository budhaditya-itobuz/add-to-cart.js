export const getData = (str) => JSON.parse(localStorage.getItem(str))

export const setData = (str, data) => localStorage.setItem(str, JSON.stringify(data))

export const addItem = (productId) => {

  let userId = getData('user')
  let userCart = getData('userCart')

  userCart.map((item, index) => {
    if (item.id === userId) {
      console.log(item.cart)
      item.cart.map((ele, i) => {
        if (ele.id === parseInt(productId)) {
          userCart[index].cart[i].quantity++
        }
      })
    }
  })
  setData('userCart', userCart)
}

export const removeItem = (productId) => {
  let userId = getData('user')
  let userCart = getData('userCart')

  userCart.map((item, index) => {
    if (item.id === userId) {
      console.log(item.cart)
      item.cart.map((ele, i) => {
        if (ele.id === parseInt(productId)) {
          if (userCart[index].cart[i].quantity > 0)
            userCart[index].cart[i].quantity--
        }
      })
    }
  })
  setData('userCart', userCart)
};
