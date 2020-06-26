$(function () {
	cargar_primeros_episodios ();
	
	$('#tabla-episodios').DataTable({
		initComplete: function(){
			nuevo_buscar();
		},
		ajax: {
			url: 'https://rickandmortyapi.com/api/episode/[1,2,3,4,5,6,7,8,9]',
			type: 'GET',
			data:function(dtp){
				
			},
			dataSrc: function (episodios) {
				for (let i=0; i < episodios.length; i++ ) {
					let personajes = episodios[i].characters;
					let personajes_formateados = pinta_ids_personajes (personajes);
					
					episodios[i]['characters'] = personajes_formateados;
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
		dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
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
	
	html +=	'<div class="col s12">' +
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

//Búsqueda genérica sobre elementos que no se encuentran en la tabla
function nuevo_buscar(){
	$("#tabla-episodios_filter input[type='search']").off();
    
	$("#tabla-episodios_filter input[type='search']").on("keydown", function(evt){
		if(evt.keyCode == 13){
			$.ajax({
				url: "https://rickandmortyapi.com/api/episode/",
				type: 'GET',
				dataType: 'json',
				success: function(respuesta){
					let busqueda = $("#tabla-episodios_filter input[type='search']").val().toLowerCase();
					let tabla = $('#tabla-episodios').DataTable();
					let episodios = respuesta.results;
					
					episodios.forEach(function (episodio) {
						let personajes = episodio.characters;
						
						episodio.characters = pinta_ids_personajes (personajes);
					});
					
					let episodios_filtrados = episodios.filter(
						x => x.id.toString().includes(busqueda) || x.name.toLowerCase().includes(busqueda) ||
							x.air_date.toLowerCase().includes(busqueda) || x.episode.toLowerCase().includes(busqueda) ||
							x.characters.toLowerCase().includes(busqueda) || x.url.toLowerCase().includes(busqueda) ||
							x.created.toLowerCase().includes(busqueda)
					);
					
					tabla.rows().remove();
					tabla.rows.add(episodios_filtrados);
					tabla.draw();
				},
				error: function (error) {
					console.log(error);
				}
			});
		
			//$("#tabla-episodios").DataTable().search($("input[type='search']").val()).draw();
			//$('#tabla-episodios').DataTable().ajax.url(url).load();
		}
	});
}

//Recorre el array de personajes para quedarse tan solo con las ids y devolverlas en un string
function pinta_ids_personajes (personajes) {
	let personajes_formateados = '';
	
	personajes.forEach(function (personaje) {
		personajes_formateados += personaje.replace('https://rickandmortyapi.com/api/character/', '') + ', ';
	});
	
	return personajes_formateados.substring(0, personajes_formateados.length - 2);
}
 
function busca_por_rango_id_capitulo () {

}