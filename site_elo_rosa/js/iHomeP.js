/* ==========================================================================
   iHomeP.js — INSTITUTO ELO ROSA — SCRIPT DA PÁGINA INICIAL (HOME)
   Convenção de nome: "iHomeP" = scripts específicos da Home Page.
   Quando novas páginas forem criadas, cada uma pode ter seu próprio arquivo
   (ex: iEventosP.js), mantendo os scripts organizados por página.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     A) ANIMAÇÃO "REVEAL" — elementos com a classe .reveal ganham .in
        quando entram na tela (usa IntersectionObserver).
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------------------
     B) BOTÃO FLUTUANTE DE CONTATO — aparece depois de rolar um pouco
     ------------------------------------------------------------------------ */
  var fab = document.getElementById('contactFab');
  if (fab) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) fab.classList.add('show');
      else fab.classList.remove('show');
    });
  }

  /* ------------------------------------------------------------------------
     C) MENU NOVO — hambúrguer, faixa que soma/some, pastilha e gaveta lateral
     ------------------------------------------------------------------------ */
  var nav         = document.getElementById('mainNav');
  var pill        = document.getElementById('navPill');
  var menuBtn     = document.getElementById('menuBtn');
  var menuBtnPill = document.getElementById('menuBtnPill');
  var drawer      = document.getElementById('menuDrawer');
  var overlay     = document.getElementById('menuOverlay');

  if (drawer) {
    var isOpen = false;

    function setOpen(v) {
      isOpen = v;
      drawer.classList.toggle('open', v);
      if (overlay) overlay.classList.toggle('show', v);
      if (menuBtn) menuBtn.classList.toggle('is-open', v);
      if (menuBtnPill) menuBtnPill.classList.toggle('is-open', v);
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(!isOpen);
      });
    }
    if (menuBtnPill) {
      menuBtnPill.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(!isOpen);
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function () { setOpen(false); });
    }
    var drawerLinks = drawer.querySelectorAll('a');
    for (var i = 0; i < drawerLinks.length; i++) {
      drawerLinks[i].addEventListener('click', function () { setOpen(false); });
    }
  }

  if (nav && pill) {
    var lastY = window.scrollY;
    var ticking = false;

    var updateNav = function () {
      var y = window.scrollY;
      var half = (document.documentElement.scrollHeight - window.innerHeight) / 2;
      var goingDown = y > lastY;
      var goingUp = y < lastY;

      if (y > half && goingDown) {
        nav.classList.add('nav--hidden');
        pill.classList.add('show');
      } else if (goingUp) {
        nav.classList.remove('nav--hidden');
        pill.classList.remove('show');
      }
      if (y <= 40) {
        nav.classList.remove('nav--hidden');
        pill.classList.remove('show');
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
  }

  /* ------------------------------------------------------------------------
     C.3) BOTÕES ".fx-btn" — "Descobrir", "fazer parte" e "eventos".
     ------------------------------------------------------------------------ */
  var fxButtons = document.querySelectorAll('.fx-btn');
  fxButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var href = btn.getAttribute('href') || '';
      var isAnchor = href.charAt(0) === '#';

      btn.classList.remove('is-clicked');
      void btn.offsetWidth;
      btn.classList.add('is-clicked');

      if (isAnchor) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (href && href !== '#') {
        e.preventDefault();
        setTimeout(function () {
          window.location.href = href;
        }, 260);
      }
    });
    btn.addEventListener('animationend', function () {
      btn.classList.remove('is-clicked');
    });
  });

  /* ------------------------------------------------------------------------
     C.4) ÍCONE "SPONSORED BY" (zaluvin) — ao clicar, dispara o efeito de
          bolha (cresce - diminui - volta), somado à rotação do hover.
          Este link abre em NOVA ABA (target="_blank"), então, diferente
          dos botões .fx-btn, aqui NÃO usamos preventDefault: a navegação
          segue seu curso normal enquanto a animação toca por cima.
     ------------------------------------------------------------------------ */
  var sponsorIcon = document.querySelector('.footer-sponsor-icon');
  if (sponsorIcon) {
    sponsorIcon.addEventListener('click', function () {
      sponsorIcon.classList.remove('is-clicked');
      void sponsorIcon.offsetWidth;
      sponsorIcon.classList.add('is-clicked');
    });
    sponsorIcon.addEventListener('animationend', function () {
      sponsorIcon.classList.remove('is-clicked');
    });
  }

  /* ------------------------------------------------------------------------
     D) COPIAR E-MAIL / TELEFONE / PIX DO RODAPÉ
     ------------------------------------------------------------------------ */
  var emailLink = document.querySelector('.js-copy-email');
  var emailHint = document.getElementById('emailCopyHint');
  if (emailLink && emailHint) {
    emailLink.addEventListener('click', function () {
      var text = emailLink.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      emailHint.classList.add('show');
      setTimeout(function () { emailHint.classList.remove('show'); }, 1600);
    });
  }

  var phoneBtn = document.querySelector('.js-copy-phone');
  var phoneHint = document.getElementById('phoneCopyHint');
  if (phoneBtn && phoneHint) {
    phoneBtn.addEventListener('click', function () {
      var text = phoneBtn.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      phoneHint.classList.add('show');
      setTimeout(function () { phoneHint.classList.remove('show'); }, 1600);
    });
  }

  var pixBtn = document.querySelector('.js-copy-pix');
  var pixHint = document.getElementById('pixCopyHint');
  if (pixBtn && pixHint) {
    pixBtn.addEventListener('click', function () {
      var text = pixBtn.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      pixHint.classList.add('show');
      setTimeout(function () { pixHint.classList.remove('show'); }, 1600);
    });
  }

  /* ------------------------------------------------------------------------
     E) CARTAS "TIRAR O LIVRO DA ESTANTE" — Missão/Visão/Propósito
     ------------------------------------------------------------------------ */
  var supportsHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (supportsHover) {
    var tiltWraps = document.querySelectorAll('.mission-card-wrap');
    var BOOK_TILT = 17;

    tiltWraps.forEach(function (wrap) {
      var card = wrap.querySelector('[data-tilt-card]');
      if (!card) return;

      card.style.transformOrigin = 'left center';

      wrap.addEventListener('mouseenter', function () {
        card.style.transform = 'rotateY(-' + BOOK_TILT + 'deg)';
      });

      wrap.addEventListener('mousemove', function (e) {
        var rect = wrap.getBoundingClientRect();
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var extraTiltX = -py * 8;
        card.style.transform =
          'rotateY(-' + BOOK_TILT + 'deg) rotateX(' + extraTiltX + 'deg) translateZ(14px)';
      });

      wrap.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

});
