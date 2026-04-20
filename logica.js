// ─── Selectores ───────────────────────────────────────────────────────────────
const radios     = document.querySelectorAll('input[name="Tipo"]');
const variables  = document.querySelector('#Variables');
const listaOpt   = document.querySelector('#ListaOpt');
const formulario = document.querySelector('#Form');
const resolucion = document.querySelector('#Resolucion');
const resContenido = document.querySelector('#ResolucionContenido');

// ─── Cambio de tipo de sistema ────────────────────────────────────────────────
radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        variables.innerHTML = '';
        listaOpt.innerHTML  = '';
        resolucion.classList.remove('visible');

        if (e.target.value === "2") {
            variables.innerHTML = `
                <div class="ecuacion">
                    <span class="eq-label">E1</span>
                    <input type="text" id="x1" class="InputsV" placeholder="a">
                    <span class="var-name">X</span>
                    <input type="text" id="y1" class="InputsV" placeholder="b">
                    <span class="var-name">Y</span>
                    <span class="eq-sign">=</span>
                    <input type="text" id="n1" class="InputsV" placeholder="c">
                </div>
                <div class="ecuacion">
                    <span class="eq-label">E2</span>
                    <input type="text" id="x2" class="InputsV" placeholder="a">
                    <span class="var-name">X</span>
                    <input type="text" id="y2" class="InputsV" placeholder="b">
                    <span class="var-name">Y</span>
                    <span class="eq-sign">=</span>
                    <input type="text" id="n2" class="InputsV" placeholder="c">
                </div>`;

            listaOpt.innerHTML = `
                <option value="" disabled selected hidden>Seleccioná un método...</option>
                <option value="E">Eliminación</option>
                <option value="S">Sustitución</option>
                <option value="I">Igualación</option>
                <option value="K">Kramer</option>`;

        } else if (e.target.value === "3") {
            variables.innerHTML = `
                <div class="ecuacion">
                    <span class="eq-label">E1</span>
                    <input type="text" id="x1" class="InputsV" placeholder="a">
                    <span class="var-name">X</span>
                    <input type="text" id="y1" class="InputsV" placeholder="b">
                    <span class="var-name">Y</span>
                    <input type="text" id="z1" class="InputsV" placeholder="c">
                    <span class="var-name">Z</span>
                    <span class="eq-sign">=</span>
                    <input type="text" id="n1" class="InputsV" placeholder="d">
                </div>
                <div class="ecuacion">
                    <span class="eq-label">E2</span>
                    <input type="text" id="x2" class="InputsV" placeholder="a">
                    <span class="var-name">X</span>
                    <input type="text" id="y2" class="InputsV" placeholder="b">
                    <span class="var-name">Y</span>
                    <input type="text" id="z2" class="InputsV" placeholder="c">
                    <span class="var-name">Z</span>
                    <span class="eq-sign">=</span>
                    <input type="text" id="n2" class="InputsV" placeholder="d">
                </div>
                <div class="ecuacion">
                    <span class="eq-label">E3</span>
                    <input type="text" id="x3" class="InputsV" placeholder="a">
                    <span class="var-name">X</span>
                    <input type="text" id="y3" class="InputsV" placeholder="b">
                    <span class="var-name">Y</span>
                    <input type="text" id="z3" class="InputsV" placeholder="c">
                    <span class="var-name">Z</span>
                    <span class="eq-sign">=</span>
                    <input type="text" id="n3" class="InputsV" placeholder="d">
                </div>`;

            listaOpt.innerHTML = `
                <option value="" disabled selected hidden>Seleccioná un método...</option>
                <option value="GS">Gauss Simple</option>
                <option value="GJ">Gauss-Jordan</option>`;
        }
    });
});

// ─── Submit ───────────────────────────────────────────────────────────────────
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    const tipoSeleccionado = document.querySelector('input[name="Tipo"]:checked');
    const metodo = listaOpt.value;

    if (!tipoSeleccionado || metodo === "") {
        Swal.fire({ icon: 'warning', title: 'Faltan datos', text: 'Seleccioná el tipo de sistema y el método.', confirmButtonColor: '#7c6cfa' });
        return;
    }

    const tipo = tipoSeleccionado.value;

    resolucion.classList.add('visible');
    resContenido.innerHTML = '';

    if (tipo === "2") {
        const datos = obtener2x2();
        resolver2x2(datos, metodo);
    } else if (tipo === "3") {
        const datos = obtener3x3();
        resolver3x3(datos, metodo);
    }
});

