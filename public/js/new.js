$(document).ready(function() {

    validarToken(inicializarFormulario);

    function inicializarFormulario() {
        const token = localStorage.getItem('token');

        $('#createAntenaForm').on('submit', function(e) {
            e.preventDefault();

            const antenaData = {
                descricao: $('#descricao').val(),
                longitude: $('#longitude').val(),
                latitude: $('#latitude').val(),
                uf: $('#uf').val(),
                altura: $('#altura').val(),
                data_implantacao: $('#data_implantacao').val()
            };

            $.ajax({
                url: 'http://localhost:8000/api/antenas',
                type: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(antenaData),
                success: function() {
                    $('#createMessage').removeClass('alert-danger').addClass('alert-success').text('Antena criada com sucesso!').show();
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 1500);
                },
                error: function() {
                    $('#createMessage').removeClass('alert-success').addClass('alert-danger').text('Erro ao criar a antena.').show();
                }
            });
        });
    }
});
