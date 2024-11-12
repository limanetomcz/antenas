$(document).ready(function () {

    carregarEstados();
    function carregarEstados() {
        $.ajax({
            url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
            type: 'GET',
            success: function (estados) {
                const ufSelect = $('#uf');
                estados.sort((a, b) => a.sigla.localeCompare(b.sigla));

                estados.forEach(estado => {
                    ufSelect.append(new Option(`${estado.sigla} - ${estado.nome}`, estado.sigla));
                });
            },
            error: function () {
                alert('Erro ao carregar a lista de estados.');
            }
        });
    }
});