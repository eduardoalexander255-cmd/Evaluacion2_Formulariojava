

const arrAficiones = [];


function mostrarError(inputId, msgId, mensaje) {
    const input = document.getElementById(inputId);
    const div   = document.getElementById(msgId);
    if (input) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
    if (div) {
        div.innerText = mensaje;
    }
}

function limpiarError(inputId, msgId) {
    const input = document.getElementById(inputId);
    const div   = document.getElementById(msgId);
    if (input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
    if (div) {
        div.innerText = "";
    }
}


function limpiarMensaje(msgId) {
    const div = document.getElementById(msgId);
    if (div) { div.innerText = ""; }
}

function validarUsername() {
    const valor = document.getElementById("username").value.trim();
    const id    = "username";
    const msgId = "username-msg";

    if (valor.length === 0) {
        mostrarError(id, msgId, "El nombre de usuario es obligatorio.");
        return false;
    }

    if (valor.length < 5 || valor.length > 10) {
        mostrarError(id, msgId, "Debe tener entre 5 y 10 caracteres.");
        return false;
    }

    const primerCode = valor.charCodeAt(0);
    const primerEsLetra = (primerCode >= 65 && primerCode <= 90) ||
                          (primerCode >= 97 && primerCode <= 122);
    if (!primerEsLetra) {
        mostrarError(id, msgId, "Debe comenzar con una letra (sin acentos).");
        return false;
    }

    // Recorrer cada carácter: letras al inicio, dígitos solo al final
    let zonaDigitos = false;
    for (let i = 0; i < valor.length; i++) {
        const code     = valor.charCodeAt(i);
        const esLetra  = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
        const esDigito = (code >= 48 && code <= 57);

        if (!esLetra && !esDigito) {
            mostrarError(id, msgId, "No se permiten caracteres especiales ni acentos.");
            return false;
        }
        if (esDigito) {
            zonaDigitos = true;
        }
        if (zonaDigitos && esLetra) {
            mostrarError(id, msgId, "Los dígitos solo pueden ir al final del nombre de usuario.");
            return false;
        }
    }

    limpiarError(id, msgId);
    return true;
}

function validarPassword() {
    const valor    = document.getElementById("password").value;
    const username = document.getElementById("username").value.trim().toLowerCase();
    const id       = "password";
    const msgId    = "password-msg";

    if (valor.length === 0) {
        mostrarError(id, msgId, "La contraseña es obligatoria.");
        return false;
    }

    if (valor.length < 3 || valor.length > 6) {
        mostrarError(id, msgId, "La contraseña debe tener entre 3 y 6 caracteres.");
        return false;
    }

    let tieneLetra  = false;
    let tieneDigito = false;
    for (let i = 0; i < valor.length; i++) {
        const code = valor.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) { tieneLetra  = true; }
        if (code >= 48 && code <= 57)                                   { tieneDigito = true; }
    }

    if (!tieneLetra) {
        mostrarError(id, msgId, "La contraseña debe contener al menos una letra.");
        return false;
    }
    if (!tieneDigito) {
        mostrarError(id, msgId, "La contraseña debe contener al menos un número.");
        return false;
    }

    if (username.length > 0 && valor.toLowerCase().indexOf(username) !== -1) {
        mostrarError(id, msgId, "La contraseña no puede contener el nombre de usuario.");
        return false;
    }

    limpiarError(id, msgId);
    return true;
}


function validarConfirmacion() {
    const password  = document.getElementById("password").value;
    const confirmar = document.getElementById("re-password").value;
    const id        = "re-password";
    const msgId     = "re-password-msg";

    if (confirmar.length === 0) {
        mostrarError(id, msgId, "Debes confirmar la contraseña.");
        return false;
    }
    if (confirmar !== password) {
        mostrarError(id, msgId, "Las contraseñas no coinciden.");
        return false;
    }

    limpiarError(id, msgId);
    return true;
}


function validarDireccion() {
    const valor = document.getElementById("direccion").value.trim();
    const id    = "direccion";
    const msgId = "direccion-msg";

    if (valor.length === 0) {
        mostrarError(id, msgId, "La dirección es obligatoria.");
        return false;
    }

    limpiarError(id, msgId);
    return true;
}

function validarComuna() {
    const select = document.getElementById("comuna");
    const valor  = select.value;
    const msgId  = "comuna-msg";

    if (valor === "") {
        select.classList.add("is-invalid");
        select.classList.remove("is-valid");
        document.getElementById(msgId).innerText = "Debes seleccionar una comuna.";
        return false;
    }

    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
    document.getElementById(msgId).innerText = "";
    return true;
}


function validarTelefono() {
    const valor = document.getElementById("telefono").value.trim();
    const id    = "telefono";
    const msgId = "telefono-msg";

    if (valor.length === 0) {
        mostrarError(id, msgId, "El número de teléfono es obligatorio.");
        return false;
    }

    if (valor.length < 3 || valor.charAt(0) !== "+" ||
        valor.charAt(1) !== "5" || valor.charAt(2) !== "6") {
        mostrarError(id, msgId, "Debe comenzar con +56.");
        return false;
    }

    const resto = valor.substring(3);
    if (resto.length !== 9) {
        mostrarError(id, msgId, "Después de +56 se requieren exactamente 9 dígitos.");
        return false;
    }

    for (let i = 0; i < resto.length; i++) {
        const code = resto.charCodeAt(i);
        if (code < 48 || code > 57) {
            mostrarError(id, msgId, "Solo se permiten dígitos después de +56.");
            return false;
        }
    }

    limpiarError(id, msgId);
    return true;
}

