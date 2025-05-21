
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
    const pantallazo = document.getElementById('pantallazo-verde');
    let html5QrcodeScanner;

    btnScan.onclick = function() {
      btnScan.style.display = 'none';
      resultadoDiv.style.display = 'none';
      readerDiv.style.display = 'block';
      html5QrcodeScanner = new Html5Qrcode("reader");
      html5QrcodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText, decodedResult) => {
          html5QrcodeScanner.stop();
          readerDiv.style.display = 'none';
          // Mostrar pantallazo verde con flex solo cuando sea necesario
          pantallazo.style.display = 'flex';
          pantallazo.style.alignItems = 'center';
          pantallazo.style.justifyContent = 'center';
          setTimeout(() => {
            pantallazo.style.display = 'none';
            resultadoDiv.innerText = decodedText;
            resultadoDiv.style.display = 'block';
            btnScan.style.display = 'block';
          }, 1000);
        },
        (errorMessage) => {
          // Puedes mostrar errores si lo deseas
        }
      );
    };

    // PWA

    if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js');
  });
}

