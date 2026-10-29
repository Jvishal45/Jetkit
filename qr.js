(() => {
  const input = document.querySelector('#qr-input');
  if (!input) return;
  const output = document.querySelector('#qr-output');
  const status = document.querySelector('#qr-status');
  const generate = document.querySelector('#generate-btn');
  const download = document.querySelector('#download-qr');
  let canvasOrImage = null;
  generate.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) { status.textContent = 'Enter a URL or some text first.'; input.focus(); return; }
    if (text.length > 1800) { status.textContent = 'Please shorten your text to 1800 characters or fewer.'; return; }
    if (typeof QRCode === 'undefined') { status.textContent = 'QR generator library did not load. Check your internet connection and reload this page.'; return; }
    output.innerHTML = '';
    const size = Number(document.querySelector('#qr-size').value);
    const color = document.querySelector('#qr-color').value;
    try {
      const holder = document.createElement('div');
      output.appendChild(holder);
      new QRCode(holder, { text, width: size, height: size, colorDark: color, colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
      window.setTimeout(() => {
        const canvas = holder.querySelector('canvas');
        const image = holder.querySelector('img');
        if (canvas) canvasOrImage = canvas;
        else if (image) canvasOrImage = image;
        if (canvasOrImage) {
          download.disabled = false;
          status.textContent = 'QR code created. Scan it with your phone before sharing or printing.';
        } else {
          status.textContent = 'Could not create the QR code. Try shorter text.';
        }
      }, 100);
    } catch (e) {
      status.textContent = 'Could not create the QR code. Try shorter text.';
    }
  });
  download.addEventListener('click', () => {
    if (!canvasOrImage) return;
    const link = document.createElement('a');
    link.download = 'jetkit-qr-code.png';
    link.href = canvasOrImage.tagName.toLowerCase() === 'canvas' ? canvasOrImage.toDataURL('image/png') : canvasOrImage.src;
    link.click();
  });
})();