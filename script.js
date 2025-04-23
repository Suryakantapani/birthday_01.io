const messages = [
    "You are the sparkle of our lives, Barsa! 🌟",
    "Your smile makes every moment better 😊",
    "Wishing you endless happiness! 🎁",
    "You're a true blessing, Barsa! 💖",
    "May all your dreams come true! 🌈",
    "Another year of being awesome! 🎊"
];

const confettiColors = [
    '#ff6f91', '#ff9671', '#ffc75f', '#f9f871', 
    '#0089ba', '#00c9a7', '#88d8b0', '#ff6b6b'
];
const balloonColors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41'
];
const balloonMessages = [
    'Happy', 'Birthday', 'Barsa', '🎉', 'Many', 'More', 'Years', '🎂',
    'HBD', '💕', 'Joy', 'Love', 'Celebrate', 'Party', 'Wishes', '✨'
];
 const birthdayDate = new Date('2026-04-15');

const messageElement = document.getElementById('messageSlider');
const countdownElement = document.getElementById('countdown');
const typewriterElement = document.getElementById('typewriter');
const balloonContainer = document.getElementById('balloonContainer');
const confettiContainer = document.getElementById('confettiContainer');
const cartoonContainer = document.getElementById('cartoonContainer');
const cartoonImage = document.getElementById('cartoonImage');
const musicPlayer = document.getElementById('musicPlayer');
const musicToggle = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');
const celebrateButton = document.getElementById('celebrateButton');
const boomButton = document.getElementById('boomButton');
const messageIndicators = document.getElementById('messageIndicators');
const leftPhotoFrame = document.getElementById('leftPhotoFrame');
const rightPhotoFrame = document.getElementById('rightPhotoFrame');

 let currentMessageIndex = 0;
let isTyping = false;
let photoSlidePosition = 0;
let touchStartX = 0;
let touchEndX = 0;

 document.addEventListener('DOMContentLoaded', function() {
     initializeMessageSlider();
    
     updateCountdown();
    setInterval(updateCountdown, 1000);
     setTimeout(() => typeWriter("aka my sweet sister Andua 🦎 💕"), 1000);
     initializePhotoCarousels();
    setInterval(() => createBalloon(false), 3000);
    setTimeout(startMinorConfetti, 1500);
    initializeMusicPlayer();
    addTouchListeners();
});

 function initializeMessageSlider() {
     messages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('message-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showMessage(index));
        messageIndicators.appendChild(dot);
    });
    
     setInterval(rotateMessages, 6000);
}

function rotateMessages() {
    showMessage((currentMessageIndex + 1) % messages.length);
}

function showMessage(index) {
     const indicators = messageIndicators.querySelectorAll('.message-dot');
    indicators.forEach(dot => dot.classList.remove('active'));
    indicators[index].classList.add('active');
    
     messageElement.style.opacity = 0;
    
     setTimeout(() => {
        currentMessageIndex = index;
        messageElement.textContent = messages[currentMessageIndex];
        messageElement.style.opacity = 1;
    }, 500);
}

 function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = birthdayDate - now;
    
    if (timeRemaining <= 0) {
         countdownElement.textContent = "Happy Birthday Today! 🎉🎂";
        return;
    }
    
     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
     countdownElement.textContent = `Countdown to Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

 function typeWriter(text, charIndex = 0) {
    if (isTyping) return;
    
    isTyping = true;
    
    if (charIndex < text.length) {
        typewriterElement.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(() => {
            isTyping = false;
            typeWriter(text, charIndex);
        }, 100);
    } else {
        isTyping = false;
    }
}

 function initializePhotoCarousels() {
     const leftPrevBtn = leftPhotoFrame.querySelector('.prev-btn');
    const leftNextBtn = leftPhotoFrame.querySelector('.next-btn');
    const leftTrack = leftPhotoFrame.querySelector('.photo-track');
    const leftSlides = leftTrack.querySelectorAll('.photo-slide');
    
    leftPrevBtn.addEventListener('click', () => changeSlide(leftTrack, leftSlides, -1));
    leftNextBtn.addEventListener('click', () => changeSlide(leftTrack, leftSlides, 1));
    
     const rightPrevBtn = rightPhotoFrame.querySelector('.prev-btn');
    const rightNextBtn = rightPhotoFrame.querySelector('.next-btn');
    const rightTrack = rightPhotoFrame.querySelector('.photo-track');
    const rightSlides = rightTrack.querySelectorAll('.photo-slide');
    
    rightPrevBtn.addEventListener('click', () => changeSlide(rightTrack, rightSlides, -1));
    rightNextBtn.addEventListener('click', () => changeSlide(rightTrack, rightSlides, 1));
    
     startAutoScroll(leftTrack, leftSlides, 1, 5000);  
    startAutoScroll(rightTrack, rightSlides, -1, 5500);  
}

function changeSlide(track, slides, direction) {
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;
    
     photoSlidePosition = (photoSlidePosition + direction + totalSlides) % totalSlides;
    
     track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${photoSlidePosition * slideWidth}px)`;
}

