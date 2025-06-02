// ----------------------------------------------------
// 1. NAVEGACIÓN POR SWIPE EN EL SUBMENÚ DE “INICIO”
// ----------------------------------------------------
// Variables globales para saber qué subsección está activa
let currentSubIndex = 0;
// Tomamos todas las subsecciones y botones del submenú
let subSections = [];
let subButtons = [];
// Variables para swipe detection en 'inicio'
let touchStartX_Inicio = 0;
let touchStartY_Inicio = 0;

// ----------------------------------------------------
// 2. NAVEGACIÓN POR SWIPE EN SECCIÓN “LIGA”
// ----------------------------------------------------
// Variables globales para saber qué pestaña de Liga está activa
let currentLigaIndex = 0;
const ligaSections = ['jornadas', 'clasificacion'];
// Variables para swipe detection en 'liga'
let touchStartX_Liga = 0;
let touchStartY_Liga = 0;

// ----------------------------------------------------
// 3. FUNCIONES PARA MOSTRAR SUBSECCIONES DE “INICIO”
// ----------------------------------------------------
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

// Detectar swipes horizontales en "#inicio", ignorando verticales
function handleSwipeOnInicio() {
  const minSwipeDistance = 50; // Distancia mínima para considerar swipe
  const inicio = document.getElementById('inicio');
  if (!inicio) return;

  inicio.addEventListener('touchstart', (e) => {
    touchStartX_Inicio = e.changedTouches[0].screenX;
    touchStartY_Inicio = e.changedTouches[0].screenY;
  });

  inicio.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchStartX_Inicio - touchEndX;
    const deltaY = touchStartY_Inicio - touchEndY;

    // Solo considerar swipe horizontal si |deltaX| > |deltaY| y |deltaX| > umbral
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe izquierda: siguiente subsección
        showSubsectionByIndex(currentSubIndex + 1);
      } else {
        // Swipe derecha: subsección anterior
        showSubsectionByIndex(currentSubIndex - 1);
      }
    }
  });
}

// Mostrar subsección al pulsar el botón (respaldo)
function showSubsection(id) {
  document.querySelectorAll('#inicio .subsection').forEach((s) => {
    s.classList.remove('visible');
    s.classList.add('hidden');
  });
  document.querySelectorAll('.subnav button').forEach((b) => {
    b.classList.remove('active');
  });
  const boton = document.querySelector(`.subnav button[data-target="${id}"]`);
  if (boton) {
    boton.classList.add('active');
  }
  const seccion = document.getElementById(id);
  if (seccion) {
    seccion.classList.remove('hidden');
    seccion.classList.add('visible');
    currentSubIndex = subSections.findIndex((el) => el.id === id);
  }
}

