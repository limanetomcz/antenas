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
                    data: 'foto',
                    render: function(data, type, row) {
                        if (data) {
                            return `<a href="#" class="ver-foto-link" data-foto="/storage/${data}">Ver Foto</a>`;
                        } else {
                            return "Sem Foto";
                        }
                    }
                },
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
                "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/Portuguese-Brasil.json"
            }
        });
    }

    // Evento para abrir o modal com a foto
    $('#antenaTable').on('click', '.ver-foto-link', function(e) {
        e.preventDefault();

        const fotoUrl = $(this).data('foto');
        
        // Configura a URL da imagem no modal e exibe o modal
        $('#fotoModalImage').attr('src', fotoUrl);
        $('#fotoModal').modal('show');
    });

    $('#newAntenaButton').on('click', function() {
        window.location.href = 'new.html';
    });

    $('#logoutButton').on('click', function() {
        window.location.href = 'login.html';
    });
});
