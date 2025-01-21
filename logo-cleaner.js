function cleanLogo() {
    console.log("Logo temizleme başladı");
    const images = document.getElementsByTagName('img');
    
    Array.from(images).forEach((img) => {
        if (!img.dataset.processed) {
            console.log("Yeni resim işleniyor");
            img.dataset.processed = 'true';
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const processImage = () => {
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                
                // Önce tüm resmi çiz
                ctx.drawImage(img, 0, 0);
                
                // Logo bölgesinin koordinatlarını belirle
                const logoWidth = Math.round(canvas.width * 0.12);  // Logo genişliği
                const logoHeight = Math.round(canvas.height * 0.12); // Logo yüksekliği
                const logoX = canvas.width - logoWidth - 5;  // Logo X pozisyonu
                const logoY = canvas.height - logoHeight - 5; // Logo Y pozisyonu
                
                // Logo bölgesindeki pikselleri analiz et
                const imageData = ctx.getImageData(logoX - 10, logoY - 10, 1, 1);
                const color = {
                    r: imageData.data[0],
                    g: imageData.data[1],
                    b: imageData.data[2]
                };
                
                // Content-aware fill efekti
                for (let y = logoY - 5; y < logoY + logoHeight + 5; y++) {
                    for (let x = logoX - 5; x < logoX + logoWidth + 5; x++) {
                        const sampleX = x - logoWidth;
                        const sampleY = y;
                        const sample = ctx.getImageData(sampleX, sampleY, 1, 1).data;
                        ctx.fillStyle = `rgb(${sample[0]}, ${sample[1]}, ${sample[2]})`;
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
                
                const newImage = canvas.toDataURL();
                img.src = newImage;
                console.log("Logo temizlendi");
            };

            if (img.complete) {
                processImage();
            } else {
                img.onload = processImage;
            }
        }
    });
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'complete') {
    cleanLogo();
} else {
    document.addEventListener('DOMContentLoaded', cleanLogo);
}
