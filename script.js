// Muestra solo la subsección activa dentro de "inicio"
function showSubsection(id) {
  // ocultar todas las subsecciones
  document.querySelectorAll('#inicio .subsection').forEach(s => {
    s.classList.remove('visible');
    s.classList.add('hidden');
  });
  // desactivar todos los botones
  document.querySelectorAll('.subnav button').forEach(b => {
    b.classList.remove('active');
  });
  // activar el botón y mostrar la subsección
  document.querySelector(`.subnav button[data-target="${id}"]`).classList.add('active');
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('visible');
}

// Toggle menú flotante de burbujas
function toggleFloatingMenu() {
  document.getElementById("menuFlotante").classList.toggle("hidden");
}

// Navegación desde burbujas y ocultar el menú flotante
function goTo(id) {
  // mostrar sección principal
  document.querySelectorAll('main > section').forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('visible');
  });
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('visible');
  // ocultar menú flotante
  document.getElementById("menuFlotante").classList.add("hidden");
}








function showClubInfo(id) {
  document.querySelectorAll('.club-card').forEach(card => {
    card.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
  }
}









 // Animación con IntersectionObserver
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll('.noticia-card').forEach(card => {
      observer.observe(card);
    });

    // Expansión de imágenes
    const overlay = document.getElementById('imageOverlay');
    const expandedImg = document.getElementById('expandedImage');

    document.querySelectorAll('.noticia-card img').forEach(img => {
      img.addEventListener('click', () => {
        expandedImg.src = img.src;
        overlay.classList.add('active');
      });
    });

    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      expandedImg.src = '';
    });








// Mostrar jornada seleccionada
function selectJornada(n) {
  document.querySelectorAll('.jornada').forEach(j => {
    j.classList.add('hidden');
    j.classList.remove('visible');
  });
  const target = document.getElementById(`jornada-${n}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('visible');
  }
}

// Jornada por defecto
window.addEventListener("DOMContentLoaded", () => {
  selectJornada(5);
});













const titulo = document.getElementById('titulo');

function acelerarAnimacion() {
  titulo.classList.add('acelerado');
  setTimeout(() => {
    titulo.classList.remove('acelerado');
  }, 3000);
}

titulo.addEventListener('click', acelerarAnimacion);
titulo.addEventListener('touchstart', acelerarAnimacion);



















 // Efecto highlight al hacer click o presionar Enter/Espacio en marcador
  const scores = document.querySelectorAll('.score-inline');

  scores.forEach(score => {
    function highlight() {
      if(score.classList.contains('highlight')) return; // evitar stacking
      score.classList.add('highlight');
      score.setAttribute('aria-pressed', 'true');
      setTimeout(() => {
        score.classList.remove('highlight');
        score.setAttribute('aria-pressed', 'false');
      }, 1000);
    }
    score.addEventListener('click', highlight);
    score.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highlight();
      }
    });
  });








  function toggleMatch(element) {
    element.classList.toggle("expanded");
  }



 document.querySelectorAll('.match').forEach(match => {
    match.addEventListener('click', () => {
      match.classList.toggle('active');
    });
  });