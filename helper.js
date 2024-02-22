export const getData = (str) => JSON.parse(localStorage.getItem(str))

export const setData = (str, data) => localStorage.setItem(str, JSON.stringify(data))

export const addItem = (productId) => {
  console.log(productId)
  let userId = getData('user')
  let userCart = getData('userCart')

  userCart.map((item, index) => {
    if (item.id === userId) {
      let flag=0
      item.cart.map((ele, i) => {
        if (ele.id === parseInt(productId)) {
          flag=1
          userCart[index].cart[i].quantity++
        }
      console.log(userCart)
      if(flag===0)
      userCart[index].cart.push({id:productId,quantity:1})
      console.log(userCart)
      console.log('k')
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
      item.cart.map((ele, i) => {
        if (ele.id === parseInt(productId)) {
          if (userCart[index].cart[i].quantity > 0)
            userCart[index].cart[i].quantity--
          else
          userCart[index].cart.filter((item)=>item.id!=productId)
        }
      })
    }
  })
  setData('userCart', userCart)
};
