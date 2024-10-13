const crearEtiqueta = (nombre = null, atributos = {}, contenido = "") => {

    if (!nombre){
        return;
    }

    let etiqueta = document.createElement(nombre);

    for (const atributo in atributos) {
        etiqueta.setAttribute(atributo, atributos[atributo]);
    }

    if (contenido){
        etiqueta.innerText = contenido;
    }

    return etiqueta;
};

export { crearEtiqueta };