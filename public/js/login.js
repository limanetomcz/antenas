$(document).ready(function() {

    localStorage.setItem('token', '');

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8000/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    alert('Login bem-sucedido!');
                    location.href = 'index.html'; 
                }
            },
            error: function() {
                $('#loginError').show();
            }
        });
    });
});
