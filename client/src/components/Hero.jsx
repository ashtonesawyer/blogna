/* Paper illustration for no additional need of img file. */
function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <div>
        <p className="hero-eyebrow">THE B’LOGNA COMMUNITY</p>
        <h1 id="hero-title">
          Good stories.
          <br />
          Fresh perspectives.
        </h1>
        <p className="hero-description">
          Read something new. Share what you know. A small corner of the internet for stories worth
          sharing.
        </p>
      </div>
      
      {/* The paper illustration is decorative. */}
      <div className="hero-note" aria-hidden="true">
        <p>
          Stay curious.
          <br />
          Keep writing.
        </p>
      </div>
    </section>
  );
}

export default Hero;
