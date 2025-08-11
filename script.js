document.addEventListener('DOMContentLoaded', () => {
    // Definición de la malla curricular con todos los datos
    const malla = {
        'SEMESTRE 1': [
            { nombre: 'Química General y Orgánica', requisitos: [] },
            { nombre: 'Morfología Básica', requisitos: [] },
            { nombre: 'Antropología', requisitos: [] },
            { nombre: 'Biología Celular', requisitos: [] },
            { nombre: 'Bases de la Enfermería y Rol del Liderazgo', requisitos: [] },
            { nombre: 'Psicología Evolutiva', requisitos: [] }
        ],
        'SEMESTRE 2': [
            { nombre: 'Bioquímica General', requisitos: ['Química General y Orgánica'] },
            { nombre: 'Microbiología General', requisitos: ['Biología Celular'] },
            { nombre: 'Integrado de Fisiología - Fisiopatología 1', requisitos: ['Biología Celular'] },
            { nombre: 'Salud Digital', requisitos: [] },
            { nombre: 'Calidad, Seguridad y Prevención de Infecciones Asociadas a la Atención en Salud (IAAS)', requisitos: [] },
            { nombre: 'Salud Intercultural', requisitos: [] }
        ],
        'SEMESTRE 3': [
            { nombre: 'Integrado de Fisiología - Fisiopatología 2', requisitos: ['Integrado de Fisiología - Fisiopatología 1'] },
            { nombre: 'Farmacología General', requisitos: ['Integrado de Fisiología - Fisiopatología 1'] },
            { nombre: 'Salud Poblacional', requisitos: [] },
            { nombre: 'Enfermería en el Curso de Vida', requisitos: [] },
            { nombre: 'Educación para la Salud', requisitos: [] },
            { nombre: 'Comunicación Interdisciplinar', requisitos: [] }
        ],
        'SEMESTRE 4': [
            { nombre: 'Gestión del Cuidado del Adulto 1', requisitos: ['Enfermería en el Curso de Vida'] },
            { nombre: 'Ética', requisitos: ['Antropología'] },
            { nombre: 'Bases de Práctica Basada en Evidencia', requisitos: [] },
            { nombre: 'Administración para la Gestión del Cuidado', requisitos: [] }
        ],
        'HITO EVALUATIVO INTEGRATIVO': [
            { nombre: 'Hito Evaluativo Integrativo', requisitos: ['SEMESTRE 2', 'SEMESTRE 3'] }
        ],
        'SEMESTRE 5': [
            { nombre: 'Persona y Sociedad', requisitos: ['Ética'] },
            { nombre: 'Gestión del Cuidado del Adulto 2', requisitos: ['Gestión del Cuidado del Adulto 1'] },
            { nombre: 'Bioestadística y Salud', requisitos: [] },
            { nombre: 'Epidemiología', requisitos: ['Salud Poblacional'] },
            { nombre: 'Medio Ambiente, Salud y Enfermería', requisitos: ['Administración para la Gestión del Cuidado'] },
            { nombre: 'Gestión de Proyectos en Salud', requisitos: ['Administración para la Gestión del Cuidado'] }
        ],
        'SEMESTRE 6': [
            { nombre: 'Gestión del Cuidado en la Persona Mayor', requisitos: ['Gestión del Cuidado del Adulto 2'] },
            { nombre: 'Enfermería en Salud Mental y Psiquiatría', requisitos: ['Gestión del Cuidado del Adulto 2'] },
            { nombre: 'Liderazgo y Toma de Decisiones en Salud', requisitos: ['Gestión de Proyectos en Salud'] },
            { nombre: 'Metodología de la Investigación', requisitos: [] },
            { nombre: 'Electivo 1 de Formación e Identidad', requisitos: [] }
        ],
        'SEMESTRE 7': [
            { nombre: 'Gestión del Cuidado en la Niñez y Adolescencia', requisitos: ['Gestión del Cuidado del Adulto 2'] },
            { nombre: 'Enfermería en Salud Familiar y Comunitaria', requisitos: ['Enfermería en Salud Mental y Psiquiatría'] },
            { nombre: 'Gerencia y Gobernanza para la Gestión en Salud', requisitos: ['Liderazgo y Toma de Decisiones en Salud'] },
            { nombre: 'Bioética', requisitos: [] },
            { nombre: 'Proyecto de Investigación', requisitos: ['Metodología de la Investigación'] },
            { nombre: 'Electivo 2 de Formación e Identidad', requisitos: [] }
        ],
        'SEMESTRE 8': [
            { nombre: 'Enfermería de Urgencia', requisitos: ['Gestión del Cuidado en la Niñez y Adolescencia'] },
            { nombre: 'Enfermería en Oncología y Cuidados Paliativos', requisitos: ['Enfermería en Salud Familiar y Comunitaria'] },
            { nombre: 'Liderazgo para la Gestión del Cambio en Equipos de Salud', requisitos: ['Gerencia y Gobernanza para la Gestión en Salud'] },
            { nombre: 'Práctica Basada en la Evidencia', requisitos: ['Proyecto de Investigación'] }
        ],
        'HITO EVALUATIVO INTEGRATIVO INTERPROFESIONAL': [
            { nombre: 'Hito Evaluativo Integrativo Interprofesional', requisitos: ['SEMESTRE 6', 'SEMESTRE 7'] }
        ],
        'SEMESTRE 9': [
            { nombre: 'Gestión de Carrera y Desarrollo Profesional', requisitos: [] },
            { nombre: 'Internado Clínico y Asistencial', requisitos: ['SEMESTRE 7', 'SEMESTRE 8'] },
            { nombre: 'Electivo 1', requisitos: ['SEMESTRE 7', 'SEMESTRE 8'] }
        ],
        'SEMESTRE 10': [
            { nombre: 'Internado en Salud Familiar y Comunitaria', requisitos: ['SEMESTRE 7', 'SEMESTRE 8'] },
            { nombre: 'Internado en Gestión en Salud', requisitos: ['SEMESTRE 7', 'SEMESTRE 8'] },
            { nombre: 'Electivo 2', requisitos: ['SEMESTRE 7', 'SEMESTRE 8'] }
        ]
    };

    // Elementos del DOM
    const mallaContainer = document.querySelector('.malla-container');
    const modalPromedio = document.getElementById('modal-promedio');
    const modalRequisitos = document.getElementById('modal-requisitos');
    const closeButtons = document.querySelectorAll('.close-button');
    const inputPromedio = document.getElementById('input-promedio');
    const guardarPromedioBtn = document.getElementById('guardar-promedio');
    const nombreAsignaturaSpan = document.getElementById('nombre-asignatura');
    const listaRequisitosUl = document.getElementById('lista-requisitos');

    let asignaturaActual = null; // Variable para almacenar la asignatura seleccionada

    // --- Funciones para manejar el almacenamiento de datos en el navegador ---

    // Carga los datos guardados en localStorage
    const cargarDatos = () => {
        const datosGuardados = localStorage.getItem('mallaEnfermeria');
        return datosGuardados ? JSON.parse(datosGuardados) : {};
    };

    // Guarda el estado de las asignaturas en localStorage
    const guardarDatos = (datos) => {
        localStorage.setItem('mallaEnfermeria', JSON.stringify(datos));
    };

    let datosMalla = cargarDatos();

    // --- Funciones para verificar requisitos ---

    // Revisa si una asignatura está aprobada
    const estaAprobado = (nombreAsignatura) => {
        return datosMalla[nombreAsignatura] !== undefined;
    };

    // Verifica si todos los requisitos de una asignatura se han cumplido
    const verificarRequisitos = (asignatura) => {
        if (!asignatura.requisitos || asignatura.requisitos.length === 0) {
            return { cumplido: true, faltantes: [] };
        }

        const faltantes = [];
        for (const req of asignatura.requisitos) {
            if (req.startsWith('SEMESTRE')) {
                // Si el requisito es un semestre completo
                const asignaturasSemestre = malla[req];
                const semestreCumplido = asignaturasSemestre.every(a => estaAprobado(a.nombre));
                if (!semestreCumplido) {
                    faltantes.push(`Aprobar todo el ${req}`);
                }
            } else if (!estaAprobado(req)) {
                // Si el requisito es una asignatura específica
                faltantes.push(req);
            }
        }
        return { cumplido: faltantes.length === 0, faltantes: faltantes };
    };

    // --- Funciones para la interacción con la interfaz ---

    // Dibuja la malla en el DOM
    const dibujarMalla = () => {
        mallaContainer.innerHTML = '';
        for (const semestre in malla) {
            const semestreDiv = document.createElement('div');
            semestreDiv.classList.add('semestre');
            semestreDiv.innerHTML = `<h2>${semestre}</h2>`;

            malla[semestre].forEach(asignatura => {
                const asignaturaDiv = document.createElement('div');
                asignaturaDiv.classList.add('asignatura');
                asignaturaDiv.dataset.nombre = asignatura.nombre;

                const requisitosCheck = verificarRequisitos(asignatura);

                if (!requisitosCheck.cumplido) {
                    asignaturaDiv.classList.add('bloqueado');
                }

                if (estaAprobado(asignatura.nombre)) {
                    asignaturaDiv.classList.add('aprobado');
                    const promedio = datosMalla[asignatura.nombre];
                    asignaturaDiv.innerHTML = `${asignatura.nombre} <span class="promedio-texto">(${promedio})</span>`;
                } else {
                    asignaturaDiv.textContent = asignatura.nombre;
                }

                // Manejar el clic en una asignatura
                asignaturaDiv.addEventListener('click', () => {
                    if (asignaturaDiv.classList.contains('aprobado')) {
                        // Si ya está aprobada, la desmarcamos
                        delete datosMalla[asignatura.nombre];
                        guardarDatos(datosMalla);
                        dibujarMalla();
                        return;
                    }

                    const requisitosFinal = verificarRequisitos(asignatura);
                    if (requisitosFinal.cumplido) {
                        // Si los requisitos están cumplidos, mostramos el modal para el promedio
                        asignaturaActual = asignatura;
                        nombreAsignaturaSpan.textContent = asignatura.nombre;
                        inputPromedio.value = '';
                        modalPromedio.classList.add('visible');
                        inputPromedio.focus();
                    } else {
                        // Si faltan requisitos, mostramos el modal de advertencia
                        listaRequisitosUl.innerHTML = '';
                        requisitosFinal.faltantes.forEach(req => {
                            const li = document.createElement('li');
                            li.textContent = req;
                            listaRequisitosUl.appendChild(li);
                        });
                        modalRequisitos.classList.add('visible');
                    }
                });

                semestreDiv.appendChild(asignaturaDiv);
            });
            mallaContainer.appendChild(semestreDiv);
        }
    };

    // --- Funciones para la lógica de los modales ---

    // Cierra el modal de promedios o requisitos
    const cerrarModal = (modal) => {
        modal.classList.remove('visible');
    };

    // Maneja el guardado del promedio
    guardarPromedioBtn.addEventListener('click', () => {
        const promedio = parseFloat(inputPromedio.value);

        if (!isNaN(promedio) && promedio >= 1.0 && promedio <= 7.0) {
            datosMalla[asignaturaActual.nombre] = promedio.toFixed(1);
            guardarDatos(datosMalla);
            cerrarModal(modalPromedio);
            dibujarMalla(); // Volver a dibujar la malla para actualizar el estado
        } else {
            alert('Por favor, ingresa un promedio válido (entre 1.0 y 7.0).');
        }
    });

    // Cierra los modales al hacer clic en la "X"
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            cerrarModal(modal);
        });
    });

    // Cierra los modales al hacer clic fuera de ellos
    window.addEventListener('click', (event) => {
        if (event.target === modalPromedio) {
            cerrarModal(modalPromedio);
        }
        if (event.target === modalRequisitos) {
            cerrarModal(modalRequisitos);
        }
    });

    // Cierra el modal de promedio al presionar "Enter"
    inputPromedio.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            guardarPromedioBtn.click();
        }
    });

    // --- Inicialización ---

    // Dibuja la malla por primera vez al cargar la página
    dibujarMalla();
});
