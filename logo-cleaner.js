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
                
                // Resmin sağ alt köşesinden örnek renk al
                const sampleSize = 5;
                const imageData = ctx.getImageData(
                    canvas.width - logoWidth - 30, // Logo bölgesinin solundan
                    canvas.height - logoHeight - 30, // Logo bölgesinin üstünden
                    sampleSize,
                    sampleSize
                );
                
                // Ortalama rengi hesapla
                let r = 0, g = 0, b = 0;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    r += imageData.data[i];
                    g += imageData.data[i + 1];
                    b += imageData.data[i + 2];
                }
                const pixelCount = imageData.data.length / 4;
                r = Math.round(r / pixelCount);
                g = Math.round(g / pixelCount);
                b = Math.round(b / pixelCount);
                
                // Logo bölgesini çevreden alınan renkle doldur
                const logoWidth = Math.round(canvas.width * 0.15);
                const logoHeight = Math.round(canvas.height * 0.15);
                
                // Gradyan oluştur
                const gradient = ctx.createRadialGradient(
                    canvas.width - logoWidth/2,
                    canvas.height - logoHeight/2,
                    0,
                    canvas.width - logoWidth/2,
                    canvas.height - logoHeight/2,
                    logoWidth
                );
                
                gradient.addColorStop(0, `rgb(${r},${g},${b})`);
                gradient.addColorStop(1, ctx.getImageData(
                    canvas.width - logoWidth - 40,
                    canvas.height - logoHeight - 40,
                    1, 1
                ).data.slice(0, 3).join(','));
                
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    canvas.width - logoWidth - 10,
                    canvas.height - logoHeight - 10,
                    logoWidth + 20,
                    logoHeight + 20
                );
                
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
