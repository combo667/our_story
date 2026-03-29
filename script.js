// Initialize Vanta.js 3D Background
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xe94560,
  backgroundColor: 0x0b0c10,
  points: 12.00,
  maxDistance: 22.00,
  spacing: 18.00,
  showDots: true
});

// Vanilla Tilt for 3D effect on chat boxes - disable on mobile for better touch experience
if (window.innerWidth > 768) {
  VanillaTilt.init(document.querySelectorAll(".chat-box"), {
    max: 3,
    speed: 400,
    glare: true,
    "max-glare": 0.15,
    gyroscope: true
  });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.chat-box, h2').forEach(el => {
  observer.observe(el);
});

// Floating Heart Cursor Trail Effect
let lastHeartTime = 0;
document.addEventListener('mousemove', function(e) {
  const now = Date.now();
  // Spawn heart particles periodically to maintain great performance
  if (now - lastHeartTime > 40) { 
    lastHeartTime = now;
    const heart = document.createElement('div');
    heart.className = 'heart-trail';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    // Slight random horizontal offset for beautiful organic flow
    const xOffset = (Math.random() - 0.5) * 20;
    heart.style.marginLeft = xOffset + 'px';
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
});

// Re-evaluate Vanilla Tilt on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && document.querySelectorAll(".chat-box")[0].vanillaTilt) {
        document.querySelectorAll(".chat-box").forEach(el => el.vanillaTilt.destroy());
    } else if (window.innerWidth > 768 && !document.querySelectorAll(".chat-box")[0].vanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".chat-box"), {
            max: 3, speed: 400, glare: true, "max-glare": 0.15, gyroscope: true
        });
    }
});
