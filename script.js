let participantes = [];

function agregarNombre() {
    const input = document.getElementById('nombre');
    const nombre = input.value.trim();
    
    if (!nombre) {
        mostrarAlerta('⚠️ Ingresa un nombre válido', 'error');
        return;
    }
    
    if (participantes.some(p => p.toLowerCase() === nombre.toLowerCase())) {
        mostrarAlerta('❌ ¡Este nombre ya existe!', 'error');
        input.value = '';
        return;
    }
    
    participantes.push(nombre);
    actualizarLista();
    input.value = '';
    mostrarAlerta(`✅ ${nombre} agregado`, 'success');
}

function actualizarLista() {
    const lista = document.getElementById('listaNombres');
    lista.innerHTML = '';
    
    participantes.forEach((nombre, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nombre}</span>
            <i class="fas fa-times" onclick="eliminarNombre(${index})"></i>
        `;
        lista.appendChild(li);
    });
}

function eliminarNombre(index) {
    const nombreEliminado = participantes.splice(index, 1)[0];
    actualizarLista();
    mostrarAlerta(`🗑️ ${nombreEliminado} eliminado`, 'warning');
}

function generarSorteo() {
    if (participantes.length < 3) {
        mostrarAlerta('🚨 ¡Mínimo 3 participantes!', 'error');
        return;
    }
    
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    resultado.innerHTML = '<div class="carga"><i class="fas fa-spinner fa-spin"></i> Procesando...</div>';
    
    setTimeout(() => {
        const indiceGanador = Math.floor(Math.random() * participantes.length);
        resultado.innerHTML = `
            <h3>Resultado del Sorteo</h3>
            <div class="ganador">
                <i class="fas fa-star"></i>
                ${participantes[indiceGanador]}
                <i class="fas fa-star"></i>
            </div>
            <small>¡Felicidades!</small>
        `;
    }, 2000);
}

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alerta ${tipo}`;
    alerta.innerHTML = `
        <i class="fas fa-${tipo === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        ${mensaje}
    `;
    document.body.appendChild(alerta);
    
    setTimeout(() => alerta.classList.add('show'), 10);
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 500);
    }, 3000);
}

document.getElementById('nombre').addEventListener('keypress', e => {
    if (e.key === 'Enter') agregarNombre();
});