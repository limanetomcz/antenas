// antenaList.js

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
                "decimal": ",",
                "thousands": ".",
                "loadingRecords": "Carregando...",
                "lengthMenu": "Exibir _MENU_ registros por página",
                "zeroRecords": "Nenhum registro encontrado",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "Nenhum registro disponível",
                "infoFiltered": "(filtrado de _MAX_ registros no total)",
                "search": "Buscar:",
                "paginate": {
                    "first": "Primeiro",
                    "last": "Último",
                    "next": "Próximo",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": ativar para ordenar a coluna em ordem crescente",
                    "sortDescending": ": ativar para ordenar a coluna em ordem decrescente"
                }
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
