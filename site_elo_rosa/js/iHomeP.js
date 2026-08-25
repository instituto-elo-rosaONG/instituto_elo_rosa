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
     E) CARROSSEL "MISSÃO / VISÃO / PROPÓSITO"
        3 cartões (.m-card) dentro de #missionTrack, cada um com uma
        posição lógica: 'left', 'center' ou 'right'. Clicar num cartão
        lateral ou numa seta gira a ordem, aplica as classes de novo e
        dispara a animação de "pop" no cartão que assume o centro.
     ------------------------------------------------------------------------ */
  var missionTrack = document.getElementById('missionTrack');
  if (missionTrack) {
    var mCards = Array.prototype.slice.call(missionTrack.querySelectorAll('.m-card'));
    // ordem lógica inicial, da esquerda para a direita
    var order = ['left', 'center', 'right'];

    function applyOrder() {
      mCards.forEach(function (card, i) {
        card.classList.remove('is-left', 'is-center', 'is-right');
        card.classList.add('is-' + order[i]);
      });
    }

    function rotate(direction) {
      // direction: 1 = avança (próximo cartão vira central),
      //           -1 = volta (cartão anterior vira central)
      if (direction === 1) {
        order.push(order.shift());
      } else {
        order.unshift(order.pop());
      }
      applyOrder();

      var centerCard = mCards[order.indexOf('center')];
      if (centerCard) {
        centerCard.classList.remove('just-selected');
        void centerCard.offsetWidth;
        centerCard.classList.add('just-selected');
      }
    }

    // clicar num cartão lateral também o seleciona (centraliza)
    mCards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (card.classList.contains('is-left')) rotate(-1);
        else if (card.classList.contains('is-right')) rotate(1);
      });
      card.addEventListener('animationend', function (e) {
        if (e.animationName === 'cardSelectPop') card.classList.remove('just-selected');
      });
    });

    var arrowLeft = document.getElementById('mArrowLeft');
    var arrowRight = document.getElementById('mArrowRight');
    if (arrowLeft) arrowLeft.addEventListener('click', function () { rotate(-1); });
    if (arrowRight) arrowRight.addEventListener('click', function () { rotate(1); });

    // remove a animação de entrada depois que ela toca uma vez
    setTimeout(function () { missionTrack.classList.remove('carousel-intro'); }, 1000);

    // efeito "a quina desce": ao passar o mouse no cartão central, o canto
    // inferior do lado mais próximo do cursor baixa um pouco (via variável
    // CSS --corner), como se fosse puxado/selecionado
    var supportsHoverMission = window.matchMedia && window.matchMedia('(hover: hover)').matches;
    if (supportsHoverMission) {
      mCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          if (!card.classList.contains('is-center')) return;
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width; // 0 a 1
          // quanto mais perto da borda, mais a quina desce; e um leve giro
          var corner = 10 + Math.abs(px - 0.5) * 26;
          var tilt = (px - 0.5) * 6;
          card.style.setProperty('--corner', corner.toFixed(1) + 'px');
          card.style.setProperty('--tilt', tilt.toFixed(2) + 'deg');
        });
        card.addEventListener('mouseleave', function () {
          card.style.setProperty('--corner', '0px');
          card.style.setProperty('--tilt', '0deg');
        });
      });
    }
  }

});
