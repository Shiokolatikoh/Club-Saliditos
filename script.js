// ----------------------------------------------------
// 1. NAVEGACIÓN POR SWIPE EN EL SUBMENÚ DE “INICIO”
// ----------------------------------------------------
// Variables globales para saber qué subsección está activa
let currentSubIndex = 0;
// Tomamos todas las subsecciones y botones del submenú
const subSections = Array.from(document.querySelectorAll('#inicio .subsection'));
const subButtons = Array.from(document.querySelectorAll('.subnav button'));

/**
 * Muestra la subsección correspondiente por índice:
 * - Oculta todas las subsecciones
 * - Desactiva todos los botones
 * - Activa el botón y muestra la subsección seleccionada
 */
function showSubsectionByIndex(index) {
  // Asegurarse de que el índice esté dentro de los límites
  if (index < 0 || index >= subSections.length) return;
  currentSubIndex = index;

  // Ocultar todas las subsecciones y desactivar botones
  subSections.forEach((s) => {
    s.classList.remove('visible');
    s.classList.add('hidden');
  });
  subButtons.forEach((b) => {
    b.classList.remove('active');
  });

  // Mostrar subsección y activar botón correspondiente
  const activeSection = subSections[currentSubIndex];
  const activeButton = subButtons[currentSubIndex];
  if (activeSection && activeButton) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('visible');
    activeButton.classList.add('active');
  }
}

/**
 * Inicializa los eventos touch para detectar swipes horizontales
 * dentro de la sección #inicio. 
 * - Swipe hacia izquierda: avanza a siguiente subsección
 * - Swipe hacia derecha: retrocede a subsección anterior
 */
function handleSwipeOnInicio() {
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // Distancia mínima para considerar swipe

  const inicio = document.getElementById('inicio');
  if (!inicio) return;

  // Al tocar la pantalla, guardamos la posición inicial en X
  inicio.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  // Al soltar el dedo, comparamos con la posición final en X
  inicio.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) > minSwipeDistance) {
      if (delta > 0) {
        // Swipe izquierda: siguiente subsección
        showSubsectionByIndex(currentSubIndex + 1);
      } else {
        // Swipe derecha: subsección anterior
        showSubsectionByIndex(currentSubIndex - 1);
      }
    }
  }
}

// Iniciar submenú con la primera subsección visible y habilitar swipe
window.addEventListener('DOMContentLoaded', () => {
  showSubsectionByIndex(0); // Mostrar “Noticias” por defecto
  handleSwipeOnInicio();     // Activar navegación por swipe
});


// ----------------------------------------------------
// 2. MOSTRAR SOLO LA SUBSECCIÓN ACTIVA (alternativa
// a los botones, puede quedar como respaldo)
/**
 * Si el usuario pulsa un botón (caso no táctil), esta función
 * muestra la subsección asociada.
 */
function showSubsection(id) {
  // Ocultar todas las subsecciones dentro de #inicio
  document.querySelectorAll('#inicio .subsection').forEach((s) => {
    s.classList.remove('visible');
    s.classList.add('hidden');
  });
  // Desactivar todos los botones del submenú
  document.querySelectorAll('.subnav button').forEach((b) => {
    b.classList.remove('active');
  });
  // Activar el botón correspondiente y mostrar la subsección
  const boton = document.querySelector(`.subnav button[data-target="${id}"]`);
  if (boton) {
    boton.classList.add('active');
  }
  const seccion = document.getElementById(id);
  if (seccion) {
    seccion.classList.remove('hidden');
    seccion.classList.add('visible');
    // Actualizar índice para navegación por swipe
    currentSubIndex = subSections.findIndex((el) => el.id === id);
  }
}

// Asignar evento a cada botón en caso de click (para no táctil)
document.querySelectorAll('.subnav button').forEach((btn, idx) => {
  btn.addEventListener('click', () => showSubsectionByIndex(idx));
});


// ----------------------------------------------------
// 3. TOGGLE MENÚ FLOTANTE DE BURBUJA
/**
 * Muestra/oculta el menú flotante al pulsar la burbuja del conejo.
 */
function toggleFloatingMenu() {
  const menu = document.getElementById('menuFlotante');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}


// ----------------------------------------------------
// 4. NAVEGACIÓN DESDE BURBUJAS Y OCULTAR MENÚ FLOTANTE
/**
 * Muestra solo la sección principal elegida y oculta las demás.
 * Se oculta el menú flotante al navegar.
 */