// ─── Obtener datos ────────────────────────────────────────────────────────────
function obtener2x2() {
    return {
        x1: parseFloat(document.querySelector('#x1').value),
        y1: parseFloat(document.querySelector('#y1').value),
        n1: parseFloat(document.querySelector('#n1').value),
        x2: parseFloat(document.querySelector('#x2').value),
        y2: parseFloat(document.querySelector('#y2').value),
        n2: parseFloat(document.querySelector('#n2').value)
    };
}

function obtener3x3() {
    return {
        x1: parseFloat(document.querySelector('#x1').value),
        y1: parseFloat(document.querySelector('#y1').value),
        z1: parseFloat(document.querySelector('#z1').value),
        n1: parseFloat(document.querySelector('#n1').value),
        x2: parseFloat(document.querySelector('#x2').value),
        y2: parseFloat(document.querySelector('#y2').value),
        z2: parseFloat(document.querySelector('#z2').value),
        n2: parseFloat(document.querySelector('#n2').value),
        x3: parseFloat(document.querySelector('#x3').value),
        y3: parseFloat(document.querySelector('#y3').value),
        z3: parseFloat(document.querySelector('#z3').value),
        n3: parseFloat(document.querySelector('#n3').value)
    };
}

// ─── Despachar método 2x2 ─────────────────────────────────────────────────────
function resolver2x2(d, metodo) {
    if (metodo === "E")      metodoEliminacion(d);
    else if (metodo === "S") metodoSustitucion(d);
    else if (metodo === "I") metodoIgualacion(d);
    else if (metodo === "K") metodoKramer(d);
}

// ─── Despachar método 3x3 ─────────────────────────────────────────────────────
function resolver3x3(d, metodo) {
    if (metodo === "GS")     metodoGaussSimple(d);
    else if (metodo === "GJ") metodoGaussJordan(d);
}

// ═════════════════════════════════════════════════════════════════════════════
// MÉTODOS 2x2
// ═════════════════════════════════════════════════════════════════════════════

// ── 1. Eliminación ────────────────────────────────────────────────────────────
function metodoEliminacion(d) {
    const pasos = [];
    const { x1, y1, n1, x2, y2, n2 } = d;

    pasos.push({
        titulo: "Sistema original",
        texto: `E1: ${fmt(x1)}X + ${fmt(y1)}Y = ${fmt(n1)}\nE2: ${fmt(x2)}X + ${fmt(y2)}Y = ${fmt(n2)}`
    });

    // Multiplicar para igualar coeficientes de X
    const factor1 = x2;
    const factor2 = x1;

    const nx1 = x1 * factor1, ny1 = y1 * factor1, nn1 = n1 * factor1;
    const nx2 = x2 * factor2, ny2 = y2 * factor2, nn2 = n2 * factor2;

    pasos.push({
        titulo: `Multiplicar para eliminar X (E1 × ${fmt(factor1)}, E2 × ${fmt(factor2)})`,
        texto: `E1×${fmt(factor1)}: ${fmt(nx1)}X + ${fmt(ny1)}Y = ${fmt(nn1)}\nE2×${fmt(factor2)}: ${fmt(nx2)}X + ${fmt(ny2)}Y = ${fmt(nn2)}`
    });

    // Restar E1 - E2
    const ryCoef = ny1 - ny2;
    const rn = nn1 - nn2;

    pasos.push({
        titulo: "Restar las ecuaciones (E1 - E2)",
        texto: `${fmt(ryCoef)}Y = ${fmt(rn)}`
    });

    if (ryCoef === 0) {
        mostrarSinSolucion("El sistema no tiene solución única (coeficientes iguales).");
        return;
    }

    const y = rn / ryCoef;
    pasos.push({ titulo: "Despejar Y", texto: `Y = ${fmt(rn)} / ${fmt(ryCoef)} = ${fmt(y)}` });

    if (x1 === 0) {
        mostrarSinSolucion("No se puede despejar X de la ecuación 1 (coeficiente 0).");
        return;
    }

    const x = (n1 - y1 * y) / x1;
    pasos.push({
        titulo: "Sustituir Y en E1 para obtener X",
        texto: `${fmt(x1)}X + ${fmt(y1)}(${fmt(y)}) = ${fmt(n1)}\n${fmt(x1)}X = ${fmt(n1)} - ${fmt(y1 * y)}\nX = ${fmt(x)}`
    });

    mostrarPasosYResultado(pasos, { X: x, Y: y });
}

