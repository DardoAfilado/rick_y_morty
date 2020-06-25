$(function () {
	cargar_primeros_episodios ();
	
	$('#tabla-episodios').DataTable({
		ajax: {
			url: 'https://rickandmortyapi.com/api/episode/[1,2,3,4,5,6,7,8,9]',
			dataSrc: function (episodios) {
				for (let i=0; i < episodios.length; i++ ) {
					let personajes = episodios[i].characters;
					let personajes_formateados = '';
					
					personajes.forEach(function (personaje) {
						personajes_formateados += personaje.replace('https://rickandmortyapi.com/api/character/', '') + ', ';
					});
					
					episodios[i]['characters'] = personajes_formateados.substring(0, personajes_formateados.length - 2);
				}
				
				return episodios;
			}
		},
		columns: [
            { "data": "id" },
            { "data": "name" },
            { "data": "air_date" },
            { "data": "episode" },
            { "data": "characters" },
			{ "data": "url" },
			{ "data": "created" }
        ],
		buttons: [ {
            extend: 'excelHtml5',
            autoFilter: true,
            sheetName: 'Exported data'
        } ]
	});
});

//Obtiene de la API los 10 primeros episodios para inyectarlos en el DOM en forma de card
function cargar_primeros_episodios () {
	$.ajax({
		url: "https://rickandmortyapi.com/api/episode/[1,2,3,4,5,6,7,8,9]",
		type: 'GET',
		dataType: 'json',
		success: function(episodios){
			let html_tarjetas = '<div class="row">';
			let contador = 1;
			let contenedor_tarjetas = $('#contenedor-episodios-tarjetas');
			
			episodios.forEach(function (episodio) {
				if (contador % 3 === 0) {
					html_tarjetas += obten_html_tarjeta_episodio(episodio);
					html_tarjetas += '</div>';
					html_tarjetas += '<div class="row">';
				}
				else {
					html_tarjetas += obten_html_tarjeta_episodio(episodio);
				}
				
				contador++;
			});
			
			contenedor_tarjetas.html(html_tarjetas);
		},
		error: function (error) {
			console.log(error);
		}
	});
}

//Construye a través de un episodio de la API el HTML de una tarjeta
function obten_html_tarjeta_episodio (episodio) {
	let html = '';
	
	html +=	'<div class="col s6">' +
				'<div class="card">' +
					'<div class="card-image">' +
						'<img src="/rick_y_morty/public/img/cabecera-tarjeta.jpg">' +
						'<span class="card-title sombreado-negro">' + episodio.name + '</span>' +
					'</div>' +
					'<div class="card-content">' +
						'<p>'+ episodio.air_date + '</p>' +
						'<p>Wubba lubba dub-dub!!!</p>' +
					'</div>' +
					'<div class="card-action">' +
						'<a href="' + episodio.url + '" target="_blank">Enlace a JSON del episodio</a>' +
					'</div>' +
				'</div>' +
			'</div>';
  
	return html;
}