function goTo(id) {
  // Ocultar todas las secciones principales
  document.querySelectorAll('main > section').forEach((sec) => {
    sec.classList.add('hidden');
    sec.classList.remove('visible');
  });
  // Mostrar la sección deseada
  const destino = document.getElementById(id);
  if (destino) {
    destino.classList.remove('hidden');
    destino.classList.add('visible');
  }
  // Ocultar menú flotante
  const menu = document.getElementById('menuFlotante');
  if (menu) {
    menu.classList.add('hidden');
  }
}


// ----------------------------------------------------
// 5. AJUSTAR ALTURA DE CADA NOTICIA-SLIDE PARA SCROLL-SNAP
/**
 * Ajusta dinámicamente la altura de cada .noticia-slide
 * para que ocupe exactamente el viewport, facilitando el
 * scroll-snap vertical.
 */
function ajustarAlturaSlides() {
  // Obtenemos la altura real del viewport
  const vh = window.innerHeight;
  // Ajustar cada noticia-slide y el contenedor principal
  document.querySelectorAll('.noticia-slide').forEach((slide) => {
    slide.style.height = `${vh}px`;
  });
  const contenedor = document.getElementById('carruselNoticias');
  if (contenedor) {
    contenedor.style.height = `${vh}px`;
  }
}

// Llamar a ajustarAlturaSlides en carga, redimensionado y rotación
window.addEventListener('load', ajustarAlturaSlides);
window.addEventListener('resize', ajustarAlturaSlides);
window.addEventListener('orientationchange', ajustarAlturaSlides);


// ----------------------------------------------------
// 6. ANIMACIÓN CON INTERSECTIONOBSERVER PARA NOTICIA-CARD
/**
 * Usa IntersectionObserver para detectar cuándo una .noticia-card
 * entra en el viewport ( threshold 0.2 ), agregar clase .visible
 * y dejar de observar.
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Una vez visible, dejamos de observarlo
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

// Observar todas las tarjetas de noticia
document.querySelectorAll('.noticia-card').forEach((card) => {
  observer.observe(card);
});


// ----------------------------------------------------
// 7. EXPANSIÓN DE IMÁGENES EN NOTICIAS CON OVERLAY
/**
 * Al hacer clic en cualquier imagen dentro de .noticia-card,
 * se abre un overlay con la imagen ampliada. Haciendo clic fuera
 * (o en la “X”), se cierra el overlay.
 */
const overlay = document.getElementById('imageOverlay');
const expandedImg = document.getElementById('expandedImage');

document.querySelectorAll('.noticia-card img').forEach((img) => {
  img.addEventListener('click', () => {
    // Mostrar la misma imagen en el overlay
    expandedImg.src = img.src;
    overlay.classList.add('active');
  });
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  expandedImg.src = '';
});


// ----------------------------------------------------
// 8. MOSTRAR JORNADA SELECCIONADA (J1, J2, ...) Y PRESELECCIÓN
/**
 * Oculta todas las jornadas y muestra únicamente la indicada.
 */
