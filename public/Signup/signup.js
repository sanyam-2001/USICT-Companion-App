//Toggling Visibility of Show Password
$('#showPassword').on('click', () => {
    if ($('#password').attr('type') === 'password') {
        $('#password').attr('type', 'text');
    }
    else {
        $('#password').attr('type', 'password');
    }
})
//Going to Index.html
$('#signToggle').on('click', () => {
    window.open("../index.html", "_self")
})

//Signup Clicked
$('#signup-btn').on('click', () => {
    $('.loader').fadeIn()
    $('#year').removeClass('invalid');
    $('#sem').removeClass('invalid');
    $('#name').removeClass('invalid');
    $('#email').removeClass('invalid');
    $('#password').removeClass('invalid');
    $('#enrollmentNumber').removeClass('invalid');


    if ($('#name').val() === "") {
        $('#name').addClass('invalid');
        return;
    }
    if (($('#year').val() < 1 && $('#year').val() > 4) || $('#year').val() == "") {
        $('#year').addClass('invalid');
        return;
    }
    if (($('#sem').val() < 1 && $('#sem').val() > 8) || $('#sem').val() == "") {
        $('#sem').addClass('invalid');
        return;
    }
    if (!$('#branch').val()) {
        $('#branch').addClass('invalid')
        return;
    }

    else {
        attemptSignup();
    }

})

function attemptSignup() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": $("#name").val(),
        "password": $("#password").val(),
        "enrollmentNumber": $("#enrollmentNumber").val(),
        "year": $('#year').val(),
        "sem": $('#sem').val(),
        "email": $('#email').val(),
        'branch': $("#branch").val()
    });
    console.log($('#year').val())
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/users/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                localStorage.setItem('loggedInUser', result.response.id)
            }
            else {
                console.log(result)
                if (result.code === 1) {
                    $('#email').addClass('invalid')
                }
                if (result.code === 2) {
                    $('#password').addClass('invalid')
                }
                if (result.code === 11000) {
                    $('#enrollmentNumber').addClass('invalid')
                }
            }
            $('.loader').fadeOut()
        })
        .catch(error => console.log('error', error));
}