// ----------------------------------------------------
// 4. FUNCIONES PARA MOSTRAR PESTAÑAS EN “LIGA”
// ----------------------------------------------------
function showLigaByIndex(index) {
  if (index < 0 || index >= ligaSections.length) return;
  currentLigaIndex = index;

  ligaSections.forEach((secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.classList.remove('visible');
      el.classList.add('hidden');
    }
  });
  // Mostrar la sección activa
  const activeId = ligaSections[currentLigaIndex];
  const activeSection = document.getElementById(activeId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('visible');
  }
  // Actualizar clases en pestañas
  document.querySelectorAll('.liga-tab').forEach((tab) => {
    tab.classList.remove('active');
  });
  const activeTab = document.querySelector(`.liga-tab[data-target="${activeId}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Detectar swipes horizontales en "#liga", ignorando verticales
function handleSwipeOnLiga() {
  const minSwipeDistance = 50;
  const ligaContainer = document.getElementById('ligaContainer');
  if (!ligaContainer) return;

  ligaContainer.addEventListener('touchstart', (e) => {
    touchStartX_Liga = e.changedTouches[0].screenX;
    touchStartY_Liga = e.changedTouches[0].screenY;
  });

  ligaContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchStartX_Liga - touchEndX;
    const deltaY = touchStartY_Liga - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe izquierda: siguiente pestaña de Liga
        showLigaByIndex(currentLigaIndex + 1);
      } else {
        // Swipe derecha: pestaña anterior de Liga
        showLigaByIndex(currentLigaIndex - 1);
      }
    }
  });
}

// Mostrar pestaña al pulsar
function showSection(targetId) {
  ligaSections.forEach((secId) => {
    const sec = document.getElementById(secId);
    if (sec) {
      sec.classList.remove('visible');
      sec.classList.add('hidden');
    }
  });
  const destino = document.getElementById(targetId);
  if (destino) {
    destino.classList.remove('hidden');
    destino.classList.add('visible');
  }
  document.querySelectorAll('.liga-tab').forEach((tab) => tab.classList.remove('active'));
  const boton = document.querySelector(`.liga-tab[data-target="${targetId}"]`);
  if (boton) {
    boton.classList.add('active');
    currentLigaIndex = ligaSections.indexOf(targetId);
  }
}

// ----------------------------------------------------
// 5. TOGGLE MENÚ FLOTANTE DE BURBUJA
// ----------------------------------------------------
function toggleFloatingMenu() {
  const menu = document.getElementById('menuFlotante');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// ----------------------------------------------------
// 6. FUNCIONES PARA EL SUBMENÚ “COMPETICIONES”
// ----------------------------------------------------
function showCompetitionsMenu() {
  const menu = document.getElementById('menuFlotante');
  if (!menu) return;
  // Reemplazar contenido con opciones de competiciones + botón atrás
  menu.innerHTML = `
    <button onclick="renderMainFloatingMenu()" aria-label="Atrás">
      ←
    </button>
    <button onclick="goTo('liga')" aria-label="Liga">
      <img src="imagenes/liga.png" alt="Liga" style="width: 45px; height: 45px;" />
    </button>
    <button onclick="goTo('copa')" aria-label="Copa">
      <img src="imagenes/copa.png" alt="Copa" style="width: 40px; height: 40px;" />
    </button>
    <button onclick="goTo('supercopa')" aria-label="Supercopa">
      <img src="imagenes/supercopa.png" alt="Supercopa" style="width: 40px; height: 40px;" />
    </button>
    <button onclick="goTo('champions')" aria-label="Champions">
      <img src="imagenes/champions.png" alt="Champions" style="width: 45px; height: 45px;" />
    </button>
  `;
}

function renderMainFloatingMenu() {
  const menu = document.getElementById('menuFlotante');
  if (!menu) return;
  // Restaurar el menú principal con las tres burbujas
  menu.innerHTML = `
    <button onclick="goTo('inicio')" aria-label="Inicio">
      <img src="imagenes/inicio.png" alt="Inicio" style="width: 45px; height: 45px;" />
    </button>
    <button id="btnCompeticiones" aria-label="Competiciones">
      <img src="imagenes/competiciones.png" alt="Competiciones" style="width: 45px; height: 45px;" />
    </button>
    <button onclick="goTo('reglamento')" aria-label="Crew">
      <img src="imagenes/crew.png" alt="Crew" style="width: 45px; height: 45px;" />
    </button>
  `;
  // Reasignar listener al botón de competiciones
  const btnComp = document.getElementById('btnCompeticiones');
  if (btnComp) {
    btnComp.addEventListener('click', showCompetitionsMenu);
  }
}

// ----------------------------------------------------
// 7. NAVEGACIÓN DESDE BURBUJAS Y OCULTAR MENÚ FLOTANTE
// ----------------------------------------------------
function goTo(id) {
  document.querySelectorAll('main > section').forEach((sec) => {
    sec.classList.add('hidden');
    sec.classList.remove('visible');
  });
  const destino = document.getElementById(id);
  if (destino) {
    destino.classList.remove('hidden');
    destino.classList.add('visible');
  }
  const menu = document.getElementById('menuFlotante');
  if (menu) {
    menu.classList.add('hidden');
  }
}

// ----------------------------------------------------
// 8. AJUSTAR ALTURA DE CADA NOTICIA-SLIDE PARA SCROLL-SNAP
// ----------------------------------------------------
// La función se desactiva porque ya no necesitamos height:100vh en CSS
// function ajustarAlturaSlides() {
//  const vh = window.innerHeight;
//  document.querySelectorAll('.noticia-slide').forEach((slide) => {
//    slide.style.height = `${vh}px`;
//  });
//  const contenedor = document.getElementById('carruselNoticias');
//  if (contenedor) {
//    contenedor.style.height = `${vh}px`;
//  }
//}

// ----------------------------------------------------
// 9. ANIMACIÓN CON INTERSECTIONOBSERVER PARA NOTICIA-CARD
// ----------------------------------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// ----------------------------------------------------
// 10. EXPANSIÓN DE IMÁGENES EN NOTICIAS CON OVERLAY
// ----------------------------------------------------
let overlay, expandedImg;

// ----------------------------------------------------
// 11. MOSTRAR JORNADA SELECCIONADA (J1, J2, ...) Y PRESELECCIÓN
// ----------------------------------------------------
function selectJornada(n) {
  // Ocultar todas las jornadas
  document.querySelectorAll('.jornada').forEach((j) => {
    j.classList.add('hidden');
    j.classList.remove('visible');
  });
  // Mostrar la jornada seleccionada
  const target = document.getElementById(`jornada-${n}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('visible');
  }
  // Actualizar el texto del título con la jornada actual
  const tituloJ = document.querySelector('.tituloJ');
  if (tituloJ) {
    tituloJ.textContent = `Jornada ${n}`;
  }
  // Cerrar el menú de jornadas si está abierto
  const jornadaMenu = document.getElementById('jornadaMenu');
  if (jornadaMenu) {
    jornadaMenu.classList.remove('show');
  }
}