function selectJornada(n) {
  document.querySelectorAll('.jornada').forEach((j) => {
    j.classList.add('hidden');
    j.classList.remove('visible');
  });
  const target = document.getElementById(`jornada-${n}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('visible');
  }
}

// Jornada 1 por defecto al cargar DOM (para la sección “Liga”)
window.addEventListener('DOMContentLoaded', () => {
  selectJornada(1);
});


// ----------------------------------------------------
// 9. ACELERAR ANIMACIÓN DE TÍTULO AL HACER CLICK O TOUCH
/**
 * Al pulsar/tocar el título, reduce temporalmente la duración
 * de la animación del degradado (clase .acelerado).
 */
const titulo = document.getElementById('titulo');

function acelerarAnimacion() {
  if (!titulo) return;
  titulo.classList.add('acelerado');
  setTimeout(() => {
    titulo.classList.remove('acelerado');
  }, 3000);
}

if (titulo) {
  titulo.addEventListener('click', acelerarAnimacion);
  titulo.addEventListener('touchstart', acelerarAnimacion);
}


// ----------------------------------------------------
// 10. EFECTO “HIGHLIGHT” AL HACER CLICK O ENTER/ESPACIO EN SCORE
/**
 * Cada .score-inline adquiere clase .highlight al pulsarse o
 * presionarse Enter/Espacio, durante 1 segundo para destacar.
 */
const scores = document.querySelectorAll('.score-inline');

scores.forEach((score) => {
  function highlight() {
    if (score.classList.contains('highlight')) return; // evitar stacking
    score.classList.add('highlight');
    score.setAttribute('aria-pressed', 'true');
    setTimeout(() => {
      score.classList.remove('highlight');
      score.setAttribute('aria-pressed', 'false');
    }, 1000);
  }
  score.addEventListener('click', highlight);
  score.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      highlight();
    }
  });
});


// ----------------------------------------------------
// 11. TOGGLE “ACTIVE” EN CADA PARTIDO AL HACER CLICK Y KEYDOWN
/**
 * Al hacer clic (o presionar Enter/Espacio) en .match, alterna
 * la clase .active para cambiar su fondo y escalado.
 */
document.querySelectorAll('.match').forEach((match) => {
  match.addEventListener('click', () => {
    match.classList.toggle('active');
  });
  match.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      match.classList.toggle('active');
    }
  });
});


// ----------------------------------------------------
// 12. PESTAÑAS “LIGA” (Jornadas / Clasificación)
/**
 * Control de pestañas: muestra la sección correspondiente y activa el botón.
 */
const tabs = document.querySelectorAll('.liga-tab');
const sections = document.querySelectorAll('.liga-section');

function showSection(targetId) {
  sections.forEach((section) => {
    section.classList.remove('visible');
    section.classList.add('hidden');
  });
  const destino = document.getElementById(targetId);
  if (destino) {
    destino.classList.remove('hidden');
    destino.classList.add('visible');
  }
  tabs.forEach((tab) => tab.classList.remove('active'));
  const boton = document.querySelector(`.liga-tab[data-target="${targetId}"]`);
  if (boton) {
    boton.classList.add('active');
  }
}

// Agregar evento click a cada pestaña
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-target');
    showSection(target);
  });
});

// Pestaña “Jornadas” por defecto al cargar DOM
window.addEventListener('DOMContentLoaded', () => {
  const primeraTab = document.querySelector('.liga-tab[data-target="jornadas"]');
  if (primeraTab) {
    showSection('jornadas');
    primeraTab.classList.add('active');
  }
});


// ----------------------------------------------------
// 13. MODO FULLSCREEN PARA LA TABLA DE CLASIFICACIÓN
/**
 * Al hacer clic sobre .clasificacion-container, pasa a modo
 * fullscreen (quita scroll horizontal, muestra botón “Cerrar”).
 * El botón “Cerrar” revierte al estado normal.
 */
const contenedorTabla = document.getElementById('contenedorTabla');
const btnCerrarTabla = document.getElementById('closeTabla');

function abrirFullScreenTabla(event) {
  if (!contenedorTabla.classList.contains('fullscreen')) {
    contenedorTabla.classList.add('fullscreen');
    btnCerrarTabla.classList.remove('hidden');
    event.stopPropagation();
  }
}

function cerrarFullScreenTabla(event) {
  if (contenedorTabla.classList.contains('fullscreen')) {
    contenedorTabla.classList.remove('fullscreen');
    btnCerrarTabla.classList.add('hidden');
    event.stopPropagation();
  }
}

if (contenedorTabla) {
  contenedorTabla.addEventListener('click', abrirFullScreenTabla);
}
if (btnCerrarTabla) {
  btnCerrarTabla.addEventListener('click', cerrarFullScreenTabla);
}


// ----------------------------------------------------
// 14. OVERLAY PARA EXPANDIR DETALLES DE CADA CLUB
// ----------------------------------------------------
// Datos estáticos de cada club (pueden venir de un API en el futuro)
const clubsInfo = {
  club1: {
    nombre: 'Club 1',
    presidente: 'Nombre 1',
    historia: 'Fundado en 1990, con una pasión por el juego justo.',
    titulos: '3 Ligas, 1 Copa',
    descripcion: 'Un club con gran historia y afición apasionada.',
    imagen: 'imagenes/escudo berti.jpeg'
  },
  club2: {
    nombre: 'Club 2',
    presidente: 'Nombre 2',
    historia: 'Nacido de la unión de comunidades locales.',
    titulos: '2 Ligas',
    descripcion: 'Club trabajador con talento emergente.',
    imagen: 'imagenes/choco.jpeg'
  },
  club3: {
    nombre: 'Club 3',
    presidente: 'Nombre 3',
    historia: 'Proyecto joven con aspiraciones de futuro.',
    titulos: '1 Copa Regional',
    descripcion: 'Apasionados del deporte comunitario.',
    imagen: 'imagenes/cabra.jpeg'
  },
  club4: {
    nombre: 'Club 4',
    presidente: 'Nombre 4',
    historia: 'Fundado por un grupo de exjugadores veteranos.',
    titulos: '4 Ligas',
    descripcion: 'Equipo histórico con gran tradición.',
    imagen: 'imagenes/retro.jpeg'
  },
  club5: {
    nombre: 'Club 5',
    presidente: 'Nombre 5',
    historia: 'Surge de jóvenes promesas de la ciudad.',
    titulos: '1 Copa Municipal',
    descripcion: 'Equipo centrado en la formación.',
    imagen: 'imagenes/bufandas.jpeg'
  },
  club6: {
    nombre: 'Club 6',
    presidente: 'Nombre 6',
    historia: 'Club con raíces en una antigua asociación deportiva.',
    titulos: '2 Copas',
    descripcion: 'Tradición y renovación jugador tras jugador.',
    imagen: 'imagenes/vive.jpeg'
  },
  club7: {
    nombre: 'Club 7',
    presidente: 'Nombre 7',
    historia: 'Hace décadas como equipo universitario.',
    titulos: '3 Títulos Regionales',
    descripcion: 'Fuerte vínculo con la educación y la competición.',
    imagen: 'imagenes/Verdes.jpeg'
  },
  club8: {
    nombre: 'Club 8',
    presidente: 'Nombre 8',
    historia: 'Nacido de la afición al baloncesto callejero.',
    titulos: '1 Liga Amateur',
    descripcion: 'Espíritu urbano y pasión por el deporte.',
    imagen: 'imagenes/Monos.jpeg'
  },
  club9: {
    nombre: 'Club 9',
    presidente: 'Nombre 9',
    historia: 'Surge en los barrios del norte de la ciudad.',
    titulos: '2 Copas Juveniles',
    descripcion: 'Talento emergente y juego creativo.',
    imagen: 'imagenes/dabe.png'
  },
  club10: {
    nombre: 'Club 10',
    presidente: 'Nombre 10',
    historia: 'Formado por exjugadores callejeros.',
    titulos: '1 Torneo Internacional',
    descripcion: 'Experiencia y técnica al servicio de la comunidad.',
    imagen: 'imagenes/correas.jpeg'
  },
  club11: {
    nombre: 'Club 11',
    presidente: 'Nombre 11',
    historia: 'Recién fundado con perfil innovador.',
    titulos: '1 Título de Debut',
    descripcion: 'Apuesta por juventud y método científico.',
    imagen: 'imagenes/flemin.jpeg'
  }
};

// Referencias al DOM para el grid de Clubs y el overlay
const clubsGrid = document.getElementById('clubsGrid');
const clubOverlay = document.getElementById('clubCardOverlay');
const cardContent = document.getElementById('clubCardContent');

/**
 * Renderizar dinámicamente la cuadrícula de escudos:
 * - Por cada club en clubsInfo, crear <img> con clase .club-img
 * - Asignar data-id para recuperar datos al hacer clic
 * - Al hacer clic, llamar a mostrarClub(id)
 */
Object.entries(clubsInfo).forEach(([id, club]) => {
  const img = document.createElement('img');
  img.src = club.imagen;
  img.alt = club.nombre;
  img.className = 'club-img';
  img.dataset.id = id; // Almacena el ID para luego recuperar datos
  // Al hacer clic, abrimos la tarjeta emergente
  img.addEventListener('click', () => mostrarClub(id));
  clubsGrid.appendChild(img);
});

/**
 * Función para mostrar overlay con detalles del club:
 * - Busca en el objeto clubsInfo por el id
 * - Inserta en #clubCardContent el HTML con nombre, imagen, presidente, historia, títulos y descripción
 * - Quita la clase .hidden de #clubCardOverlay para mostrarlo
 */
function mostrarClub(id) {
  const club = clubsInfo[id];
  if (!club) return;
  cardContent.innerHTML = `
    <h3>${club.nombre}</h3>
    <img src="${club.imagen}" alt="${club.nombre}">
    <p><strong>Presidente:</strong> ${club.presidente}</p>
    <p><strong>Historia:</strong> ${club.historia}</p>
    <p><strong>Títulos:</strong> ${club.titulos}</p>
    <p>${club.descripcion}</p>
  `;
  clubOverlay.classList.remove('hidden');
}

/**
 * Cerrar el overlay de Club al hacer clic fuera de la tarjeta
 * (si el target del evento es exactamente el overlay semitransparente)
 */
clubOverlay.addEventListener('click', (e) => {
  if (e.target === clubOverlay) {
    clubOverlay.classList.add('hidden');
    cardContent.innerHTML = '';
  }
});

// ----------------------------------------------------
// 15. OTRAS FUNCIONES YA EXISTENTES (no cambiadas)
// ----------------------------------------------------
// (Aquí podrías incluir código adicional que ya estaba en el proyecto 
// y que no se vio modificado, si existiera algo extra.)
