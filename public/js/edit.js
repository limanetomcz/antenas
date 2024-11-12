$(document).ready(function() {

    validarToken(inicializarFormulario);

    function inicializarFormulario() {
        const urlParams = new URLSearchParams(window.location.search);
        const antenaId = urlParams.get('id');
        const token = localStorage.getItem('token');

        function carregarDadosAntena() {
            $.ajax({
                url: `http://localhost:8000/api/antenas/${antenaId}`,
                type: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
                success: function(data) {
                    $('#descricao').val(data.descricao);
                    $('#longitude').val(data.longitude);
                    $('#latitude').val(data.latitude);
                    $('#uf').val(data.uf);
                    $('#altura').val(data.altura);
                    $('#data_implantacao').val(data.data_implantacao);
                },
                error: function() {
                    alert('Erro ao carregar os dados da antena.');
                    window.location.href = 'index.html';
                }
            });
        }

        carregarDadosAntena();

        $('#editAntenaForm').on('submit', function(e) {
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
                url: `http://localhost:8000/api/antenas/${antenaId}`,
                type: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(antenaData),
                success: function() {
                    $('#updateMessage').removeClass('alert-danger').addClass('alert-success').text('Antena atualizada com sucesso!').show();
                },
                error: function() {
                    $('#updateMessage').removeClass('alert-success').addClass('alert-danger').text('Erro ao atualizar a antena.').show();
                }
            });
        });
    }

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});