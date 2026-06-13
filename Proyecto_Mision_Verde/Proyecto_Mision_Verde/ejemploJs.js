function evaluarHabitos() {
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const recicla = document.getElementById('recicla').value;
    const bano = parseInt(document.getElementById('bano').value);
    const lavamanos = document.getElementById('lavamanos').value;
    const desconecta = document.getElementById('desconecta').value;
    
    const divResultado = document.getElementById('resultado');

    if (!nombre || !edad || !recicla || isNaN(bano) || !lavamanos || !desconecta) {
        alert("Por favor, llena todos los campos del formulario de hábitos.");
        return;
    }

    const reciclaBien = (recicla === 'mucho');
    const banoBien = (bano <= 10); 
    const lavamanosBien = (lavamanos === 'si');
    const desconectaBien = (desconecta === 'si');

    divResultado.style.display = "block";

    if (reciclaBien && banoBien && lavamanosBien && desconectaBien) {
        divResultado.style.backgroundColor = "#d4edda";
        divResultado.style.color = "#155724";
        divResultado.style.border = "2px solid #c3e6cb";
        divResultado.innerHTML = `¡Hola ${nombre}! A tus ${edad} 👍 años estás dejando un granito de arena para construir un buen futuro 👍.`;
    } else {
        divResultado.style.backgroundColor = "#fff3cd";
        divResultado.style.color = "#856404";
        divResultado.style.border = "2px solid #ffeeba";
        divResultado.innerHTML = `¡Gracias por responder, ${nombre}! A tus ${edad} 🙄 años vas por buen camino, pero aún puedes mejorar algunos hábitos para cuidar el planeta 🙄.`;
    }

    divResultado.scrollIntoView({ behavior: 'smooth' });
}