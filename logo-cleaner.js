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
                const logoWidth = Math.round(canvas.width * 0.2);  // Resmin %20'si
                const logoHeight = Math.round(canvas.height * 0.1); // Resmin %10'u
                const logoX = canvas.width - logoWidth - 5;
                const logoY = canvas.height - logoHeight - 5;
                
                // Logo bölgesinin üstünden renk örneği al
                const sampleY = logoY - 5;
                let lastColor = null;
                
                // Logo bölgesini satır satır doldur
                for (let y = logoY; y < logoY + logoHeight + 10; y++) {
                    // Her satır için soldan renk örneği al
                    const sampleData = ctx.getImageData(logoX - 20, y, 1, 1).data;
                    const currentColor = `rgb(${sampleData[0]}, ${sampleData[1]}, ${sampleData[2]})`;
                    
                    // Rengi kullan
                    ctx.fillStyle = currentColor;
                    ctx.fillRect(logoX, y, logoWidth + 10, 1);
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
