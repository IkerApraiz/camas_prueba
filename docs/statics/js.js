
    // Lógica para cambiar tabs
    document.querySelectorAll('.tab-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetTab = link.getAttribute('data-tab');

        // Activar tab-link
        document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('tab-link-active'));
        link.classList.add('tab-link-active');

        // Mostrar tab correspondiente
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab-active'));
        const tabToShow = document.getElementById(targetTab);
        if (tabToShow) tabToShow.classList.add('tab-active');
      });
    });

    // Elementos
    const trigger = document.getElementById('smartSelectTrigger');
    const modal = document.getElementById('smartSelectModal');
    const closeBtn = document.getElementById('smartSelectClose');
    const options = document.getElementById('smartSelectOptions');
    const valueSpan = document.getElementById('smartSelectValue');
    const searchInput = document.getElementById('smartSelectSearch');

    // Abrir modal
    trigger.onclick = () => { modal.classList.add('active'); searchInput.value=''; filterOptions(''); };

    // Cerrar modal
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = e => { if(e.target === modal) modal.classList.remove('active'); };

    // Selección de opción
    options.onclick = e => {
      if(e.target.tagName === 'LI') {
        // Marcar seleccionado
        options.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
        e.target.classList.add('selected');
        // Mostrar valor
        valueSpan.textContent = e.target.textContent;
        modal.classList.remove('active');
      }
    };

    // Búsqueda
    searchInput.oninput = function() {
      filterOptions(this.value);
    };
    function filterOptions(query) {
      query = query.toLowerCase();
      options.querySelectorAll('li').forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    }

    // Lectura de código QR
    const btnScan = document.getElementById('btn-scan');
    const readerDiv = document.getElementById('reader');
    const resultadoDiv = document.getElementById('resultado');
    let html5QrcodeScanner;

    btnScan.onclick = function() {
      btnScan.style.display = 'none';
      readerDiv.style.display = 'block';
      html5QrcodeScanner = new Html5Qrcode("reader");
      html5QrcodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText, decodedResult) => {
          resultadoDiv.innerText = decodedText; // Muestra el texto del QR
          html5QrcodeScanner.stop();
          readerDiv.style.display = 'none';
          btnScan.style.display = 'block';
        },
        (errorMessage) => {
          // Puedes mostrar errores si lo deseas
        }
      );
    };