// ── 2. Sustitución ────────────────────────────────────────────────────────────
function metodoSustitucion(d) {
    const pasos = [];
    const { x1, y1, n1, x2, y2, n2 } = d;

    pasos.push({
        titulo: "Sistema original",
        texto: `E1: ${fmt(x1)}X + ${fmt(y1)}Y = ${fmt(n1)}\nE2: ${fmt(x2)}X + ${fmt(y2)}Y = ${fmt(n2)}`
    });

    if (x1 === 0) {
        mostrarSinSolucion("No se puede despejar X de E1 (coeficiente 0). Intentá con otro método.");
        return;
    }

    // Despejar X de E1
    const coefY = -y1 / x1;
    const termInd = n1 / x1;

    pasos.push({
        titulo: "Despejar X de E1",
        texto: `X = (${fmt(n1)} - ${fmt(y1)}Y) / ${fmt(x1)}\nX = ${fmt(termInd)} + (${fmt(coefY)})Y`
    });

    // Sustituir en E2
    const nuevoCoefY = x2 * coefY + y2;
    const nuevoN = n2 - x2 * termInd;

    pasos.push({
        titulo: "Sustituir X en E2",
        texto: `${fmt(x2)}(${fmt(termInd)} + ${fmt(coefY)}Y) + ${fmt(y2)}Y = ${fmt(n2)}\n${fmt(nuevoCoefY)}Y = ${fmt(nuevoN)}`
    });

    if (nuevoCoefY === 0) {
        mostrarSinSolucion("El sistema no tiene solución única.");
        return;
    }

    const y = nuevoN / nuevoCoefY;
    pasos.push({ titulo: "Despejar Y", texto: `Y = ${fmt(nuevoN)} / ${fmt(nuevoCoefY)} = ${fmt(y)}` });

    const x = termInd + coefY * y;
    pasos.push({ titulo: "Calcular X sustituyendo Y", texto: `X = ${fmt(termInd)} + ${fmt(coefY)} × ${fmt(y)} = ${fmt(x)}` });

    mostrarPasosYResultado(pasos, { X: x, Y: y });
}

// ── 3. Igualación ─────────────────────────────────────────────────────────────
function metodoIgualacion(d) {
    const pasos = [];
    const { x1, y1, n1, x2, y2, n2 } = d;

    pasos.push({
        titulo: "Sistema original",
        texto: `E1: ${fmt(x1)}X + ${fmt(y1)}Y = ${fmt(n1)}\nE2: ${fmt(x2)}X + ${fmt(y2)}Y = ${fmt(n2)}`
    });

    if (x1 === 0 || x2 === 0) {
        mostrarSinSolucion("No se puede despejar X de alguna ecuación (coeficiente 0).");
        return;
    }

    // Despejar X de ambas
    const a1 = n1 / x1, b1 = -y1 / x1;
    const a2 = n2 / x2, b2 = -y2 / x2;

    pasos.push({
        titulo: "Despejar X de cada ecuación",
        texto: `De E1: X = ${fmt(a1)} + (${fmt(b1)})Y\nDe E2: X = ${fmt(a2)} + (${fmt(b2)})Y`
    });

    // Igualar
    const coefY = b1 - b2;
    const termInd = a2 - a1;

    pasos.push({
        titulo: "Igualar las expresiones de X",
        texto: `${fmt(a1)} + ${fmt(b1)}Y = ${fmt(a2)} + ${fmt(b2)}Y\n${fmt(coefY)}Y = ${fmt(termInd)}`
    });

    if (coefY === 0) {
        mostrarSinSolucion("El sistema no tiene solución única.");
        return;
    }

    const y = termInd / coefY;
    pasos.push({ titulo: "Despejar Y", texto: `Y = ${fmt(termInd)} / ${fmt(coefY)} = ${fmt(y)}` });

    const x = a1 + b1 * y;
    pasos.push({ titulo: "Calcular X", texto: `X = ${fmt(a1)} + ${fmt(b1)} × ${fmt(y)} = ${fmt(x)}` });

    mostrarPasosYResultado(pasos, { X: x, Y: y });
}