// ----------------------------------------------------
// 12. ACELERAR ANIMACIÓN DE TÍTULO AL HACER CLICK O TOUCH
// ----------------------------------------------------
let titulo;

// ----------------------------------------------------
// 13. EFECTO “HIGHLIGHT” AL HACER CLICK O ENTER/ESPACIO EN SCORE
// ----------------------------------------------------
let scores;

// ----------------------------------------------------
// 14. TOGGLE “ACTIVE” EN CADA PARTIDO AL HACER CLICK Y KEYDOWN
// ----------------------------------------------------

// ----------------------------------------------------
// 15. MODO FULLSCREEN PARA LA TABLA DE CLASIFICACIÓN
// ----------------------------------------------------
let contenedorTabla, btnCerrarTabla;

// ----------------------------------------------------
// 16. OVERLAY PARA EXPANDIR DETALLES DE CADA CLUB
// ----------------------------------------------------
const clubsInfo = {
  club1: {
    nombre: 'Saliditos Club',
    presidente: 'Señor Conejo',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/presi.jpeg',
    bgColor: ''
  },
  club2: {
    nombre: 'La retrovisioneta',
    presidente: 'Dina Maiki',
    historia: 'Rápido y veloz',
    titulos: 'Una salidito slick',
    descripcion: 'Equipo histórico',
    imagen: 'imagenes/retro.jpeg',
    bgColor: ''
  },
  club3: {
    nombre: 'LAMPS UNITED',
    presidente: 'SEÑOR JUEZ',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/choco.jpeg',
    bgColor: ''
  },
  club4: {
    nombre: 'Vive Cluj',
    presidente: 'Capitán España',
    historia: 'Histórico',
    titulos: 'Cero',
    descripcion: '',
    imagen: 'imagenes/Monos.jpeg',
    bgColor: ''
  },
  club5: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/cabra.jpeg',
    bgColor: ''
  },
  club6: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/escudo berti.jpeg',
    bgColor: ''
  },
  club7: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/bufandas.jpeg',
    bgColor: ''
  },
  club8: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/correas.jpeg',
    bgColor: ''
  },
  club9: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/Verdes.jpeg',
    bgColor: ''
  },
  club10: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/vive.jpeg',
    bgColor: ''
  },
  club11: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/flemin.jpeg',
    bgColor: ''
  },
  club12: {
    nombre: '',
    presidente: '',
    historia: '',
    titulos: '0',
    descripcion: '',
    imagen: 'imagenes/dabe.png',
    bgColor: ''
  }
};

// Referencias al DOM para el grid de Clubs y el overlay
let clubsGrid, clubOverlay, cardContent;

