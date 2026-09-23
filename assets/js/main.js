/* ==========================================================================
   Vaz & Monteiro Advocacia
   Menu mobile, formulário qualificador (WhatsApp) e scroll reveal item a item.
   ========================================================================== */
(function () {
  'use strict';

  /* Número de atendimento, formato internacional, só dígitos:
     55 (Brasil) + 32 (DDD) + 999257395. Trocar aqui para apontar o
     formulário para outro WhatsApp. */
  var WHATSAPP_NUMBER = '5532999257395';

  /* ------------------------------------------------------------------------
     1. Menu mobile
     ------------------------------------------------------------------------ */
  var nav = document.querySelector('nav');
  var burger = document.getElementById('burger');
  var collapse = document.getElementById('navCollapse');

  if (nav && burger && collapse) {
    // o breakpoint mora no CSS: se o botão está escondido, estamos no desktop
    var isMobileNav = function () {
      return window.getComputedStyle(burger).display !== 'none';
    };

    var setMenu = function (open) {
      collapse.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    var isOpen = function () {
      return burger.getAttribute('aria-expanded') === 'true';
    };

    burger.addEventListener('click', function () {
      setMenu(!isOpen());
    });

    // fecha ao escolher um destino
    collapse.addEventListener('click', function (event) {
      if (event.target.closest('a') && isMobileNav()) setMenu(false);
    });

    // fecha ao clicar fora, inclusive sobre o véu que cobre a página
    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('.nav-collapse, #burger')) setMenu(false);
    });

    // fecha no Esc e devolve o foco ao botão
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setMenu(false);
        burger.focus();
      }
    });

    // ao passar para o desktop o painel não pode ficar preso aberto
    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        if (!isMobileNav() && isOpen()) setMenu(false);
      }, 120);
    });
  }

  /* ------------------------------------------------------------------------
     2. Formulário qualificador, abre o WhatsApp já preenchido
     ------------------------------------------------------------------------ */
  var form = document.getElementById('qform');
  var success = document.getElementById('formSuccess');

  if (form && success) {
    var fields = [
      { input: document.getElementById('nome'), error: document.getElementById('erro-nome') },
      { input: document.getElementById('area'), error: document.getElementById('erro-area') },
      { input: document.getElementById('descricao'), error: document.getElementById('erro-descricao') }
    ];

    var clearError = function (field) {
      field.input.removeAttribute('aria-invalid');
      field.input.removeAttribute('aria-describedby');
      field.error.hidden = true;
    };

    var showError = function (field) {
      field.input.setAttribute('aria-invalid', 'true');
      field.input.setAttribute('aria-describedby', field.error.id);
      field.error.hidden = false;
    };

    fields.forEach(function (field) {
      if (!field.input || !field.error) return;
      var eventName = field.input.tagName === 'SELECT' ? 'change' : 'input';
      field.input.addEventListener(eventName, function () {
        if (field.input.value.trim() !== '') clearError(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!field.input || !field.error) return;
        if (field.input.value.trim() === '') {
          showError(field);
          if (!firstInvalid) firstInvalid = field.input;
        } else {
          clearError(field);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var nome = fields[0].input.value.trim();
      var area = fields[1].input.value;
      var desc = fields[2].input.value.trim();

      /* Quebras de linha deixam a mensagem legível no WhatsApp, e o aviso final
         esclarece, para quem envia e para quem recebe, que o escritório é
         fictício e o site é peça de portfólio. */
      var msg = 'Olá, meu nome é ' + nome + '. Gostaria de solicitar uma avaliação.\n\n' +
                'Área: ' + area + '\n' +
                'Descrição: ' + desc + '\n\n' +
                'Aviso: esta mensagem vem de uma demonstração. O escritório ' +
                'Vaz & Monteiro Advocacia é fictício e este site faz parte de um ' +
                'portfólio de desenvolvimento. Em um projeto real, o número aqui ' +
                'seria o da empresa cliente.';
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);

      var opened = window.open(url, '_blank', 'noopener');
      if (!opened) window.location.href = url; // bloqueio de pop-up

      form.style.display = 'none';
      success.classList.add('is-shown');
      success.focus();
    });
  }

  /* ------------------------------------------------------------------------
     3. Scroll reveal, um item de cada vez
     Cada elemento .sr é observado individualmente: assim a lista entra em
     cascata, e não em bloco. A classe é alternada na ida e na volta.
     ------------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll('.sr');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(revealItems, function (el) {
      observer.observe(el);
    });
  } else {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------------
     4. Ano corrente no rodapé
     ------------------------------------------------------------------------ */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
