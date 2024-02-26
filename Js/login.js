import { getData, setData, enums } from "./helper.js";


if (!getData(enums.registeredUser))
    setData(enums.registeredUser, [])

const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userLoginObject = Object.fromEntries(formData.entries());
    const registeredUser = getData(enums.registeredUser)
    let isregistered = false

    for (let i = 0; i < registeredUser.length; i++) {
        if (registeredUser[i].email === userLoginObject.email) {
            isregistered = true
            if (registeredUser[i].password === userLoginObject.password) {
                setData(enums.user, registeredUser[i].userId)
                location.replace('../index.html')
            }
            else
                alert('wrong password')
            break
        }
    }
    if (!isregistered) {
        alert('You are not registered! please proceed to registration')
        location.replace('registration.html')
    }
};

const form2 = document.getElementById("my-form");
form2.addEventListener('submit', onFormSubmit);