// ----------------------------------------------------
// Inicialización general al cargar la página
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // 1) Inicializar arrays de subsecciones y botones de “Inicio”
  subSections = Array.from(document.querySelectorAll('#inicio .subsection'));
  subButtons = Array.from(document.querySelectorAll('.subnav button'));

  // Mostrar primera subsección e iniciar swipe en “Inicio”
  showSubsectionByIndex(0);
  handleSwipeOnInicio();

  // Asignar evento click a cada botón de subnav (respaldo)
  subButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => showSubsectionByIndex(idx));
  });

  // 2) Inicializar swipe en “Liga”
  showLigaByIndex(0);
  handleSwipeOnLiga();

  // Asignar evento click a cada pestaña de Liga
  document.querySelectorAll('.liga-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      showSection(target);
    });
  });

  // 3) Observar tarjetas de noticia para animación
  document.querySelectorAll('.noticia-card').forEach((card) => {
    observer.observe(card);
  });

  // 4) Inicializar overlay de noticias
  overlay = document.getElementById('imageOverlay');
  expandedImg = document.getElementById('expandedImage');
  document.querySelectorAll('.noticia-card img').forEach((img) => {
    img.addEventListener('click', () => {
      expandedImg.src = img.src;
      overlay.classList.add('active');
    });
  });
  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    expandedImg.src = '';
  });

  // 5) Inicializar jornada por defecto (puedes cambiar el número aquí)
  const jornadaInicial = 1;
  selectJornada(jornadaInicial);

  // 6) Añadir listener al título de jornada para desplegar/ocultar el menú
  const tituloJ = document.querySelector('.tituloJ');
  const jornadaMenu = document.getElementById('jornadaMenu');
  if (tituloJ && jornadaMenu) {
    tituloJ.addEventListener('click', () => {
      jornadaMenu.classList.toggle('show');
    });
  }

  // 7) Acelerar animación de título
  titulo = document.getElementById('titulo');
  if (titulo) {
    titulo.addEventListener('click', acelerarAnimacion);
    titulo.addEventListener('touchstart', acelerarAnimacion);
  }

  // 8) Efecto highlight en scores
  scores = document.querySelectorAll('.score-inline');
  scores.forEach((score) => {
    function highlight() {
      if (score.classList.contains('highlight')) return;
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

  // 9) Toggle active en partidos
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

  // 10) Fullscreen en tabla de clasificación
  contenedorTabla = document.getElementById('contenedorTabla');
  btnCerrarTabla = document.getElementById('closeTabla');
  if (contenedorTabla) {
    contenedorTabla.addEventListener('click', abrirFullScreenTabla);
  }
  if (btnCerrarTabla) {
    btnCerrarTabla.addEventListener('click', cerrarFullScreenTabla);
  }

  // 11) Renderizar grid de Clubs y su overlay
clubsGrid = document.getElementById('clubsGrid');
clubOverlay = document.getElementById('clubCardOverlay');
cardContent = document.getElementById('clubCardContent');

Object.entries(clubsInfo).forEach(([id, club]) => {
  // 1) Crear contenedor de cada celda
  const cell = document.createElement('div');
  cell.className = 'club-item';

  // 2) Crear la etiqueta <img> para el escudo
  const img = document.createElement('img');
  img.src = club.imagen;
  img.alt = club.nombre;
  img.className = 'club-img';
  img.dataset.id = id;
  img.addEventListener('click', () => mostrarClub(id));

  // 3) Anidar solo la imagen en la celda (sin <p>)
  cell.appendChild(img);

  // 4) Añadir la celda al grid
  clubsGrid.appendChild(cell);
});

clubOverlay.addEventListener('click', (e) => {
  if (e.target === clubOverlay) {
    clubOverlay.classList.add('hidden');
    cardContent.innerHTML = '';
  }
});

  // 12) Añadir listener al botón de competiciones en menú flotante
  const btnComp = document.getElementById('btnCompeticiones');
  if (btnComp) {
    btnComp.addEventListener('click', showCompetitionsMenu);
  }
  
});

// ----------------------------------------------------
// Función para acelerar animación de título
// ----------------------------------------------------
function acelerarAnimacion() {
  if (!titulo) return;
  titulo.classList.add('acelerado');
  setTimeout(() => {
    titulo.classList.remove('acelerado');
  }, 3000);
}

// ----------------------------------------------------
// Funciones para fullscreen de tabla de clasificación
// ----------------------------------------------------
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

// ----------------------------------------------------
// Función para mostrar overlay con detalles de cada club
// ----------------------------------------------------
function mostrarClub(id) {
  const club = clubsInfo[id];
  if (!club) return;

  // 1) Asignar color de fondo a la tarjeta (.club-card-content).
  //    Si no hay bgColor, por defecto será blanco.
  if (club.bgColor) {
    cardContent.style.backgroundColor = club.bgColor;
  } else {
    cardContent.style.backgroundColor = '#ffffff';
  }

  // 2) Inyectar el contenido HTML con los datos del club
  cardContent.innerHTML = `
    <h3>${club.nombre}</h3>
    <img src="${club.imagen}" alt="${club.nombre}">
    <p><strong>Presidente:</strong> ${club.presidente}</p>
    <p><strong>Historia:</strong> ${club.historia}</p>
    <p><strong>Títulos:</strong> ${club.titulos}</p>
    <p>${club.descripcion}</p>
  `;

  // 3) Quitar la clase 'hidden' para mostrar el overlay
  clubOverlay.classList.remove('hidden');
}
