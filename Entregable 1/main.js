let miSaldo = 0;
const historialMovimientos = [];

function arrancarSimulador() {
    alert("¡Hola! Vamos a empezar nuestro simulador de finanzas.\n\nPreparate para usar la consola y las ventanas.");
    console.log("Simulador iniciado.");

    let entradaCorrecta = false;
    while (!entradaCorrecta) {
        let valorInicial = prompt("¿Con cuánto dinero empezás? Poné solo números, por favor:");

        if (valorInicial === null) {
            alert("Bueno, parece que no querés empezar. ¡Chau!");
            return -1;
        }

        let numeroInicial = parseFloat(valorInicial);

        if (!isNaN(numeroInicial) && numeroInicial >= 0) {
            miSaldo = numeroInicial;
            entradaCorrecta = true;
            alert("¡Perfecto! Empezamos con $" + miSaldo.toFixed(2) + ".");
            console.log("Saldo inicial establecido en: $" + miSaldo.toFixed(2));
        } else {
            alert("¡Ojo! Eso no es un número válido o es negativo. Intentá de nuevo.");
        }
    }
}

function agregarIngreso() {
    let ingresoValido = false;
    let montoIngreso = 0;

    while (!ingresoValido) {
        let textoIngreso = prompt("¿Cuánto dinero te ingresó? (Solo números):");

        if (textoIngreso === null) {
            alert("Operación de ingreso cancelada.");
            return;
        }

        montoIngreso = parseFloat(textoIngreso);

        if (!isNaN(montoIngreso) && montoIngreso > 0) {
            ingresoValido = true;
        } else {
            alert("Monto inválido para ingreso. ¡Debe ser un número positivo!");
        }
    }

    miSaldo = miSaldo + montoIngreso;
    historialMovimientos.push({ tipo: "Ingreso", monto: montoIngreso.toFixed(2), fecha: new Date().toLocaleString() });
    alert("¡Ingreso registrado! Ahora tenés: $" + miSaldo.toFixed(2));
    console.log("Se agregó un ingreso de $" + montoIngreso.toFixed(2) + ". Saldo actual: $" + miSaldo.toFixed(2));
}

function registrarGasto() {
    let gastoValido = false;
    let montoGasto = 0;

    while (!gastoValido) {
        let textoGasto = prompt("¿Cuánto dinero gastaste? (Solo números):");

        if (textoGasto === null) {
            alert("Operación de gasto cancelada.");
            return;
        }

        montoGasto = parseFloat(textoGasto);

        if (!isNaN(montoGasto) && montoGasto > 0) {
            if (montoGasto <= miSaldo) {
                gastoValido = true;
            } else {
                alert("¡No tenés suficiente plata para ese gasto!\n\nTu saldo actual es: $" + miSaldo.toFixed(2));
                return;
            }
        } else {
            alert("Monto inválido para gasto. ¡Debe ser un número positivo!");
        }
    }

    miSaldo = miSaldo - montoGasto;
    historialMovimientos.push({ tipo: "Gasto", monto: montoGasto.toFixed(2), fecha: new Date().toLocaleString() });
    alert("¡Gasto registrado! Ahora tenés: $" + miSaldo.toFixed(2));
    console.log("Se registró un gasto de $" + montoGasto.toFixed(2) + ". Saldo actual: $" + miSaldo.toFixed(2));
}

function verReporte() {
    alert("--- REPORTE ACTUAL ---\n\nTu saldo es: $" + miSaldo.toFixed(2) + "\n\nChequea la consola para ver el historial detallado.");
    console.log("--- REPORTE ACTUAL ---");
    console.log("Tu saldo es: $" + miSaldo.toFixed(2));

    if (historialMovimientos.length === 0) {
        console.log("Todavía no hay movimientos registrados.");
    } else {
        console.log("Historial de Movimientos:");
        // ¡Aquí usamos console.table!
        console.table(historialMovimientos);
    }
}

arrancarSimulador();

if (miSaldo === -1) {
    console.log("Simulador terminado por el usuario.");
} else {
    let seguirOperando = true;
    while (seguirOperando) {
        let opcionElegida = prompt(
            "¿Qué querés hacer ahora?\n\n" +
            "Tu saldo actual es: $" + miSaldo.toFixed(2) + "\n\n" +
            "1. Agregar Ingreso\n" +
            "2. Registrar Gasto\n" +
            "3. Ver Reporte de Movimientos\n" +
            "4. SALIR"
        );

        if (opcionElegida === "1") {
            agregarIngreso();
        } else if (opcionElegida === "2") {
            registrarGasto();
        } else if (opcionElegida === "3") {
            verReporte();
        } else if (opcionElegida === "4") {
            let confirmarSalir = confirm("¿De verdad querés salir del simulador?");
            if (confirmarSalir) {
                seguirOperando = false;
                alert("¡Gracias por usar el simulador! ¡Hasta la próxima!");
                console.log("Simulador finalizado por el usuario.");
            }
        } else if (opcionElegida === null) {
            seguirOperando = false;
            alert("¡Gracias por usar el simulador! ¡Hasta la próxima!");
            console.log("Simulador finalizado por el usuario.");
        } else {
            alert("Esa opción no existe. Elegí un número del 1 al 4, por favor.");
        }
    }
}