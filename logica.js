const Radios=document.querySelectorAll('input[name="Tipo"]');
const Variables=document.querySelector('#Variables');
const ListOpt=document.querySelector('#ListaOpt');
const Formulario=document.querySelector('#Form');



Radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        Variables.innerHTML = '';
        ListOpt.innerHTML = "";
        
        if (e.target.value === "2") {

            Variables.innerHTML = `
                <span id="E1">
                    <input type="text" id="x1" class="InputsV"> X 
                    <input type="text" id="y1" class="InputsV"> Y = 
                    <input type="text" id="n1" class="InputsV">
                </span><br>
                <span id="E2">
                    <input type="text" id="x2" class="InputsV"> X 
                    <input type="text" id="y2" class="InputsV"> Y = 
                    <input type="text" id="n2" class="InputsV">
                </span><br>`;
            
            ListOpt.innerHTML = `
                <option value="" disabled selected hidden>Selecciona método...</option>
                <option value="G">Gráfico</option>
                <option value="E">Eliminación</option>
                <option value="S">Sustitución</option>
                <option value="I">Igualación</option>
                <option value="K">Kramer</option>`;
        } 
        else if (e.target.value === "3") {
            // IDs numerados del 1 al 3 para X, Y, Z y N
            Variables.innerHTML = `
                <span id="E1"><input type="text" id="x1" class="InputsV"> X <input type="text" id="y1" class="InputsV"> Y <input type="text" id="z1" class="InputsV"> Z = <input type="text" id="n1" class="InputsV"></span><br>
                <span id="E2"><input type="text" id="x2" class="InputsV"> X <input type="text" id="y2" class="InputsV"> Y <input type="text" id="z2" class="InputsV"> Z = <input type="text" id="n2" class="InputsV"></span><br>
                <span id="E3"><input type="text" id="x3" class="InputsV"> X <input type="text" id="y3" class="InputsV"> Y <input type="text" id="z3" class="InputsV"> Z = <input type="text" id="n3" class="InputsV"></span><br>`;
            
            ListOpt.innerHTML = `
                <option value="" disabled selected hidden>Selecciona método...</option>
                <option value="E">Eliminación</option>
                <option value="GS">Gauss Simple</option>
                <option value="GJ">Gauss-Jordan</option>`;
        }
    });
});


Formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!ValidacionCampos()) {
        return;
    }

    // 1. Detectar qué tipo de sistema eligió el usuario
    const tipoSeleccionado = document.querySelector('input[name="Tipo"]:checked');
    const metodo = document.querySelector('#ListaOpt').value;

    if (!tipoSeleccionado || metodo === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan datos',
            text: 'Seleccioná el tipo de sistema y el método.',
            confirmButtonColor: '#d33'
        });
        return;
    }

    const tipo = tipoSeleccionado.value; // "2" o "3"

    // 2. Llamar a la función correcta según el tipo
    if (tipo === "2") {
        const datos = obtener2x2();
        resolver2x2(datos, metodo);
    } else if (tipo === "3") {
        const datos = obtener3x3();
        resolver3x3(datos, metodo);
    }
});

function obtener2x2(){
    return{
        x1: parseFloat(document.querySelector('#x1').value) || 0,
        y1: parseFloat(document.querySelector('#y1').value) || 0,
        n1: parseFloat(document.querySelector('#n1').value) || 0,
        x2: parseFloat(document.querySelector('#x2').value) || 0,
        y2: parseFloat(document.querySelector('#y2').value) || 0,
        n2: parseFloat(document.querySelector('#n2').value) || 0
    }
}
function obtener3x3(){
    return{
        x1: parseFloat(document.querySelector('#x1').value) || 0,
        y1: parseFloat(document.querySelector('#y1').value) || 0,
        z1: parseFloat(document.querySelector('#z1').value) || 0,
        n1: parseFloat(document.querySelector('#n1').value) || 0,
        x2: parseFloat(document.querySelector('#x2').value) || 0,
        y2: parseFloat(document.querySelector('#y2').value) || 0,
        z2: parseFloat(document.querySelector('#z2').value) || 0,
        n2: parseFloat(document.querySelector('#n2').value) || 0,
        x3: parseFloat(document.querySelector('#x3').value) || 0,
        y3: parseFloat(document.querySelector('#y3').value) || 0,
        z3: parseFloat(document.querySelector('#z3').value) || 0,
        n3: parseFloat(document.querySelector('#n3').value) || 0

    }
}
function ValidacionCampos(){

    const campos = document.querySelectorAll('.InputsV');
    let esValido = true;
    const regexNumero = /^-?\d*\.?\d+$/;

 
    for (let campo of campos) {
        const valor = campo.value.trim();

        if (valor === "" || !regexNumero.test(valor)) {
          
            Swal.fire({
                icon: 'error',
                title: 'Revisa los datos',
                text: 'Asegúrate de llenar todos los campos con números válidos.',
                confirmButtonColor: '#d33'
            });

            campo.style.borderColor = "red";
            campo.focus(); 
            esValido = false;
            
            break; 
        } else {
            campo.style.borderColor = ""; 
        }
    }

    return esValido;

}