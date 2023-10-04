import { NavLink } from "react-router-dom"
import video from '../../assets/videos/pokemon.mp4';
import pokemonText from '../../assets/images/pokemon.png';
import landingStyles from "../Landing/Landing.module.css"

const Landing = () => {
  return (
    <div className={landingStyles.landingContainer}>
      <video className={landingStyles.videoBg} autoPlay loop muted>
        <source src={`${video}#t=180,420`} type="video/mp4"/>
      </video>
      <div className={landingStyles.pokemonTextContainer}>
        <h1 className={landingStyles.principalTitle}>Welcome to</h1>
        <img src={pokemonText} alt="Pokemon" className={landingStyles.pokemonText}/>
        <div className={landingStyles.btnMention}><span>Let's explore!</span></div>
      </div>
      <NavLink to="/home">
        <div className={landingStyles.btnPokemon}>
          <div className={landingStyles.btnGroup}>
              <div className={landingStyles.ball}>
              <button>
                <div className={landingStyles.pokemonBall}></div><div className={landingStyles.ballText}>START<span data-letters="GO!"></span><span data-letters="GO!"></span></div>
              </button>
              </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Landing;