function startAutoScroll(track, slides, direction, interval) {
    setInterval(() => {
        const slideWidth = slides[0].offsetWidth;
        const totalSlides = slides.length;
        
         let currentPosition = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '') || 0) / -slideWidth;
        currentPosition = (currentPosition + direction + totalSlides) % totalSlides;
        
         track.style.transition = 'transform 1.5s ease';
        track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
    }, interval);
}

 function createBalloon(isSpecial = false) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    if (isSpecial) {
         balloon.classList.add('special-balloon');
        balloon.style.left = '50%';
        balloon.style.transform = 'translateX(-50%)';
        balloon.style.bottom = '20vh';
        balloon.style.width = 'auto';
        balloon.style.height = 'auto';
        balloon.style.padding = '15px';
        balloon.style.zIndex = '30';
        balloon.style.fontSize = 'clamp(16px, 3vw, 24px)';
        balloon.style.backgroundColor = '#FF5252';
        balloon.style.boxShadow = '0 0 20px rgba(255, 82, 82, 0.7)';
        balloon.style.animation = 'specialBalloonFloat 6s ease-in-out infinite';
        balloon.innerHTML = `<div class="balloon-text">Happy Birthday<br>Barsa! 🎂</div>`;
    } else {
         balloon.style.left = `${Math.random() * 80 + 10}%`;
        
         const animationDuration = Math.random() * 3 + 8;
        balloon.style.animationDuration = `${animationDuration}s`;
        
         balloon.style.animation = `balloonRise ${animationDuration}s linear forwards, balloonSway 3s ease-in-out infinite alternate`;
        const colorIndex = Math.floor(Math.random() * balloonColors.length);
        balloon.style.backgroundColor = balloonColors[colorIndex];
        const messageIndex = Math.floor(Math.random() * balloonMessages.length);
        balloon.innerHTML = `<div class="balloon-text">${balloonMessages[messageIndex]}</div>`;
        
         setTimeout(() => {
            balloon.remove();
        }, animationDuration * 1000);
    }
    balloonContainer.appendChild(balloon);
}

 function createConfetti(count = 150) {
    for (let i = 0; i < count; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        const size = Math.floor(Math.random() * 8) + 4;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
         const colorIndex = Math.floor(Math.random() * confettiColors.length);
        confetti.style.backgroundColor = confettiColors[colorIndex];
        
         const shapes = ['square', 'rectangle', 'circle', 'triangle'];
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        
        if (shapes[shapeIndex] === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shapes[shapeIndex] === 'rectangle') {
            confetti.style.width = `${size * 1.5}px`;
            confetti.style.height = `${size}px`;
        } else if (shapes[shapeIndex] === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = `${size/2}px solid transparent`;
            confetti.style.borderRight = `${size/2}px solid transparent`;
            confetti.style.borderBottom = `${size}px solid ${confettiColors[colorIndex]}`;
        }
        
         confetti.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
        
         confettiContainer.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function startMinorConfetti() {
    createConfetti(30);
}

function startMajorConfetti() {
    createConfetti(150);
}

 celebrateButton.addEventListener('click', function() {
     cartoonContainer.style.display = 'block';
    
     cartoonImage.style.animation = 'none';
    cartoonImage.offsetHeight;  
    cartoonImage.style.animation = 'cakeCutting 2s ease-in-out';
    
     playSound('https://www.soundjay.com/buttons/sounds/button-09.mp3');
    
     createConfetti(50);
    
     const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.classList.add('photo-pulse');
        setTimeout(() => {
            frame.classList.remove('photo-pulse');
        }, 2000);
    });
    
     document.body.classList.add('celebrate-bg');
    setTimeout(() => {
        document.body.classList.remove('celebrate-bg');
    }, 3000);
    
     setTimeout(() => {
        cartoonContainer.style.opacity = '0';
        setTimeout(() => {
            cartoonContainer.style.display = 'none';
            cartoonContainer.style.opacity = '1';
        }, 500);
    }, 3000);
});

boomButton.addEventListener('click', function() {
     startMajorConfetti();
    
     for (let i = 0; i < 10; i++) {
        setTimeout(() => createBalloon(false), i * 200);
    }
    
     playSound('https://www.soundjay.com/human/sounds/applause-01.mp3');
});

 function initializeMusicPlayer() {
     musicPlayer.volume = volumeSlider.value / 100;
    
     musicToggle.addEventListener('click', toggleMusic);
    
     volumeSlider.addEventListener('input', function() {
        musicPlayer.volume = this.value / 100;
        
         if (this.value == 0) {
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.value < 50) {
            musicToggle.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
}

function toggleMusic() {
    if (musicPlayer.paused) {
        musicPlayer.play().catch(e => {
            console.log('Auto-play prevented:', e);
         });
        updateMusicIcon();
    } else {
        musicPlayer.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function updateMusicIcon() {
    if (musicPlayer.volume === 0) {
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (musicPlayer.volume < 0.5) {
        musicToggle.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

 function playSound(url) {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound play prevented:', e));
}

 function addTouchListeners() {
     addSwipeToElement(leftPhotoFrame);
    addSwipeToElement(rightPhotoFrame);
    
     boomButton.addEventListener('touchstart', handleDoubleTap);
}

function addSwipeToElement(element) {
    element.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    element.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(element);
    }, { passive: true });
}

function handleSwipe(element) {
    const track = element.querySelector('.photo-track');
    const slides = track.querySelectorAll('.photo-slide');
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
         changeSlide(track, slides, 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
         changeSlide(track, slides, -1);
    }
}

 let lastTap = 0;
function handleDoubleTap(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
        boomButton.click();
    }
    
    lastTap = currentTime;
}

 function checkForReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
if (checkForReducedMotion()) {
    document.body.classList.add('reduced-motion');
}

window.addEventListener('load', () => {
    const music = document.getElementById('musicPlayer');
    music.play().catch((error) => {
        const enableAudio = () => {
            music.play();
            document.removeEventListener('click', enableAudio);
        };
        document.addEventListener('click', enableAudio);
    });
});
const photoTrack = document.querySelector('#leftPhotoFrame .photo-track');
const slides = document.querySelectorAll('#leftPhotoFrame .photo-slide');
let currentIndex = 0;

setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    const scrollAmount = slides[0].offsetWidth + 10; // width + margin
    photoTrack.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: 'smooth'
    });
}, 3000);