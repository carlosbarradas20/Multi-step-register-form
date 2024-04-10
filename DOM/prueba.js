// Selección de elementos del DOM
const formContainer = document.querySelector('.formContainer');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const continueButton = document.querySelector('button');
const title = document.querySelector('.registrer');
const stepText = document.querySelector('.proceso');
const options = document.querySelectorAll('.inactive');
const option1 = document.querySelector('.opcion1');
const option2 = document.querySelector('.opcion2');
const option3 = document.querySelector('.opcion3');
const stepsContainer = document.querySelector('.steps');
const step1 = document.querySelector('.one');
const step2 = document.querySelector('.two');
const step3 = document.querySelector('.tree');
const nameResult = document.querySelector('.name');
const emailResult = document.querySelector('.email');
const topics = document.querySelector('.topics');

// Función para manejar el clic en las opciones de tema
function handleOptionClick() {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        this.classList.add('activeStyle');
    } else {
        setTimeout(() => {
            this.classList.remove('activeStyle');
        }, 50);
    }
    obtenerValoresSeleccionados();
}

// Función para obtener los valores de las opciones seleccionadas
function obtenerValoresSeleccionados() {
    let valoresSeleccionados = [];
    options.forEach(function(opcion) {
        if (opcion.classList.contains('active')) {
            valoresSeleccionados.push(opcion.getAttribute('value'));
        }
    });
    return valoresSeleccionados;
}

// Función para manejar el envío del formulario
function handleFormSubmission(event) {
    event.preventDefault();
    if (nameInput.value && emailInput.value) {
        console.log(`Nombre: ${nameInput.value}, Email: ${emailInput.value}`);
        option1.classList.remove('inactive');
        option2.classList.remove('inactive');
        option3.classList.remove('inactive');
        formContainer.innerHTML = '';
        showStep2();
    } else {
        console.log('Por favor, rellena todos los campos requeridos.');
        continueButton.setAttribute("disabled", true);
    }
}

// Función para mostrar el segundo paso
function showStep2() {
    title.innerText = '¿En qué temas estás interesado?';
    title.style.marginBottom = "30px";
    stepText.textContent = 'Paso 2 de 3';
    stepsContainer.style.flexDirection = "row-reverse";
    formContainer.append(title, option1, option2, option3);
    stepsContainer.appendChild(stepText);
    step3.classList.remove('stepActive');
    step3.classList.add('stepCompleted');
    step2.classList.add('stepActive');
    step1.classList.remove('stepActive');

    options.forEach(function(opcion) {
        opcion.addEventListener('click', handleOptionClick);
    });

    continueButton.innerText = 'Continuar';
    continueButton.addEventListener('click', function(event) {
        event.preventDefault();
        obtenerValoresSeleccionados();
        showStep3();
        console.log('Selecciona al menos un interés');
    });
    formContainer.appendChild(continueButton);
}

// Función para mostrar el tercer paso
function showStep3() {
    options.forEach(function(opcion) {
        opcion.removeEventListener('click', handleOptionClick);
    });
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    formContainer.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Resumen';
    const div = document.createElement('div');
    div.classList.add('contenedor');
    const nameH2 = document.createElement('h2');
    nameH2.textContent = 'Nombre:  ';
    nameH2.classList.add('nameH2');

    const responseName = document.createElement('p');
    responseName.textContent = nameValue;
    responseName.classList.add('responseName');
    nameH2.appendChild(responseName);
    div.appendChild(nameH2);
    const emailH2 = document.createElement('h2');
    emailH2.textContent = 'Email:  ';
    emailH2.classList.add('emailH2');

    const responseEmail = document.createElement('p');
    responseEmail.textContent = emailValue;
    responseEmail.classList.add('responseEmail');
    emailH2.appendChild(responseEmail);
    div.appendChild(emailH2);
    const valoresSeleccionados = obtenerValoresSeleccionados();
    const listaIntereses = document.createElement('ul');

    valoresSeleccionados.forEach(function(elemento) {
        const itemLista = document.createElement('li');
        itemLista.textContent =  elemento;
        listaIntereses.appendChild(itemLista);
    });
    topics.classList.remove('inactive');
    topics.appendChild(listaIntereses);
    const stepEnd = document.createElement('button');
    stepEnd.innerText = 'Confirmar';
    stepEnd.classList.add('buttonEnd');
    stepEnd.addEventListener('click', function() {
        alert('✅ Éxito');
    });

    div.appendChild(topics);
    stepText.textContent = 'Paso 3 de 3';
    stepsContainer.style.flexDirection = "row-reverse";
    step3.classList.remove('stepActive');
    step3.classList.add('stepCompleted');
    step2.classList.remove('stepActive');
    step2.classList.add('stepCompleted');
    step1.classList.add('stepActive');

    formContainer.appendChild(title);
    formContainer.appendChild(div);
    formContainer.appendChild(stepEnd);
}

// Event Listener para el envío del formulario
continueButton.addEventListener('click', function(event) {
    handleFormSubmission(event);
});
