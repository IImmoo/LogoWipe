function cleanLogo() {
    console.log("Logo temizleme başladı");
    const images = document.getElementsByTagName('img');
    
    Array.from(images).forEach((img) => {
        if (!img.dataset.processed) {
            console.log("Yeni resim işleniyor");
            img.dataset.processed = 'true';
            
            const canvas = document.createElement('canvas');
            // willReadFrequently özelliğini ekleyelim
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            const processImage = () => {
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                
                // Resmi çiz
                ctx.drawImage(img, 0, 0);
                
                // Sağ alt köşedeki logo bölgesini belirle
                const logoWidth = Math.round(canvas.width * 0.15);
                const logoHeight = Math.round(canvas.height * 0.15);
                const logoX = canvas.width - logoWidth - 5;
                const logoY = canvas.height - logoHeight - 5;
                
                // Logo bölgesinin üstünden renk örneği al
                const sampleX = logoX;
                const sampleY = logoY - 2;
                const sampleColor = ctx.getImageData(sampleX, sampleY, 1, 1).data;
                
                // Logo bölgesini çevreden alınan renkle doldur
                ctx.beginPath();
                ctx.rect(logoX, logoY, logoWidth + 5, logoHeight + 5);
                ctx.fillStyle = `rgb(${sampleColor[0]}, ${sampleColor[1]}, ${sampleColor[2]})`;
                ctx.fill();
                
                // Resmi güncelle
                img.src = canvas.toDataURL();
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
