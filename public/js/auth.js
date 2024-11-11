function validarToken(callback) {
    const token = localStorage.getItem('token');

    if (token) {
        $.ajax({
            url: 'http://localhost:8000/api/validate-token',
            type: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            success: function(response) {
                if (callback) callback();
            },
            error: function() {
                alert('Sessão expirada. Faça login novamente.');
                window.location.href = 'login.html';
            }
        });
    } else {
        alert('Faça login para acessar esta página.');
        window.location.href = 'login.html';
    }
}
