import { FiArrowRight } from "react-icons/fi";
import iconSvg from "../assets/icon.svg";
import previewImg from "../assets/preview.png";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <Header />
      <Hero />
      <Preview />
    </section>
  );
}

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="page-header">
      <div className="page-icon-box">
        <img className="home-page-icon" src={iconSvg} alt="Icon" />
        <h1>Notes</h1>
      </div>
      <div></div>
      <div className="try-button">
        <button
          onClick={() => {
            navigate("/notes");
          }}
        >
          <p>Try now</p>
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div>
        <h1>Effortless Note-Taking, Elevated Productivity</h1>
        <p>
          Simplify your thoughts, amplify your focus. Experience seamless
          note-taking that adapts to you, making every idea effortlessly
          accessible and organized.
        </p>

        <div className="try-for-free">
          <button
            onClick={() => {
              navigate("/notes");
            }}
          >
            <p>Try for free</p> <FiArrowRight className="try-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Preview = () => {
  return (
    <section className="preview-section">
      <div className="preview-border">
        <img className="preview-image" src={previewImg} />
      </div>
    </section>
  );
};