// ── 4. Kramer ─────────────────────────────────────────────────────────────────
function metodoKramer(d) {
    const pasos = [];
    const { x1, y1, n1, x2, y2, n2 } = d;

    pasos.push({
        titulo: "Sistema original",
        texto: `E1: ${fmt(x1)}X + ${fmt(y1)}Y = ${fmt(n1)}\nE2: ${fmt(x2)}X + ${fmt(y2)}Y = ${fmt(n2)}`
    });

    const det = x1 * y2 - y1 * x2;

    pasos.push({
        titulo: "Calcular determinante principal (D)",
        texto: `D = |${fmt(x1)}  ${fmt(y1)}|\n    |${fmt(x2)}  ${fmt(y2)}|\nD = (${fmt(x1)} × ${fmt(y2)}) - (${fmt(y1)} × ${fmt(x2)}) = ${fmt(det)}`
    });

    if (det === 0) {
        mostrarSinSolucion("El determinante es 0 → el sistema no tiene solución única.");
        return;
    }

    const detX = n1 * y2 - y1 * n2;
    pasos.push({
        titulo: "Determinante Dx (reemplazar columna X con resultados)",
        texto: `Dx = |${fmt(n1)}  ${fmt(y1)}|\n     |${fmt(n2)}  ${fmt(y2)}|\nDx = (${fmt(n1)} × ${fmt(y2)}) - (${fmt(y1)} × ${fmt(n2)}) = ${fmt(detX)}`
    });

    const detY = x1 * n2 - n1 * x2;
    pasos.push({
        titulo: "Determinante Dy (reemplazar columna Y con resultados)",
        texto: `Dy = |${fmt(x1)}  ${fmt(n1)}|\n     |${fmt(x2)}  ${fmt(n2)}|\nDy = (${fmt(x1)} × ${fmt(n2)}) - (${fmt(n1)} × ${fmt(x2)}) = ${fmt(detY)}`
    });

    const x = detX / det;
    const y = detY / det;

    pasos.push({
        titulo: "Calcular X e Y",
        texto: `X = Dx / D = ${fmt(detX)} / ${fmt(det)} = ${fmt(x)}\nY = Dy / D = ${fmt(detY)} / ${fmt(det)} = ${fmt(y)}`
    });

    mostrarPasosYResultado(pasos, { X: x, Y: y });
}

// ═════════════════════════════════════════════════════════════════════════════
// MÉTODOS 3x3
// ═════════════════════════════════════════════════════════════════════════════

// ── 5. Gauss Simple ───────────────────────────────────────────────────────────
function metodoGaussSimple(d) {
    const pasos = [];
    // Convertir a matriz aumentada
    let m = [
        [d.x1, d.y1, d.z1, d.n1],
        [d.x2, d.y2, d.z2, d.n2],
        [d.x3, d.y3, d.z3, d.n3]
    ];

    pasos.push({ titulo: "Matriz aumentada inicial", texto: matrizStr(m) });

    // Eliminación hacia adelante
    for (let col = 0; col < 3; col++) {
        // Buscar pivote no nulo
        if (m[col][col] === 0) {
            let swap = -1;
            for (let row = col + 1; row < 3; row++) {
                if (m[row][col] !== 0) { swap = row; break; }
            }
            if (swap === -1) { mostrarSinSolucion("El sistema no tiene solución única (pivote nulo)."); return; }
            [m[col], m[swap]] = [m[swap], m[col]];
            pasos.push({ titulo: `Intercambiar fila ${col+1} con fila ${swap+1}`, texto: matrizStr(m) });
        }

        for (let row = col + 1; row < 3; row++) {
            const factor = m[row][col] / m[col][col];
            if (factor === 0) continue;
            for (let k = col; k < 4; k++) {
                m[row][k] -= factor * m[col][k];
            }
            pasos.push({
                titulo: `F${row+1} = F${row+1} - (${fmt(factor)}) × F${col+1}`,
                texto: matrizStr(m)
            });
        }
    }

    pasos.push({ titulo: "Matriz triangular superior", texto: matrizStr(m) });

    // Sustitución hacia atrás
    const sol = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
        let suma = m[i][3];
        for (let j = i + 1; j < 3; j++) suma -= m[i][j] * sol[j];
        sol[i] = suma / m[i][i];
        const nombre = ["X", "Y", "Z"][i];
        pasos.push({ titulo: `Despejar ${nombre}`, texto: `${nombre} = ${fmt(sol[i])}` });
    }

    mostrarPasosYResultado(pasos, { X: sol[0], Y: sol[1], Z: sol[2] });
}

