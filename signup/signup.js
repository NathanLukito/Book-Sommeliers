$(document).ready(function(){
    let password = document.querySelector("#password-field");
    let strengthBar = document.querySelector("#strength-bar");
    let strengthText = document.querySelector(".strength-text");

    function setStrength(value){
        strengthBar.style.width = value + "%";
    }

    function setColorAndText(color, text){
        $("#strength-bar").css("background-color", color)
        strengthText.innerHTML = text;
        $(".strength-text").css("color", color)

    }

    function clearStrength(){
        strengthBar.style.width = 0 + "%";
        $(".strength-bar").css("background-color", "")
        strengthText.innerHTML = "";

    }

    password.addEventListener("keyup", checkPasswordStrength);

    function checkPasswordStrength(){
        let strength = 0;

        if(password.value == ""){
            clearStrength();
            return false;
        }

        if(password.value.match(/\s/)){
            setColorAndText("red", "White space is not allowed");
            return false;
        }

        if(password.value.match(/<|>/)){
            setColorAndText("red", "< > characters are not allowed");
            return false;
        }

        if(password.value.length > 15){
            setColorAndText("red", "Password is greater than 15 characters");
            return false;
        }

        if(password.value.length < 7){
            strength = 20;
            setColorAndText("red", "Password is too short");
        }else{
            let lowerCase = password.value.match(/[a-z]/);
            let upperCase = password.value.match(/[A-Z]/);
            let numbers = password.value.match(/[0-9]/);
            let specialCharacters = password.value.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);

            //Weak password
            if(lowerCase || upperCase || numbers || specialCharacters)
            {
                strength = 40;
                setColorAndText("red", "Weak");
            }

            //Medium password
            if( 
                (lowerCase && upperCase) || (lowerCase && numbers) || (lowerCase && specialCharacters) ||
                (upperCase && numbers) || (upperCase && specialCharacters) || (numbers && specialCharacters)
            )

            {
                strength = 60;
                setColorAndText("orange", "Medium");
            }

            //Strong password
            if(
                (lowerCase && upperCase && numbers) || (lowerCase && upperCase && specialCharacters) ||
                (lowerCase && numbers && specialCharacters) || (upperCase && numbers && specialCharacters)
            )
            {
                strength = 80;
                setColorAndText("#088f08", "Strong");
            }

            //Very strong password
            if(
                (lowerCase && upperCase && numbers && specialCharacters)
            )
            {
                strength = 100;
                setColorAndText("green", "Very Strong");
            }
        }

        setStrength(strength);
    }



    document.querySelector("#Username").addEventListener("focus", function(){
        setWidthUsername(100)
    })

    document.querySelector("#Username").addEventListener("blur", function(){
        setWidthUsername(0)
    })

    document.querySelector("#Email").addEventListener("focus", function(){
        setWidthEmail(100)
    })

    document.querySelector("#Email").addEventListener("blur", function(){
        setWidthEmail(0)
    })

    document.querySelector("#password-field").addEventListener("focus", function(){
        setWidthPassword(100)
    })

    document.querySelector("#password-field").addEventListener("blur", function(){
        setWidthPassword(0)
    })



    function setWidthUsername(value){
        document.querySelector(".bottom-border-username").style.width = value + "%";
        document.querySelector(".bottom-border-username").style.backgroundColor = "rgba(27,185,157,255)"
    }

    function setWidthEmail(value){
        document.querySelector(".bottom-border-email").style.width = value + "%";
        document.querySelector(".bottom-border-email").style.backgroundColor = "rgba(27,185,157,255)"
    }

    function setWidthPassword(value){
        document.querySelector(".bottom-border-password").style.width = value + "%";
        document.querySelector(".bottom-border-password").style.backgroundColor = "rgba(27,185,157,255)"
    }

    async function CreateUser(userData){
        const APIKEY = "63b3e1aa969f06502871a8c1"
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nathaninteractivedev-4002.restdb.io/rest/userdata",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(userData)
        }

        $.ajax(settings).done(function (response){
        })
    }

    $(".login-btn").click(function(){
        event.preventDefault()
        let userlist = JSON.parse(localStorage.getItem("userlist"))
        const ids = userlist.map(object => {
            return object.UserID;
          });
        const max = Math.max(...ids) + 1
        let username = $("#Username").val();
        let pass = $("#password-field").val();
        let email = $("#Email").val();
    
        if(email == ""|| pass == ""|| username == ""){
            alert("Please fill up all of the fields!")
        }

        else{
            let jsonUserData = {
                "UserID": max,
                "Username": username,
                "Password": pass,
                "Email": email,
                "Usertype": "user",
                "Datejoin": Date.now(),
                "Likes": 0,
                "Profilepic": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                "Liked": [],
                "Publish": []
            }
    
            CreateUser(jsonUserData)
            
            localStorage.setItem("user", JSON.stringify(jsonUserData))
            document.querySelector("#form").reset();
            document.querySelector(".login-btn").setAttribute("value", "Signing up...")  
            document.querySelector(".login-btn").style.backgroundColor = "rgba(27,185,157,0.6)"
            setTimeout(function(){
                window.location.href = "/index.html"
            },1000)
        }
    })
})