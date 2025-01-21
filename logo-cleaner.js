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
                
                // Logo bölgesini temizle - boyutları büyüttüm
                ctx.fillStyle = '#FFFFFF';
                const logoWidth = Math.round(canvas.width * 0.25);  // %25'e çıkardım
                const logoHeight = Math.round(canvas.height * 0.25); // %25'e çıkardım
                
                // Ana logo alanını temizle
                ctx.fillRect(
                    canvas.width - logoWidth,  // Sağ kenara tam dayalı
                    canvas.height - logoHeight, // Alt kenara tam dayalı
                    logoWidth,
                    logoHeight
                );
                
                // Ekstra güvenlik için biraz daha geniş alan temizle
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
