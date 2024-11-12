// new.js

$(document).ready(function() {
    validarToken(inicializarFormulario);

    function inicializarFormulario() {
        $('#createAntenaForm').on('submit', function(e) {
            e.preventDefault();

            const token = localStorage.getItem('token');
            const formData = new FormData(this);

            // Inclui outros dados do formulário manualmente
            formData.append('descricao', $('#descricao').val());
            formData.append('longitude', $('#longitude').val());
            formData.append('latitude', $('#latitude').val());
            formData.append('uf', $('#uf').val());
            formData.append('altura', $('#altura').val());
            formData.append('data_implantacao', $('#data_implantacao').val());

            $.ajax({
                url: 'http://localhost:8000/api/antenas',
                type: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: formData,
                processData: false, // Impede o jQuery de processar o data
                contentType: false, // Deixa o contentType como undefined, necessário para o envio de FormData
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

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
