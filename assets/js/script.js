let listaNombresGastos = [];
let listaDescripcionesGastos = [];
let listaValoresGastos = [];
let gastoMayor = 150;

//Esta función se invoca al momento de que el usuario hace clcik en el boton Agregar
function clickBotonAgregar() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("descripcionGasto").value;
    let precioGasto = document.getElementById("precioGasto").value;
    
    //Valida los campos. Si están vacios uno de ellos o todos, manda mensaje de error, en caso contrario envía la información
    if (nombreGasto === "" || descripcionGasto === "" || precioGasto === "") {

        //Muestra mensaje para indicar que se llenen los campos
        Swal.fire({
            title: '¡Ocurrió un error!',
            text: 'Por favor, llene todos los campos.',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
        //No almacena y muestra la información con los campos incompletos
        return;
        
    } else {

        //Almacena la información de los campos a las variables listas de cada campo
        listaNombresGastos.push(nombreGasto);
        listaDescripcionesGastos.push(descripcionGasto);
        listaValoresGastos.push(precioGasto);
        
        //Muestra la información de las listas
        actualizarListaGastos();

    }
}

//Esta función se invoca al momento de que el usuario hace la acción de agregar información
function actualizarListaGastos() {

    const listaElementos = document.getElementById("listaDeGastos");

    const totalElementos = document.getElementById("totalGastos");

    let precioGasto = document.getElementById("precioGasto").value;

    let htmlLista = "";

    let totalGastos = 0;

    //Recorre la variable lista de nombres de los gastos con cada elemento y su posición para mostrar todos los gastos
    //y se usan las etiquetas ul li para ponerlas como listas
    listaNombresGastos.forEach((elemento, posicion) => {
        const precioGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];
        htmlLista += `<li>${elemento} - USD ${precioGasto.toFixed(2)}
                        <br> ${descripcionGasto}
                        <button class="editarGasto" onclick="editarGasto(${posicion});">Editar</button>
                        <button class="eliminarGasto" onclick="eliminarGasto(${posicion});">Eliminar</button>
                        </li>`;
        //Calculamos el total de gastos
        totalGastos += Number(precioGasto);
    });

    //Valida si el gasto ingresado fue mayor que 150
    if (precioGasto > gastoMayor) {

        //Muestra mensaje para indicar un gasto mayor a 150 dólares
        Swal.fire({
            title: '¡Ten cuidado!',
            text: `Se registró un gasto mayor a USD ${gastoMayor}`,
            icon: 'warning',
            confirmButtonText: 'Continuar'
        })

        listaElementos.innerHTML = htmlLista;
        totalElementos.innerHTML = totalGastos.toFixed(2);

        //Limpia todos los campos
        limpiar();

    } else {

        //Muestra mensaje para indicar que se agregó el gasto
        Swal.fire({
            title: '¡Listo!',
            text: `Gasto agregado.`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        })

        listaElementos.innerHTML = htmlLista;
        totalElementos.innerHTML = totalGastos.toFixed(2);

        //Limpia todos los campos
        limpiar();

    }

}

//Esta función se invoca al momento de que el usuario hace la acción de agregar información
function limpiar() {
    
    //Al momento de agregar la información, se elimina dicha información de los campos
    document.getElementById("nombreGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
    document.getElementById("precioGasto").value = "";

}

//Esta función se invoca al momento de que el usuario hace clcik en el boton Eliminar
function eliminarGasto(posicion) {
    
    //Elimina el gasto dependiendo de la posición en la que esté en la variable lista de cada campo
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);

    //Muestra mensaje para indicar que se eliminó un gasto
    Swal.fire({
        title: '¡Listo!',
        text: `Gasto eliminado.`,
        icon: 'success',
        confirmButtonText: 'Continuar'
    })

    //Actualiza y muestra la información de las listas
    actualizarListaGastos();

}

//Esta función se invoca al momento de que el usuario hace clcik en el boton Editar
function editarGasto(posicion) {
    
    //La información que está en el listado ahora se muestra en los campos para editarlas
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionesGastos[posicion];
    document.getElementById("precioGasto").value = listaValoresGastos[posicion];

    //Se actualiza la posición para la nueva información introducida
    nuevaPosicion = posicion;

    //Muestra el botón Editar Gasto y se oculta el botón Agregar Gasto
    mostrarBotonEditar();

}

//Esta función se invoca al momento de que el usuario hace clcik en el boton Editar Gasto
function clickBotonEditar() {

    let editarNombreGasto = document.getElementById("nombreGasto").value;
    let editarDescripcionGasto = document.getElementById("descripcionGasto").value;
    let editarPrecioGasto = document.getElementById("precioGasto").value;

    //Valida los campos. Si están vacios uno de ellos o todos, manda mensaje de error, en caso contrario envía la información
    if (editarNombreGasto === "" || editarDescripcionGasto === "" || editarPrecioGasto === "") {

        //Muestra mensaje para indicar que se llenen los campos
        Swal.fire({
            title: '¡Ocurrió un error!',
            text: `Por favor, llene todos los campos.`,
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
        //No almacena y muestra la información con los campos incompletos
        return;
        
    } else {

        //La nueva información introducida se agrega a las variables listas con la nueva posición
        listaNombresGastos[nuevaPosicion] = editarNombreGasto;
        listaDescripcionesGastos[nuevaPosicion] = editarDescripcionGasto;
        listaValoresGastos[nuevaPosicion] = editarPrecioGasto;

        //Muestra mensaje para indicar que se editó un gasto
        Swal.fire({
            title: '¡Listo!',
            text: `Gasto editado.`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        })

        //Actualiza y muestra la información de las listas
        actualizarListaGastos();

        //Muestra el botón Editar Gasto y se oculta el botón Agregar Gasto
        mostrarBotonAgregar();

    }

}

//Esta función se invoca al momento de empezar la acción de editar información
function mostrarBotonEditar() {

    //Se obtienen el control de los dos botones
    const botonAgregar = document.querySelector("#botonAgregar");
    const botonEditar = document.querySelector("#botonEditar");

    //Al botón Agregar Gasto se le añade el atributo hidden para ocultarlo
    //Al botón Editar Gasto se le quita el atributo hidden para mostrarlo
    botonAgregar.setAttribute("hidden", "");
    botonEditar.removeAttribute("hidden");

}

//Esta función se invoca al momento de finalizar la acción de editar información
function mostrarBotonAgregar() {

    //Se obtienen el control de los dos botones
    const botonAgregar = document.querySelector("#botonAgregar");
    const botonEditar = document.querySelector("#botonEditar");

    //Al botón Agregar Gasto se le quita el atributo hidden para mostrarlo
    //Al botón Editar Gasto se le añade el atributo hidden para ocultarlo
    botonAgregar.removeAttribute("hidden");
    botonEditar.setAttribute("hidden", "");

}