// ── 6. Gauss-Jordan ───────────────────────────────────────────────────────────
function metodoGaussJordan(d) {
    const pasos = [];
    let m = [
        [d.x1, d.y1, d.z1, d.n1],
        [d.x2, d.y2, d.z2, d.n2],
        [d.x3, d.y3, d.z3, d.n3]
    ];

    pasos.push({ titulo: "Matriz aumentada inicial", texto: matrizStr(m) });

    for (let col = 0; col < 3; col++) {
        if (m[col][col] === 0) {
            let swap = -1;
            for (let row = col + 1; row < 3; row++) {
                if (m[row][col] !== 0) { swap = row; break; }
            }
            if (swap === -1) { mostrarSinSolucion("El sistema no tiene solución única."); return; }
            [m[col], m[swap]] = [m[swap], m[col]];
            pasos.push({ titulo: `Intercambiar fila ${col+1} con fila ${swap+1}`, texto: matrizStr(m) });
        }

        // Normalizar fila pivote
        const pivote = m[col][col];
        for (let k = 0; k < 4; k++) m[col][k] /= pivote;
        pasos.push({ titulo: `F${col+1} = F${col+1} / ${fmt(pivote)} (normalizar pivote)`, texto: matrizStr(m) });

        // Eliminar en TODAS las filas (no solo abajo)
        for (let row = 0; row < 3; row++) {
            if (row === col) continue;
            const factor = m[row][col];
            if (factor === 0) continue;
            for (let k = 0; k < 4; k++) m[row][k] -= factor * m[col][k];
            pasos.push({
                titulo: `F${row+1} = F${row+1} - (${fmt(factor)}) × F${col+1}`,
                texto: matrizStr(m)
            });
        }
    }

    pasos.push({ titulo: "Matriz identidad (solución directa)", texto: matrizStr(m) });

    mostrarPasosYResultado(pasos, { X: m[0][3], Y: m[1][3], Z: m[2][3] });
}

// ═════════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ═════════════════════════════════════════════════════════════════════════════

// Formatear número: sin decimales innecesarios, redondear flotantes largos
function fmt(n) {
    const r = Math.round(n * 10000) / 10000;
    return Number.isInteger(r) ? r.toString() : r.toString();
}

// Convertir matriz a texto legible
function matrizStr(m) {
    return m.map(fila =>
        "[ " + fila.map(v => String(fmt(v)).padStart(8)).join("  ") + " ]"
    ).join("\n");
}

// Mostrar pasos en el div #Resolucion
function mostrarPasosYResultado(pasos, resultado) {
    resContenido.innerHTML = '';

    pasos.forEach(paso => {
        const div = document.createElement('div');
        div.className = 'res-step';
        div.innerHTML = `<div class="step-title">${paso.titulo}</div><pre style="font-family:var(--mono,monospace);font-size:0.85rem;white-space:pre-wrap;">${paso.texto}</pre>`;
        resContenido.appendChild(div);
    });

    // Resultado final
    const nombres = Object.keys(resultado);
    const valoresHTML = nombres.map(k => `
        <div class="res-val">
            <span class="val-name">${k}</span>
            <span class="val-num">${fmt(resultado[k])}</span>
        </div>`).join('');

    const final = document.createElement('div');
    final.className = 'res-final';
    final.innerHTML = `<div class="final-title">Resultado</div><div class="res-values">${valoresHTML}</div>`;
    resContenido.appendChild(final);

    // Scroll suave al resultado
    resolucion.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Mostrar mensaje cuando no hay solución única
function mostrarSinSolucion(mensaje) {
    resContenido.innerHTML = `<div class="no-solucion">${mensaje}</div>`;
    resolucion.scrollIntoView({ behavior: 'smooth' });
}

// ─── Validación ───────────────────────────────────────────────────────────────
function validarCampos() {
    const campos = document.querySelectorAll('.InputsV');
    const regex = /^-?\d*\.?\d+$/;

    for (let campo of campos) {
        campo.classList.remove('error');
        const valor = campo.value.trim();

        if (valor === "" || !regex.test(valor)) {
            campo.classList.add('error');
            campo.focus();
            Swal.fire({
                icon: 'error',
                title: 'Dato inválido',
                text: 'Completá todos los campos con números válidos.',
                confirmButtonColor: '#7c6cfa'
            });
            return false;
        }
    }
    return true;
}