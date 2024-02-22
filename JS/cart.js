import { quantity } from "../Data/data.js"
import { getData,addItem,removeItem } from "./helper.js"

const logoCart=document.getElementById('cart-logo')

const render =()=>{

  let productData=getData('product')
  let userCart=getData('userCart')
  const userId=getData('user')
  let cart=userCart.filter((item)=> item.id === userId)[0].cart

  logoCart.innerText=cart.filter((item)=>item.quantity>0).length


  document.querySelector(".container").innerHTML=productData.map((item,index)=>{


    if(cart[index].quantity!=0)
    return(
      `
      <div class="cart-card">
            <div class="card-info">
            <div>
            <div class="card-img">
                <img src="${item.img}" alt="">
            </div>
            <div>
                <h4>${item.title}</h4>
                <h5>Rs. ${item.price}</h5>
            </div>
        </div>
                <div>
                    <h4>Total price</h4>
                    <h5>Rs. ${item.price*cart[index].quantity}</h5>
                </div>
            </div>
            <div class="number-group">
            <span id="decreament-btn" uid="${item.id}" >-</span><span>${cart[index].quantity}</span><span uid="${item.id}" id="increament-btn" >+</span>
            </div>
        </div>
    `
            )
    }).join('')
    const removeBtn=document.getElementById("decreament-btn")
    const addBtn=document.getElementById("increament-btn")

    addBtn.addEventListener('click', () => { 
        addItem(addBtn.getAttribute('uid')) 
        render()
  
      })
    removeBtn.addEventListener('click', () => { 
    removeItem(removeBtn.getAttribute('uid')) 
    render()
    })

    const logout=document.querySelector('#logout')
    logout.addEventListener('click',()=>{
    localStorage.removeItem('user')
    location.replace('login.html')
  })
    
}
render()