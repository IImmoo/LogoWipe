console.log("Content script yüklendi");

function initLogoWipe() {
    console.log("LogoWipe başlatılıyor");
    cleanLogo();
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', initLogoWipe);

// DOM değişikliklerini izle
const observer = new MutationObserver(() => {
    cleanLogo();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
