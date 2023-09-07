var carrito = [];
var total = 0;

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;

    mostrarCarrito();
    
    guardarCarritoEnLocalStorage();
}

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

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
}

function cargarCarritoDesdeLocalStorage() {
    var carritoGuardado = localStorage.getItem('carrito');
    var totalGuardado = localStorage.getItem('total');

    if (carritoGuardado && totalGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseFloat(totalGuardado);
        mostrarCarrito();
    }
}

var buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        var producto = button.getAttribute('data-producto');
        var precio = parseFloat(button.getAttribute('data-precio'));
        agregarAlCarrito(producto, precio);
    });
});

cargarCarritoDesdeLocalStorage();


