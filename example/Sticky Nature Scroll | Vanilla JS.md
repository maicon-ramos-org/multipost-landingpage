<header class="hero">
  <div class="hero__bg"></div>
  <div class="hero__content">
    <h1 class="hero__title">Beyond the Horizon</h1>
    <p class="hero__subtitle">Discover the most breathtaking landscapes our planet has to offer.</p>
    <button class="hero__badge">Start Exploring</button>
  </div>
</header>

<section class="scroll-section" id="scrollSection">
  <div class="scroll-section__sticky">
    <div class="scroll-section__track" id="track">
      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop" alt="Northern Lights" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Aurora Borealis</h3>
          <p class="card__desc">Witness the celestial dance of lights in the frozen wilderness of Iceland.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.pexels.com/photos/1366907/pexels-photo-1366907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Dolomites" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">The Dolomites</h3>
          <p class="card__desc">Jagged peaks and rolling meadows define this Italian alpine paradise.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" alt="Ocean Coast" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Amalfi Coast</h3>
          <p class="card__desc">Vertical landscapes, pastel villages, and the shimmering Tyrrhenian Sea.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop" alt="Forest" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Pacific Northwest</h3>
          <p class="card__desc">Ancient misty forests and rugged coastlines stretching endlessly.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" alt="Mountains" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Swiss Alps</h3>
          <p class="card__desc">The roof of Europe, offering pristine snow and world-class serenity.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.pexels.com/photos/1731660/pexels-photo-1731660.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Desert" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Sahara Dunes</h3>
          <p class="card__desc">Golden sands shifting under the intense sun and starlit nights.</p>
        </div>
      </article>

      <article class="card">
        <div class="card__image-wrapper">
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop" alt="Lake" class="card__image">
        </div>
        <div class="card__content">
          <h3 class="card__title">Banff National Park</h3>
          <p class="card__desc">Turquoise glacial lakes reflecting the majesty of the Canadian Rockies.</p>
        </div>
      </article>
    </div>
  </div>
</section>

<footer class="outro">
  <h2 class="outro__title">Your Journey Awaits</h2>
  <p class="outro__text">Book your next adventure.</p>
</footer>

:root {
  --bg-color: #000000;
  --card-bg: #0a0a0a;
  --border-color: #222222;
  --text-primary: #ededed;
  --text-secondary: #888888;
  --text-neutral: #000000;

  --card-width: clamp(280px, 30vw, 420px);
  --card-height: clamp(400px, 60vh, 550px);
  --gap: clamp(1rem, 2vw, 2.5rem);

  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-stack);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  padding: 0 clamp(1rem, 5vw, 4rem);
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

.hero__content {
  z-index: 1;
  text-align: center;
  max-width: 900px;
}

.hero__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #fff 0%, #aaa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: clamp(1rem, 2vh, 1.5rem);
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: clamp(2rem, 4vh, 3rem);
  font-weight: 400;
  letter-spacing: -0.01em;
}

.hero__badge {
  font-size: 0.875rem;
  color: var(--text-neutral);
  border: 1px solid var(--border-color);
  padding: 10px 24px;
  border-radius: 99px;
  transition: background 0.3s;
  cursor: pointer;
}

.hero__badge:hover {
  background: #111;
  color: var(--text-primary);
}

.scroll-section {
  height: 400vh;
  position: relative;
  background: var(--bg-color);
}

.scroll-section__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.scroll-section__track {
  display: flex;
  gap: var(--gap);
  padding-left: clamp(2rem, 10vw, 8rem);
  width: max-content;
  will-change: transform;
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease;
  user-select: none;
}

.card:hover {
  transform: translateY(-8px);
  border-color: #444;
}

.card__image-wrapper {
  width: 100%;
  height: 60%;
  overflow: hidden;
  background: #111;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: grayscale(20%);
}

.card:hover .card__image {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.card__content {
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40%;
}

.card__title {
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.card__desc {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  color: var(--text-secondary);
  line-height: 1.5;
}

.outro {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--border-color);
  background: radial-gradient(circle at 50% 0%, #111 0%, #000 70%);
}

.outro__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  background: linear-gradient(180deg, #fff, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.outro__text {
  color: var(--text-secondary);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}


document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("scrollSection");
  const track = document.getElementById("track");

  const updatePosition = () => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    const scrollDist = sectionHeight - viewportHeight;
    const scrolled = -sectionTop;

    let progress = scrolled / scrollDist;
    progress = Math.max(0, Math.min(1, progress));

    const trackWidth = track.scrollWidth;
    const maxTrans = trackWidth - window.innerWidth + window.innerWidth * 0.1;

    const translateX = -(progress * maxTrans);

    track.style.transform = `translate3d(${translateX}px, 0, 0)`;
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updatePosition();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener("resize", updatePosition);
  updatePosition();
});
