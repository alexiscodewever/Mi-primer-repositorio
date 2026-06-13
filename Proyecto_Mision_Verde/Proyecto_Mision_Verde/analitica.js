// ==========================================
// DATASET HISTÓRICO AMBIENTAL
// ==========================================
// NUEVO: Volvemos a dejar los datos por defecto para que la página NO arranque vacía
let datasetHistorico = [
    { anio: 2025, sector: "Tecnología", unidades: 1420, innovacion: 78 },
    { anio: 2025, sector: "Sostenible", unidades: 980, innovacion: 82 },
    { anio: 2020, sector: "Tecnología", unidades: 1100, innovacion: 71 },
    { anio: 2020, sector: "Social", unidades: 1250, innovacion: 65 },
    { anio: 2015, sector: "Gastronomía", unidades: 1500, innovacion: 50 },
    { anio: 2015, sector: "Sostenible", unidades: 600, innovacion: 58 },
    { anio: 2010, sector: "Tecnología", unidades: 750, innovacion: 48 },
    { anio: 2010, sector: "Gastronomía", unidades: 1300, innovacion: 42 },
    { anio: 2006, sector: "Social", unidades: 800, innovacion: 35 },
    { anio: 2006, sector: "Gastronomía", unidades: 1100, innovacion: 31 }
];

// FUNCIÓN PARA PROCESAR EL ARCHIVO PLANO CSV (Si se sube uno nuevo)
function importarCSV(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    
    lector.onload = function(e) {
        const contenido = e.target.result;
        const lineas = contenido.split("\n");
        
        // Al subir un CSV, limpiamos los datos por defecto para meter los del archivo
        datasetHistorico = [];

        // Ignoramos el encabezado arrancando desde el índice 1
        for (let i = 1; i < lineas.length; i++) {
            const linea = lineas[i].trim();
            if (linea === "") continue; 

            const columnas = linea.split(","); 

            if (columnas.length >= 4) {
                datasetHistorico.push({
                    anio: parseInt(columnas[0].trim()),
                    sector: columnas[1].trim(),
                    unidades: parseInt(columnas[2].trim()),
                    innovacion: parseInt(columnas[3].trim())
                });
            }
        }

        alert("¡Base de datos actualizada desde el archivo CSV con éxito!");
        filtrarDatos(); // Refresca la tabla con la nueva data del archivo
    };

    lector.readAsText(archivo);
}

// INSERCIÓN DE FILAS EN LA TABLA HTML
function cargarTabla(datos) {
    const tbody = document.getElementById("cuerpoTabla");
    if (!tbody) return;
    
    if (datos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:15px; color:#666;">No hay datos disponibles.</td></tr>`;
        return;
    }

    tbody.innerHTML = datos.map(item => `
        <tr style="border-bottom: 1px solid #ddd; text-align: left; color: #333;">
            <td style="padding:10px; border:1px solid #ddd;">${item.anio}</td>
            <td style="padding:10px; border:1px solid #ddd;">
                ${item.sector === "Gastronomía" ? "Consumo Responsable" : 
                  item.sector === "Tecnología" ? "Tecnología Verde" : 
                  item.sector === "Social" ? "Conciencia Social" : "Protección Sostenible"}
            </td>
            <td style="padding:10px; border:1px solid #ddd;">${item.unidades} iniciativas</td>
            <td style="padding:10px; border:1px solid #ddd; font-weight: bold; color: #0dc57f;">${item.innovacion}% de efectividad</td>
        </tr>
    `).join('');
}

// FILTRADO DINÁMICO COMBINADO
function filtrarDatos() {
    const a = document.getElementById("filtroAnio").value;
    const s = document.getElementById("filtroSector").value;
    
    const datosFiltrados = datasetHistorico.filter(d => 
        (a === "todos" || d.anio == a) && 
        (s === "todos" || d.sector == s)
    );
    cargarTabla(datosFiltrados);
}

// CONSTRUCCIÓN ESTATAL DE GRÁFICOS (CHART.JS)
document.addEventListener("DOMContentLoaded", () => {
    // MAGIA ACTUALIZADA: Ahora apenas abre la página, la tabla se llena sola con los 10 datos fijos
    cargarTabla(datasetHistorico);

    const conf = { 
        responsive: true, 
        maintainAspectRatio: false 
    };

    // --- Gráfico de Barras ---
    const ctxBarras = document.getElementById('graficoBarras');
    if (ctxBarras) {
        new Chart(ctxBarras, {
            type: 'bar',
            data: { 
                labels: ['Plásticos (PET)', 'Papel/Cartón', 'Vidrio', 'Metales/Orgánicos'], 
                datasets: [{ label: 'Porcentaje de Reciclaje Exitoso (%)', data: [35, 58, 72, 41], backgroundColor: '#0dc57f' }] 
            },
            options: conf
        });
    }

    // --- Gráfico de Torta ---
    const ctxTorta = document.getElementById('graficoTorta');
    if (ctxTorta) {
        new Chart(ctxTorta, {
            type: 'pie',
            data: { 
                labels: ['Sector Agrícola', 'Uso Doméstico', 'Industria Limpia', 'Sistemas de Lluvia'], 
                datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['#4a93ae', '#93e83e', '#1ea7c3', '#d0e1c4'] }] 
            },
            options: conf
        });
    }

    // --- Gráfico de Líneas ---
    const ctxLineas = document.getElementById('graficoLineas');
    if (ctxLineas) {
        new Chart(ctxLineas, {
            type: 'line',
            data: { 
                labels: ['2006', '2010', '2015', '2020', '2025'], 
                datasets: [{ label: 'Árboles Plantados (Millones)', data: [32, 45, 54, 66, 75], borderColor: '#a15805', backgroundColor: 'transparent', fill: false }] 
            },
            options: conf
        });
    }

    // --- Gráfico de Área ---
    const ctxArea = document.getElementById('graficoArea');
    if (ctxArea) {
        new Chart(ctxArea, {
            type: 'line',
            data: { 
                labels: ['2006', '2010', '2015', '2020', '2025'], 
                datasets: [
                    { label: 'Índice de Conciencia Ciudadana', data: [40, 55, 68, 70, 85], backgroundColor: 'rgba(74,147,174,0.4)', borderColor: '#4a93ae', fill: true },
                    { label: 'Adopción de Tecnologías Verdes', data: [20, 30, 48, 62, 79], backgroundColor: 'rgba(13,197,127,0.4)', borderColor: '#0dc57f', fill: true }
                ] 
            },
            options: conf
        });
    }
});

// RESPUESTA DEL TEST DE EMPRENDIMIENTO
function calcularCapacidad() {
    const nombre = document.getElementById("nombreEmp").value;
    const total = parseInt(document.getElementById("p1").value) + parseInt(document.getElementById("p2").value) + parseInt(document.getElementById("p3").value);
    const porc = Math.round((total / 9) * 100);
    
    let diag = porc >= 80 ? "🚀 ¡Eres un Líder Ecológico! Tienes hábitos firmes y buscas soluciones analíticas para salvar el medio ambiente." : porc >= 50 ? "💡 ¡Buen potencial verde! Haces lo básico como reciclar, pero puedes involucrar más tecnología en tu día a día." : "📈 Nivel Inicial. Te recomendamos informarte más sobre el ahorro de agua y la gestión de residuos.";
    
    const divRes = document.getElementById("resultadoTest");
    if (divRes) {
        divRes.style.display = "block";
        divRes.innerHTML = `¡Hola, ${nombre}!<br>Tu Puntuación Ecológica: <strong>${porc}%</strong>.<br>${diag}`;
    }
}