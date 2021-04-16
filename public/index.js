//Toggling the Visibility of Password Type
$('#showPassword').on('click', () => {
    if ($('#password').attr('type') === 'password') {
        $('#password').attr('type', 'text');
    }
    else {
        $('#password').attr('type', 'password');
    }
})
//Log In Button Clicked
$('#login-btn').on('click', () => {
    $('.loader').fadeIn();
    $('#password').removeClass('invalid')
    $('#enrollmentNumber').removeClass('invalid')
    attemptLogin();
})

function attemptLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "password": document.getElementById('password').value,
        "enrollmentNumber": document.getElementById('enrollmentNumber').value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/users/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                localStorage.setItem('loggedInUser', result.response.id)
            }
            else {
                if (result.response.message === "Incorrect Password") {
                    $('#password').addClass('invalid');
                }
                else {
                    $('#enrollmentNumber').addClass('invalid')
                }
            }
            $('.loader').fadeOut();

        })
        .catch(error => console.log('error', error));
}


//Going to Signup.html
$('#signToggle').on('click', () => {
    window.open("./Signup/signup.html", "_self")
})


