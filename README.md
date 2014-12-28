bsmodalOpener
=============

Un módulo AMD para abrir ventanas modales. Dependiente de Bootstrap, jQuery y MustacheJS 


Documentación
=============

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
