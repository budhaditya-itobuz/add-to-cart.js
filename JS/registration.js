import { registeredUser, quantity } from "../Data/data.js";
import { setData, getData } from "./helper.js";


if (!getData('registeredUser'))
    setData('registeredUser', registeredUser)

if (!getData('userCart'))
    setData('userCart', [])



const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userDataObject = Object.fromEntries(formData.entries());
    let userData = userDataObject

    let userId = ''
    for (let i = 0; i < 6; i++) {
        userId += Math.floor(Math.random() * 10)
    }
    userData.userId = userId
    if (otp === userDataObject.otp) {
        delete userData.otp
        let registeredUser = getData('registeredUser')
        registeredUser.push(userData)
        setData('registeredUser', registeredUser)

        let userCart = getData('userCart')
        userCart.push({ id: userId, cart: quantity })
        setData('userCart', userCart)
        alert("Registration Successfully done. Redirecting to login page")
        location.replace('login.html')
    }
    else
        alert('You typed wrong otp! Please try again!')
};


const verify = (e) => {
    e.preventDefault();

    const name = document.getElementById('name-input')
    const email = document.getElementById('email-input')
    otp = ""
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10)
    }
    emailjs.send("budhaditya007", "template_2hg62sa", {
        from_name: "Flipkart",
        to_name: name.value,
        email: email.value,
        reply_to: "vrv",
        otp: otp,
    });
}


let otp = ''
let userData


const form2 = document.getElementById("my-form");
form2.addEventListener('submit', onFormSubmit);



const otp_button = document.querySelector("#send-otp")
otp_button.addEventListener('click', verify)


