import { NavLink } from "react-router-dom";

import styles from './styles.module.css'

export function Nav() {
    return(
        <nav className={styles.navigatorLinks}>
            <NavLink 
                    to="/" 
                    title="pokemonDetails"
                    style={({isActive}) => ( isActive ? {
                        textDecoration: 'underline',
                       }
                     :{}
                     )
                   }>
                Pokemon Details
            </NavLink>
            <NavLink 
                    to="/pokemonlist" 
                    title="pokemonList"
                    style={({isActive}) => ( isActive ? {
                        textDecoration: 'underline',
                       }
                     :{}
                     )
                   }>
                Pokemon List
            </NavLink>
        </nav>
    );
}