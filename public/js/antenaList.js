$(document).ready(function() {
    validarToken(inicializarAplicacao);

    function inicializarAplicacao() {
        carregarRanking();
        carregarTabela();
    }

    function carregarRanking() {
        const token = localStorage.getItem('token');
        
        $.ajax({
            url: 'http://localhost:8000/api/dash-ranking',
            type: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            success: function(data) {
                const rankingContainer = $('#rankingContainer');
                rankingContainer.empty(); 

                data.forEach((item, index) => {
                    rankingContainer.append(`
                        <div class="col-md-2">
                            <div class="card mb-2">
                                <div class="card-body text-center">
                                    <h6 class="card-title">${index + 1}º - ${item.uf}</h6>
                                    <p class="card-text">${item.quantidade} Antenas</p>
                                </div>
                            </div>
                        </div>
                    `);
                });
            },
            error: function() {
                alert('Erro ao carregar o ranking de UFs.');
            }
        });
    }

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
                        const verFotoLink = data ? `<a href="#" class="ver-foto-link" data-foto="/storage/${data}">Ver Foto</a>` : "Sem Foto";
                        const verMapaLink = `<a href="#" class="ver-mapa-link" data-lat="${row.latitude}" data-lng="${row.longitude}">Ver Mapa</a>`;
                        return `${verFotoLink} | ${verMapaLink}`;
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
        });
    }

    $('#antenaTable').on('click', '.delete-btn', function(e) {
        e.preventDefault();

        const antenaId = $(this).data('id');
        const token = localStorage.getItem('token');

        if (confirm('Tem certeza que deseja excluir esta antena?')) {
            $.ajax({
                url: `http://localhost:8000/api/antenas/${antenaId}`,
                type: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
                success: function() {
                    alert('Antena excluída com sucesso!');
                    $('#antenaTable').DataTable().ajax.reload(); 
                    carregarRanking();
                },
                error: function() {
                    alert('Erro ao excluir a antena.');
                }
            });
        }
    });

    $('#antenaTable').on('click', '.ver-foto-link', function(e) {
        e.preventDefault();

        const fotoUrl = $(this).data('foto');
        
        $('#fotoModalImage').attr('src', fotoUrl);
        $('#fotoModal').modal('show');
    });

    $('#antenaTable').on('click', '.ver-mapa-link', function(e) {
        e.preventDefault();
        
        const lat = $(this).data('lat');
        const lng = $(this).data('lng');

        $('#mapModal').modal('show');

        $('#mapModal').on('shown.bs.modal', function () {
            const map = L.map('mapContainer').setView([lat, lng], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap'
            }).addTo(map);

              L.marker([lat, lng]).addTo(map)
                .bindPopup("Localização da Antena")
                .openPopup();

            $('#mapModal').on('hidden.bs.modal', function() {
                map.remove();
            });
        });
    });

    $('#newAntenaButton').on('click', function() {
        window.location.href = 'new.html';
    });

    $('#logoutButton').on('click', function() {
        window.location.href = 'login.html';
    });
});
