$(document).ready(function() {
    validarToken(carregarTabela);

    function carregarTabela() {
        const token = localStorage.getItem('token');
        
        $('#antenaTable').DataTable({
            ajax: {
                url: 'http://localhost:8000/api/antenas',
                dataSrc: '',
                headers: { 'Authorization': `Bearer ${token}` }
            },
            columns: [
                { data: 'id' },
                { data: 'descricao' },
                { data: 'longitude' },
                { data: 'latitude' },
                { data: 'uf' },
                { data: 'altura' },
                { data: 'data_implantacao' },
                { 
                    data: 'id',
                    render: function(data, type, row) {
                        return `
                            <a href="edit.html?id=${data}" class="btn btn-primary btn-sm mr-2">
                                <i class="fas fa-edit"></i> Editar
                            </a>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${data}">
                                <i class="fas fa-trash"></i> Excluir
                            </button>
                        `;
                    }
                }
            ],
            language: {
                url: "//cdn.datatables.net/plug-ins/1.11.5/i18n/Portuguese-Brasil.json"
            }
        });
    }

    $('#antenaTable').on('click', '.delete-btn', function() {
        const antenaId = $(this).data('id');
        const token = localStorage.getItem('token');
        
        if (confirm('Tem certeza que deseja remover esta antena?')) {
            $.ajax({
                url: `http://localhost:8000/api/antenas/${antenaId}`,
                type: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
                success: function(response) {
                    alert('Antena removida com sucesso!');
                    $('#antenaTable').DataTable().ajax.reload();
                },
                error: function() {
                    alert('Erro ao remover antena.');
                }
            });
        }
    });

    $('#newAntenaButton').on('click', function() {
        window.location.href = 'new.html';
    });


    $('#logoutButton').on('click', function() {
        window.location.href = 'login.html';
    });
});
