// app.js (JavaScript separado)
var carrito = [];
var total = 0;

// Función para agregar un producto al carrito
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;

    // Actualizar el carrito en el DOM
    mostrarCarrito();
    
    // Guardar el carrito en el almacenamiento local
    guardarCarritoEnLocalStorage();
}

//Funcion que elimina el produccto del carrito
function eliminarDelCarrito(index) {
    var productoEliminado = carrito.splice(index, 1)[0];
    total -= productoEliminado.precio;

    mostrarCarrito();
    
    guardarCarritoEnLocalStorage();
}

function mostrarCarrito() {
    var carritoLista = document.getElementById('carrito');
    var totalSpan = document.getElementById('total');

    carritoLista.innerHTML = '';
    totalSpan.textContent = total.toFixed(2);

    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        var listItem = document.createElement('li');
        listItem.textContent = item.producto + ' - $' + item.precio.toFixed(2);
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        deleteButton.addEventListener('click', function(index) {
            return function() {
                eliminarDelCarrito(index);
            };
        }(i)); 
        listItem.appendChild(deleteButton);
        carritoLista.appendChild(listItem);
    }
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocalStorage() {
    var carritoGuardado = localStorage.getItem('carrito');
    var totalGuardado = localStorage.getItem('total');

    if (carritoGuardado && totalGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseFloat(totalGuardado);
        mostrarCarrito();
    }
}

// Asociar funciones a los botones utilizando eventos
var buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var producto = button.getAttribute('data-producto');
        var precio = parseFloat(button.getAttribute('data-precio'));
        agregarAlCarrito(producto, precio);
    });
});

// Cargar el carrito desde el almacenamiento local al cargar la página
cargarCarritoDesdeLocalStorage();


