import axios from "axios";
import { useEffect, useState } from "react";

import styles from './styles.module.css'

interface PokemonType {
    name: string
}

export function PokemonList() {
    let offset = -10

    const [isLoading, setIsLoading] = useState(false)

    const [allPokemons, setAllPokemons] = useState<string[]>([])
    
    const getPokemon = async () => {
        offset += 10
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
            .then(({data}) => {
                const newPokemons: string[] = []
                data.results.forEach((pokemon: PokemonType) => newPokemons.push(pokemon.name))
                
                setAllPokemons((prevPokemons) => [...prevPokemons, ...newPokemons])
                setIsLoading(false)
                
            },
            () => {
                console.log("ERRO")
                setIsLoading(false)
            })

    };
    
    function handleScroll(e: any) {
        if(window.innerHeight + e.target?.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setIsLoading(true)
            getPokemon()
        }
    }

    useEffect(() => {
        getPokemon()
        window.addEventListener('scroll', handleScroll)
        
    }, []);

    
    
    return(
        <div className={styles.pokemonListContainer}>
            <ul>
                {
                    allPokemons.map((pokemonName, index) => {
                        return(
                            <li key={index}>
                                {pokemonName}
                            </li>
                        );
                    })
                }
            </ul>

            {
                isLoading && <h1>Loading...</h1>
            }
        </div>
    );
}