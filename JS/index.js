import { product, quantity } from '../Data/data.js'
import { getData, setData, removeItem, addItem } from './helper.js';

const container = document.getElementById("container");
const sortItems = document.querySelectorAll('.sort')
const filterItems = document.querySelectorAll('.filter')
const logoCart = document.getElementById('cart-logo')
const slider1=document.getElementById('slider1')
const slider2=document.getElementById('slider2')
const minRange=document.getElementById('min-range')
const maxRange=document.getElementById('max-range')

localStorage.removeItem('range')

if(!getData('range'))
  setData('range',{min:0,max:100000})

if (!getData('product'))
  setData('product', product)

if (!getData('quantity'))
  setData('quantity', quantity)

const render = () => {
  const userId = getData('user')
  if (!userId) location.replace('./HTML/login.html')

  let productData = getData('product')

  const range = getData('range')

  productData=productData.filter((item)=>item.price>range.min && item.price<range.max)

  // if (filter === "10k")
  //   productData = productData.filter((item) => item.price < 10000)
  // else if (filter === "20k")
  //   productData = productData.filter((item) => item.price > 10000 && item.price <= 20000)
  // else if (filter === ">20k")
  //   productData = productData.filter((item) => item.price > 20000)


  const sort = getData('sort')

  if (sort === "lowtoHigh")
    productData = productData.sort((a, b) => a.price - b.price)
  else if (sort === "hightoLow")
    productData = productData.sort((a, b) => b.price - a.price)
  else if (sort === "ratings")
    productData = productData.sort((a, b) => b.ratings - a.ratings)


  const userCart = getData('userCart')
  const cart = userCart.filter((item) => item.id === userId)[0].cart

  logoCart.innerText = cart.filter((item) => item.quantity > 0).length


  document.querySelector("#product-container").innerHTML = productData.map((item, index) => {
    const quantity = cart.filter((element) => element.id.toString() === item.id)[0].quantity
    if (quantity === 0)
      return (
        `
      <div class="product-card" id="${item.id}">
            <img src="${item.img}"
                alt="${item.title}">
            <div class="card-info">
                <h3>${item.title}</h3>
                <h5>${item.description}</h5>
                <h4>ratings : <span>${item.ratings}</h4>
                <img src="./images/star-solid.svg" alt="start">
                <h4>Price : <span>Rs. ${item.price}</span></h4>
                <button uid="${item.id}" class="increament">Add to Cart</button>
            </div>
        </div>
    `
      )
    else
      return (
        `
      <div class="product-card" id="${item.id}">
            <img src="${item.img}"
                alt="${item.title}">
            <div class="card-info">
                <h3>${item.title}</h3>
                <h5>${item.description}</h5>
                <h4>ratings : <span>${item.ratings}</h4>
                <img src="./images/star-solid.svg" alt="start">
                <h4>Price : <span>Rs. ${item.price}</span></h4>
                <h6>Quantity:</h6>
                <div class="number-group">
                    <span uid="${item.id}" class="increament"">+</span><span>${quantity}</span><span uid="${item.id}" class="decreament" >-</span>
                </div>
            </div>
        </div>
    `
      )
  }).join('')
  const increament = document.querySelectorAll('.increament')

  increament.forEach((element) => {
    element.addEventListener('click', () => {
      addItem(element.getAttribute('uid'))
      render()
    })
  });


  const decreament = document.querySelectorAll('.decreament')
  decreament.forEach((element) => {
    element.addEventListener('click', () => {
      removeItem(element.getAttribute('uid'))
      render()
    })
  });

  const logout = document.querySelector('#logout')
  logout.addEventListener('click', () => {
    localStorage.removeItem('user')
    location.replace('./HTML/login.html')
  })

}
render()

filterItems.forEach((item) => {
  item.addEventListener('click', () => {
    setData('filter', item.getAttribute('id'))
    render()
  })
})

sortItems.forEach((item) => {
  item.addEventListener('click', () => {
    setData('sort', item.getAttribute('id'))
    render()
  })
})

slider1.addEventListener('change',()=>{
  let range=getData('range')
  range.min=slider1.value 
  setData('range',range)
  minRange.innerText=slider1.value
  render()
})

slider2.addEventListener('change',()=>{
  let range=getData('range')
  range.max=slider2.value 
  setData('range',range)
  maxRange.innerText=slider2.value
  render()
})




