const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const usuario = {
        rut: document.getElementById("rut").value.trim(),
        nombres: document.getElementById("nombres").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        email: document.getElementById("email").value.trim(),
        fecha: document.getElementById("fecha").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        comentarios: document.getElementById("comentarios").value.trim()
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.findIndex(
        persona => persona.rut === usuario.rut
    );

    if (existe !== -1) {

        const respuesta = confirm(
            "El registro ya existe. ¿Desea sobrescribirlo?"
        );

        if (respuesta) {
            usuarios[existe] = usuario;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Registro actualizado correctamente.");
        }

    } else {

        usuarios.push(usuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Registro guardado correctamente.");
    }

});

function limpiar() {

    formulario.reset();

    document.getElementById("resultado").innerHTML = "";

}

function cerrar() {

    const respuesta = confirm(
        "¿Desea cerrar el formulario?"
    );

    if (respuesta) {
        document.body.innerHTML =
            "<h2 style='text-align:center;'>Formulario cerrado</h2>";
    }

}

function buscar() {

    const apellido =
        document.getElementById("buscarApellido")
        .value
        .trim()
        .toLowerCase();

    const resultado =
        document.getElementById("resultado");

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrados = usuarios.filter(
        usuario =>
            usuario.apellidos.toLowerCase().includes(apellido)
    );

    if (apellido === "") {
        resultado.innerHTML = "Ingrese un apellido.";
        return;
    }

    if (encontrados.length === 0) {
        resultado.innerHTML = "Usuario no encontrado.";
        return;
    }

    let texto = "";

    encontrados.forEach(usuario => {

        texto += `
            <p>
                <strong>RUT:</strong> ${usuario.rut}<br>
                <strong>Nombre:</strong>
                ${usuario.nombres} ${usuario.apellidos}<br>
                <strong>Ciudad:</strong> ${usuario.ciudad}<br>
                <strong>Email:</strong> ${usuario.email}
            </p>
            <hr>
        `;

    });

    resultado.innerHTML = texto;

}
