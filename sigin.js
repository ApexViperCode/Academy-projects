  const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = `rgba(${168 + Math.random() * 50}, 85, 247, ${Math.random() * 0.5 + 0.2})`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 90; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    
    const card = document.getElementById('cardContainer');
    document.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });


    window.onload = () => {
      const auth = localStorage.getItem('academy_auth');
      const name = localStorage.getItem('academy_user');
      if (auth === 'true' && name) {
        showProfileUI(name);
      }
    };

    function executeLogin(e) {
      e.preventDefault();
      const username = document.getElementById('userInput').value;
      localStorage.setItem('academy_auth', 'true');
      localStorage.setItem('academy_user', username);
      showProfileUI(username);
      window.location.href="htm.html";
    }

    function showProfileUI(name) {
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('profileBox').style.display = 'block';
      document.getElementById('displayUser').innerText = name;
      document.getElementById('userInitial').innerText = name.charAt(0).toUpperCase();
    }

    function executeLogout() {
      localStorage.removeItem('academy_auth');
      localStorage.removeItem('academy_user');
      location.reload();
    }