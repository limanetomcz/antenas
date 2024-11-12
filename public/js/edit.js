// edit.js

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const antenaId = urlParams.get('id');
    const token = localStorage.getItem('token');

    // Função para carregar os dados da antena
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

                // Exibe a foto atual, se existir
                if (data.foto) {
                    $('#fotoAtual').attr('src', `/storage/${data.foto}`);
                } else {
                    $('#fotoAtualContainer').hide();
                }
            },
            error: function() {
                alert('Erro ao carregar os dados da antena.');
                window.location.href = 'index.html';
            }
        });
    }

    carregarDadosAntena();

    // Envia os dados do formulário de edição
    $('#editAntenaForm').on('submit', function(e) {
        e.preventDefault();

        // Criando o FormData manualmente para garantir que todos os dados sejam incluídos
        const formData = new FormData();
        formData.append('descricao', $('#descricao').val());
        formData.append('longitude', $('#longitude').val());
        formData.append('latitude', $('#latitude').val());
        formData.append('uf', $('#uf').val());
        formData.append('altura', $('#altura').val());
        formData.append('data_implantacao', $('#data_implantacao').val());
        formData.append('_method', 'PUT'); // Laravel reconhece como uma atualização

        // Adiciona o arquivo de foto, se houver
        const fotoFile = $('#foto')[0].files[0];
        if (fotoFile) {
            formData.append('foto', fotoFile);
        }

        $.ajax({
            url: `http://localhost:8000/api/antenas/${antenaId}`,
            type: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                $('#updateMessage').removeClass('alert-danger').addClass('alert-success').text('Antena atualizada com sucesso!').show();
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redireciona após salvar
                }, 1500);
            },
            error: function() {
                $('#updateMessage').removeClass('alert-success').addClass('alert-danger').text('Erro ao atualizar a antena.').show();
            }
        });
    });

    // Botão "Voltar"
    $('#backButton').on('click', function() {
        window.location.href = 'index.html';
    });
});
