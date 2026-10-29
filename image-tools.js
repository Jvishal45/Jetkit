(() => {
  const fileInput = document.querySelector('#image-file');
  if (!fileInput) return;
  const status = document.querySelector('#image-status');
  const preview = document.querySelector('#image-preview');
  const stats = document.querySelector('#image-stats');
  const download = document.querySelector('#download-image');
  const processBtn = document.querySelector('#process-image');
  const isResize = Boolean(document.querySelector('#width'));
  let selectedImage = null;
  let originalFile = null;
  let outputUrl = null;

  const formatBytes = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes/1024).toFixed(1)} KB` : `${(bytes/1048576).toFixed(2)} MB`;
  function resetOutput() {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    outputUrl = null;
    download.removeAttribute('href');
    download.classList.add('disabled-link');
    download.setAttribute('aria-disabled', 'true');
    stats.textContent = '';
  }
  fileInput.addEventListener('change', () => {
    resetOutput(); selectedImage = null; originalFile = fileInput.files[0] || null;
    if (!originalFile) { status.textContent = 'Choose an image to begin.'; return; }
    if (!['image/jpeg','image/png','image/webp'].includes(originalFile.type)) { status.textContent = 'Please choose a JPG, PNG, or WebP image.'; fileInput.value = ''; return; }
    if (originalFile.size > 10 * 1024 * 1024) { status.textContent = 'This file is over 10 MB. Choose a smaller image.'; fileInput.value = ''; return; }
    const image = new Image();
    image.onload = () => {
      selectedImage = image;
      if (isResize) { document.querySelector('#width').value = image.naturalWidth; document.querySelector('#height').value = image.naturalHeight; }
      preview.innerHTML = ''; const img = document.createElement('img'); img.src = URL.createObjectURL(originalFile); img.alt = 'Original image preview'; preview.appendChild(img);
      status.textContent = `Loaded ${image.naturalWidth} × ${image.naturalHeight} pixels (${formatBytes(originalFile.size)}).`;
    };
    image.onerror = () => { status.textContent = 'Could not read this image. Try another file.'; };
    image.src = URL.createObjectURL(originalFile);
  });
  const quality = document.querySelector('#quality');
  if (quality) quality.addEventListener('input', () => document.querySelector('#quality-label').textContent = `${quality.value}%`);

  processBtn.addEventListener('click', () => {
    if (!selectedImage || !originalFile) { status.textContent = 'Choose a valid image first.'; return; }
    resetOutput();
    let width, height;
    if (isResize) {
      width = Number(document.querySelector('#width').value);
      height = Number(document.querySelector('#height').value);
      if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 6000 || height > 6000) { status.textContent = 'Enter width and height between 1 and 6000 pixels.'; return; }
      if (document.querySelector('#keep-ratio').checked) {
        const ratio = selectedImage.naturalWidth / selectedImage.naturalHeight;
        if (document.activeElement?.id === 'height') width = Math.max(1, Math.round(height * ratio));
        else height = Math.max(1, Math.round(width / ratio));
        document.querySelector('#width').value = width; document.querySelector('#height').value = height;
      }
    } else { width = selectedImage.naturalWidth; height = selectedImage.naturalHeight; }
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    const type = isResize ? document.querySelector('#resize-format').value : document.querySelector('#format').value;
    if (type === 'image/jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,width,height); }
    ctx.drawImage(selectedImage, 0, 0, width, height);
    const q = quality ? Number(quality.value) / 100 : 0.88;
    canvas.toBlob(blob => {
      if (!blob) { status.textContent = 'Could not create the output. Try another format.'; return; }
      outputUrl = URL.createObjectURL(blob);
      preview.innerHTML = ''; const img = document.createElement('img'); img.src = outputUrl; img.alt = 'Processed image preview'; preview.appendChild(img);
      download.href = outputUrl;
      const ext = type.split('/')[1].replace('jpeg','jpg');
      download.download = `jetkit-${isResize ? 'resized' : 'compressed'}.${ext}`;
      download.classList.remove('disabled-link'); download.setAttribute('aria-disabled','false');
      const saved = originalFile.size ? Math.round((1 - blob.size / originalFile.size) * 100) : 0;
      stats.textContent = `Output: ${width} × ${height} px · ${formatBytes(blob.size)} · ${saved >= 0 ? `${saved}% smaller` : `${Math.abs(saved)}% larger`} than original`;
      status.textContent = 'Done! Preview the result and download it when ready.';
    }, type, q);
  });
})();