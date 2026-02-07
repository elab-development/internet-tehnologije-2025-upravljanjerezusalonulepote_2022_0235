import slatkica from '../assets/slatkica.png';
import '../styles/loader.css';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <img src={slatkica} alt="logo" className="loader-logo" />
      <div className="spinner"></div>
    </div>
  );
}