function validarURL() {
    const valor = document.getElementById("url").value.trim();
    const id    = "url";
    const msgId = "url-msg";

    
    if (valor.length === 0) {
        document.getElementById(id).classList.remove("is-invalid", "is-valid");
        limpiarMensaje(msgId);
        return true;
    }

    const conHttp  = valor.length >= 7 && valor.substring(0, 7)  === "http://";
    const conHttps = valor.length >= 8 && valor.substring(0, 8)  === "https://";

    if (!conHttp && !conHttps) {
        mostrarError(id, msgId, "La URL debe comenzar con http:// o https://");
        return false;
    }

    const dominio = conHttps ? valor.substring(8) : valor.substring(7);

    if (dominio.length === 0) {
        mostrarError(id, msgId, "La URL no contiene un dominio válido.");
        return false;
    }

   
    let tienePunto = false;
    for (let i = 0; i < dominio.length; i++) {
        if (dominio.charAt(i) === ".") { tienePunto = true; break; }
    }

    if (!tienePunto) {
        mostrarError(id, msgId, "La URL debe tener un dominio con punto (ej. .cl, .com).");
        return false;
    }

    if (dominio.charAt(0) === "." || dominio.charAt(dominio.length - 1) === ".") {
        mostrarError(id, msgId, "El dominio de la URL no es válido.");
        return false;
    }

    limpiarError(id, msgId);
    return true;
}

function validarAficiones() {
    const msgId = "hobby-msg";
    if (arrAficiones.length < 2) {
        document.getElementById(msgId).innerText = "Debes ingresar al menos 2 aficiones.";
        return false;
    }
    document.getElementById(msgId).innerText = "";
    return true;
}


function validarFormulario() {
    const v1 = validarUsername();
    const v2 = validarPassword();
    const v3 = validarConfirmacion();
    const v4 = validarDireccion();
    const v5 = validarComuna();
    const v6 = validarTelefono();
    const v7 = validarURL();
    const v8 = validarAficiones();

    const todoOk = v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8;

    if (todoOk) {
        mostrarExito();
    }

    return false; 
}


function agregarAficion() {
    const input = document.getElementById("hobby");
    const valor = input.value.trim();
    const msgId = "hobby-msg";

    if (valor === "") {
        document.getElementById(msgId).innerText = "Escribe una afición antes de agregar.";
        return;
    }

    
    for (let i = 0; i < arrAficiones.length; i++) {
        if (arrAficiones[i].toLowerCase() === valor.toLowerCase()) {
            document.getElementById(msgId).innerText = "Esa afición ya fue agregada.";
            return;
        }
    }

    document.getElementById(msgId).innerText = "";
    arrAficiones.push(valor);
    actualizarListaAficiones();
    input.value = "";
    input.focus();
}


function eliminarAficion(indice) {
    arrAficiones.splice(indice, 1);
    actualizarListaAficiones();
}


function actualizarListaAficiones() {
    const ul       = document.getElementById("hobby-list");
    const contador = document.getElementById("hobby-counter");

    contador.innerText = arrAficiones.length;
    ul.innerHTML = "";

    if (arrAficiones.length === 0) {
        const li     = document.createElement("li");
        li.className = "list-group-item text-muted fst-italic";
        li.innerText = "Aún no has agregado aficiones.";
        ul.appendChild(li);
        return;
    }

    for (let i = 0; i < arrAficiones.length; i++) {
        const li     = document.createElement("li");
        li.className = "list-group-item hobby-item";

        const span     = document.createElement("span");
        span.innerText = arrAficiones[i];

        const btn     = document.createElement("button");
        btn.type      = "button";
        btn.className = "btn-eliminar";
        btn.innerText = "×";
        btn.title     = "Eliminar";

        
        (function(idx) {
            btn.onclick = function() { eliminarAficion(idx); };
        })(i);

        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
    }

   
    if (arrAficiones.length >= 2) {
        document.getElementById("hobby-msg").innerText = "";
    }
}


function resetFormulario() {
    arrAficiones.length = 0;
    actualizarListaAficiones();

    
    const banner = document.getElementById("success-msg");
    if (banner) { banner.style.display = "none"; }

   
    const campos = document.querySelectorAll(".form-control, .form-select");
    campos.forEach(function(el) {
        el.classList.remove("is-valid", "is-invalid");
    });

  
    const errores = document.querySelectorAll(".error-msg");
    errores.forEach(function(el) {
        el.innerText = "";
    });
}



function mostrarExito() {
    const banner = document.getElementById("success-msg");
    if (banner) {
        banner.style.display = "block";
        banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}



document.addEventListener("DOMContentLoaded", function() {
    const hobbyInput = document.getElementById("hobby");
    if (hobbyInput) {
        hobbyInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                agregarAficion();
            }
        });
    }
});
