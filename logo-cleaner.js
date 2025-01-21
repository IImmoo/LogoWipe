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
                const logoWidth = Math.round(canvas.width * 0.25);  // Logo genişliği
                const logoHeight = Math.round(canvas.height * 0.15); // Logo yüksekliği
                const logoX = canvas.width - logoWidth;
                const logoY = canvas.height - logoHeight;
                
                // Logo bölgesinin etrafından örnekler al
                const samples = [];
                const sampleSize = 10;
                
                // Üstten örnekler
                const topData = ctx.getImageData(logoX, logoY - sampleSize, logoWidth, sampleSize);
                
                // Soldan örnekler
                const leftData = ctx.getImageData(logoX - sampleSize, logoY, sampleSize, logoHeight);
                
                // Her piksel için en yakın örneği kullan
                for (let y = logoY; y < logoY + logoHeight; y++) {
                    for (let x = logoX; x < logoX + logoWidth; x++) {
                        // En yakın örnek pikseli bul
                        const sourceX = x - logoWidth;
                        const sourceY = y;
                        
                        // Örnek pikseli al
                        const sampleData = ctx.getImageData(sourceX, sourceY, 1, 1).data;
                        
                        // Pikseli yerleştir
                        ctx.fillStyle = `rgb(${sampleData[0]}, ${sampleData[1]}, ${sampleData[2]})`;
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
