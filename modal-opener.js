define(['jquery', 
		'mustache',
		"bootstrap/modal", 
		
		"text!modal-opener/view/modal.mustache"
		], 
		function($, 
		Mustache, 
		modal, 
		
		tmpl_modal){
								
	var modopen = {};

	modopen.title = null;
	modopen.id_modal = null;
	modopen.fade_effect = null;
	modopen.afterOpened = null;

	modopen.cerrar_modal = function(){
		$("#" + modopen.id_modal).modal('hide');
	}
	
	modopen.off_listeners = function(){
		$("#" + modopen.id_modal).off();
		$("#" + modopen.id_modal).remove();
	}
	
	modopen.iniciar_listeners = function(){
		$("#" + modopen.id_modal).one("hidden.bs.modal", modopen.off_listeners);
	}


	modopen.insertar_y_abrir_modal_seleccion_en_dom = function(){
		if(!$("#" + modopen.id_modal).length){
			var data = {
				title: modopen.title, 
				id_modal: modopen.id_modal, 
				fade_effect: modopen.fade_effect
			};

			var plantilla = Mustache.render(tmpl_modal, data, {});
			$("body").append(plantilla);

			$("#" + modopen.id_modal).modal({
				keyboard: true, 
				show: true, 
				backdrop: modopen.backdrop_static
			});

			modopen.iniciar_listeners();
		}
	}
	
	
	modopen.print = function(){

		modopen.insertar_y_abrir_modal_seleccion_en_dom();

		$("#" + modopen.id_modal).one("shown.bs.modal", function(e){
			if(modopen.afterOpened != null){
				modopen.afterOpened();
			}
		});		

	}
	
	modopen.iniciar = function(params){
		modopen.title = null;
		modopen.id_modal = null;
		modopen.fade_effect = null;
		modopen.afterOpened = null;
		modopen.backdrop_static = null;

		if(params == null){
			alert('Declara los parametros necesarios');
			return false;
		}


		modopen.title = ((params.title != null) ? params.title : "");
		modopen.id_modal = ((params.id_modal != null) ? params.id_modal : "");
		modopen.fade_effect = ((params.fade_effect != null) ? params.fade_effect = 1 : 0);
		modopen.backdrop_static = ((params.backdrop_static == null || !params.backdrop_static) ? params.backdrop_static = true : 'static');

		modopen.afterOpened = ((params.afterOpened != null) ? params.afterOpened : null);

		modopen.print();
	}
	
	return {
		iniciar: function(params){
			return modopen.iniciar(params);
		}, 

		getBody: function(){

			if(modopen.id_modal == null){
				alert('Necesitas abrir antes una modal o asignarle un ID_MODAL');
				return false;
			}

			return $("#" + modopen.id_modal + " .modal-body");
		}, 

		cerrar: function(){
			return modopen.cerrar_modal();
		}
	};


	/*
	modal-opener.js 

	iniciar(params)
	params = {
		title: string optional (titulo que se mostrara en la modal), 
		id_modal: string required (el id html que identificara la modal), 
		fade_effect: boolean, optional (un efecto animado al mostrarse y cerrarse), 
		modopen.backdrop_static: booleen, optional (si se activa, no se puede cerrar la modal pinchando en el fondo)
		afterOpened: function optional (un callback de lo que debe hacer tras abrirse la modal)
	}

	getBody()
	Devuelve el elemento jQuery correspondiente al nodo del cuerpo de la modal, 

	cerrar()
	Cierra la ventana modal

	*/


});