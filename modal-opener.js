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

	modopen.cerrarModal = function(){
		$("#" + modopen.id_modal).modal('hide');
	}
	
	modopen.offListeners = function(){
		$("#" + modopen.id_modal).off();
		$("#" + modopen.id_modal).remove();
	}
	
	modopen.iniciarListeners = function(){
		$("#" + modopen.id_modal).one("hidden.bs.modal", modopen.offListeners);
	}


	modopen.insertarYAbrirModalSeleccionEnDom = function(){
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

			modopen.iniciarListeners();
		}
	}
	
	
	modopen.print = function(){

		modopen.insertarYAbrirModalSeleccionEnDom();

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
		init: function(params){
			return modopen.iniciar(params);
		}, 

		getBody: function(){

			if(modopen.id_modal == null){
				alert('Necesitas abrir antes una modal o asignarle un ID_MODAL');
				return false;
			}

			return $("#" + modopen.id_modal + " .modal-body");
		}, 

		close: function(){
			return modopen.cerrarModal();
		}
	};


});