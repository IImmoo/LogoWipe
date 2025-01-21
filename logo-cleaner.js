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
                
                ctx.drawImage(img, 0, 0);
                
                // Logo bölgesini temizle - boyutları ve konumu ayarladım
                ctx.fillStyle = '#FFFFFF';
                const logoWidth = Math.round(canvas.width * 0.15);  // %15'e düşürdüm
                const logoHeight = Math.round(canvas.height * 0.15); // %15'e düşürdüm
                ctx.fillRect(
                    canvas.width - logoWidth - 5,  // Sağ kenardan uzaklığı azalttım
                    canvas.height - logoHeight - 5, // Alt kenardan uzaklığı azalttım
                    logoWidth,
                    logoHeight
                );
                
                // Kenarları yumuşatmak için
                ctx.fillStyle = '#FFFFFF';
                ctx.globalAlpha = 0.5;
                ctx.fillRect(
                    canvas.width - logoWidth - 7,
                    canvas.height - logoHeight - 7,
                    logoWidth + 4,
                    logoHeight + 4
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
