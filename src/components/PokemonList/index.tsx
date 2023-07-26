import axios from "axios";
import { useEffect, useState } from "react";

import styles from './styles.module.css'

interface PokemonType {
    name: string
}

export function PokemonList() {
    let offset = -40

    const [isLoading, setIsLoading] = useState(false)
    const [allPokemons, setAllPokemons] = useState<string[]>([])
    const [scrollYPosition, setScrollYPosition] = useState(0)
    
    function getPokemon() {
        offset += 20
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
            .then(({data}) => {
                const newPokemons: string[] = []
                data.results.forEach((pokemon: PokemonType) => newPokemons.push(pokemon.name))
                setAllPokemons((prevPokemons) => [...prevPokemons, ...newPokemons])
                
                setIsLoading(false)
                
            },
            (err) => {
                console.log("Erro ao buscar pokémons: ", err)
                setIsLoading(false)
            })

    };
    
    function handleScroll(e: any) {
        if(window.innerHeight + e.target?.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setIsLoading(true)
            getPokemon()
        }
    }

    function getYAfterScroll() {
        setScrollYPosition(window.scrollY)
    }

    useEffect(() => {
        getPokemon()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('scroll', getYAfterScroll)
    }, []);

    return(
        <div className={styles.pokemonListContainer}>
            <ul>
                {
                    allPokemons.map((pokemonName, index) => {
                        return(
                            <li key={index}>
                                {`${index+1} - ${pokemonName}`}
                            </li>
                        );
                    })
                }
            </ul>

            {
                isLoading && <h1>Carregando...</h1>
            }

            {
                scrollYPosition > 4000 && <button className={styles.goToTopButton}><a href="#root">Ir para o topo</a></button>
            }
        </div>
    );
}