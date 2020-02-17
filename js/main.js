const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
      yearExpiracion = document.querySelector('#tarjeta .year'),
      cvv = document.querySelector('#tarjeta .cvv');

// Volteamos la tarjeta si el usuario esta tecleando algo y la tarjeta esta por el reverso
const mostrarFrente = function() {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}

// Volteamos la tarjeta si el usuario esta tecleando algo y la tarjeta esta por el reverso
const mostrarTrasera = function() {
    tarjeta.classList.add('active');
}

// Giro 180 deg de la tarjeta con un click
tarjeta.addEventListener('click', function() {
    tarjeta.classList.toggle('active');
});

//Giro 45 deg del boton de abrir formulario
btnAbrirFormulario.addEventListener('click', function() {
    btnAbrirFormulario.classList.toggle('active');

    // Desplegar el formulario hacia abajo haciendo click en el boton de abrir formulario
    formulario.classList.toggle('active');
});

// Select del mes generado dinámicamente

for(let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion); 
}
    
// Select del año generado dinámicamente
const yearActual = new Date().getFullYear();

for(let i = yearActual; i <= yearActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', function(e) {
   let valorImput = e.target.value;

   formulario.inputNumero.value = valorImput

   // Eliminamos espacios en blanco
   .replace(/\s/g, '')

   // Eliminar las letras
   .replace(/\D/g, '')

   // Ponemos espacios cada 4 numeros
   .replace(/([0-9]{4})/g, '$1 ')

   // Quitamos el ultimo espaciado
   .trim();
    
   numeroTarjeta.textContent = valorImput;

   if (valorImput == '') {
       numeroTarjeta.textContent = 'XXXX XXXX XXXX XXXX';

       logoMarca.innerHTML = '';
   }

   if (valorImput[0] == 4) {
       logoMarca.innerHTML = '';
       const image = document.createElement('img');
       image.src = 'img/logos/visa.png';
       logoMarca.appendChild(image);
   } else if(valorImput[0] == 5){
        logoMarca.innerHTML = '';
        const image = document.createElement('img');
        image.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(image);
   }

   // Ejecutar function volteamos la tarjeta si el usuario esta tecleando nombre o numero de tarjeta y la tarjeta esta por el reverso
   mostrarFrente();
});

// Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', function(e) {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput; 
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();
});

// Select del mes
formulario.selectMes.addEventListener('change', function(e) {
    mesExpiracion.textContent = e.target.value;

    mostrarFrente();
});

// Select del mes
formulario.selectYear.addEventListener('change', function(e) {
    yearExpiracion.textContent = e.target.value.slice(2);

    mostrarFrente();
});

// Input CVV
formulario.inputCvv.addEventListener('keyup', function(e) {
    cvv.textContent = e.target.value;

    formulario.inputCvv.value = formulario.inputCvv.value
    // Eliminar los espacios
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '');

    // Ejecutar function volteamos la tarjeta si el usuario esta tecleando cvv y la tarjeta esta por el reverso
   mostrarTrasera();
});