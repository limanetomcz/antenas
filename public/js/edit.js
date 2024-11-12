$(document).ready(function() {
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

    $('#editAntenaForm').on('submit', function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('descricao', $('#descricao').val());
        formData.append('longitude', $('#longitude').val());
        formData.append('latitude', $('#latitude').val());
        formData.append('uf', $('#uf').val());
        formData.append('altura', $('#altura').val());
        formData.append('data_implantacao', $('#data_implantacao').val());
        formData.append('_method', 'PUT'); 

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
                    window.location.href = 'index.html'; 
                }, 1500);
            },
            error: function() {
                $('#updateMessage').removeClass('alert-success').addClass('alert-danger').text('Erro ao atualizar a antena.').show();
            }
        });
    });

    $('#backButton').on('click', function() {
        window.location.href = 'index.html';
    });
});
