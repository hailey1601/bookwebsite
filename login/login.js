document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let email_phone = document.querySelector("input[placeholder='Email/Số điện thoại']").value;
    let signIn_password = document.querySelector("input[placeholder='Mật khẩu']").value;
    let rememberMe = document.querySelector(".terms-container input[type='checkbox']").checked;

    let userData = JSON.parse(localStorage.getItem("listUser"));
    if (checkUser(userData, email_phone, signIn_password)) {
        alert("Login successful!");
        let currentUserName = ""
        for (let i = 0; i < userData.length; i++) { 
            if (userData[i].emailOrPhone == email_phone) {
                currentUserName = userData[i].username
            }
        }
        localStorage.setItem('isLoggedIn', JSON.stringify({email_phone, signIn_password, currentUserName}));
    } else {
        alert("Login failed!")
    }

    if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify([{ email_phone, signIn_password }]));
    } else {
        localStorage.removeItem("rememberedUser");
    }

    window.location.href = "../dashboard/db.html";
});

window.addEventListener("load", function () {
    let rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
        document.querySelector("input[placeholder='Email/Số điện thoại']").value = rememberedUser.email_phone;
    }
});

function checkUser(listUser, email_phone, signIn_password) {
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].emailOrPhone == email_phone && listUser[i].password == signIn_password) {
            return true
        }
    }
    return false
}

