import GlareButton from '../GlareButton';
import GlareOutlineButton from '../GlareOutlineButton';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>
          Hi, I’m <span>Thytus Benjamin</span>
        </h1>
        <p>Software Developer</p>
        <h2>
          I offer innovative solutions tailored to your business needs, combining technical expertise with strategic thinking.
        </h2>

        <div className="hero-buttons">
          <GlareButton href="#projects">View Projects</GlareButton>
          <GlareOutlineButton href="#contact">Contact Me</GlareOutlineButton>
        </div>
      </div>
    </section>
  );
}
