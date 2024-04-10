const formContainer = document.querySelector('.formContainer');
const name1 = document.querySelector('#name');
const email = document.querySelector('#email');
const button = document.querySelector('button');
const title = document.querySelector('.registrer');
const span = document.querySelector('.process');
const opciones = document.querySelectorAll('.inactive');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const steps = document.querySelector('.steps');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const tree = document.querySelector('.tree');
const nameResult = document.querySelector('.name');
const emailResult = document.querySelector('.email');
const topics = document.querySelector('.topics');

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

function obtenerValoresSeleccionados() {
    let valoresSeleccionados = [];
    opciones.forEach(function(opcion) {
        if (opcion.classList.contains('active')) {
            valoresSeleccionados.push(opcion.getAttribute('value'));
        }
    });
    return valoresSeleccionados
}
function formName(event) {
    event.preventDefault();
    if (name1.value && email.value) {
        console.log(`Nombre:${name1.value},Email:${email.value}`);
        option1.classList.remove('inactive');
        option2.classList.remove('inactive');
        option3.classList.remove('inactive');
        formContainer.innerHTML = '';
        step2();
    } else {
        console.log('Fill out the required fields');
        button.setAttribute("name", "helloButton");
        button.setAttribute("disabled", "");
    }
}
function step2() {
    title.innerText = 'Which topics you are interested in?';
    title.style.marginBottom = "30px";
    span.textContent = 'Step 2 of 3';
    steps.style.flexDirection = "row-reverse";
    formContainer.append(title, option1, option2, option3);
    steps.appendChild(span);
    tree.classList.remove('stepActive');
    tree.classList.add('stepCompleted');
    two.classList.add('stepActive');
    one.classList.remove('stepActive');

    opciones.forEach(function(opcion) {
        opcion.addEventListener('click', handleOptionClick);
    });

    const continueButton = document.createElement('button');
    continueButton.innerText = 'Continuar';
    continueButton.addEventListener('click', function(event) {
        event.preventDefault();
        obtenerValoresSeleccionados();
        step3();
        console.log('Selecciona al menos un interés');
    });
    formContainer.appendChild(continueButton);
}
function step3() {
    opciones.forEach(function(opcion) {
        opcion.removeEventListener('click', handleOptionClick);
    });
    const nameValue = name1.value;
    const emailValue = email.value;
    formContainer.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Summary';
    const div = document.createElement('div');
    div.classList.add('container');
    const nameH2 = document.createElement('h2');
    nameH2.textContent = 'Name:  ';
    nameH2.classList.add('nameH2');

    const responseName = document.createElement('p');
    responseName.textContent = nameValue;
    responseName.classList.add('responseName');
    nameH2.appendChild(responseName)
    div.appendChild(nameH2)
    const emailH2 = document.createElement('h2');
    emailH2.textContent = 'Email:  ';
    emailH2.classList.add('emailH2');

    const responseEmail = document.createElement('p');
    responseEmail.textContent = emailValue; 
    responseEmail.classList.add('responseEmail');
    emailH2.appendChild(responseEmail)
    div.appendChild(emailH2)
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
    stepEnd.innerText = 'Confirm';
    stepEnd.classList.add('buttonEnd');
    stepEnd.addEventListener('click', function() {
        alert('✅ Success');
    });

    div.append(topics);
    span.textContent = 'Step 3 of 3';
    steps.style.flexDirection = "row-reverse";
    tree.classList.remove('stepActive');
    tree.classList.add('stepCompleted');
    two.classList.remove('stepActive');
    two.classList.add('stepCompleted');
    one.classList.add('stepActive');

    formContainer.appendChild(title);
    formContainer.appendChild(div);
    formContainer.appendChild(stepEnd);
}
button.addEventListener('click', function(event) {
    formName(event);
});
