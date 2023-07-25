import { useEffect, useState } from "react";
import axios from 'axios'
import styles from './styles.module.css'
import useDebounce from "../../Hooks/useDebounce";

interface PokemonDataType {
    id: number,
    name: string,
    sprites?: {
        other: {
            dream_world: {
                front_default: string;
            }
        }
    }
}

const PokemonNotFound = {
    id: 0,
    name: "not found"
}

export function PokemonDetails() {
    
    const [pokemonNumber, setPokemonNumber] = useState('')
    const [pokemonData, setPokemonData] = useState<PokemonDataType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [reloadComponent, setReloadComponent] = useState(false)
    
    const debouncedSearch = useDebounce(pokemonNumber, 1000)

    function handleReloadComponent() {
        setReloadComponent(!reloadComponent)
    }

    const getPokemon = async () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${debouncedSearch}`)
            .then((data) => {
                setPokemonData(data.data)
                setIsLoading(false)
            },
            () => {
                setPokemonData(PokemonNotFound)
                setIsLoading(false)
            })
    };
    
    useEffect(() => {
        debouncedSearch ? getPokemon() : null;
    }, [debouncedSearch, reloadComponent]);
    

    useEffect(() => {
        if(pokemonNumber.length > 0) {
            setIsLoading(true)
            setPokemonData(null)
        }
    }, [pokemonNumber])

    return(
        <div className={styles.pokemonDetailsContainer}>
            <div className={styles.pokemonIndividualCard}>
                <div className={styles.PokemonDetailsForm}>
                    <label htmlFor="pokemon">Digite o número do primeiro pokemon desejado:</label>
                    <input type="number" id="pokemon" onChange={(e) => setPokemonNumber(e.target.value)} />
                </div>
                <div className={styles.pokemonDetailsContent}>
                    {   
                        (isLoading && pokemonNumber.length > 0) && <h1>Carregando...</h1>
                    }

                    
                    <h1>{pokemonData?.name}</h1>
                    <img src={pokemonData?.sprites?.other.dream_world.front_default} alt="" />
                    
                </div>
                
                {pokemonData && 
                                <button onClick={handleReloadComponent}>Reload</button>
                }
            </div>

            <div className={styles.pokemonIndividualCard}>
                <div className={styles.PokemonDetailsForm}>
                    <label htmlFor="pokemon">Digite o número do segundoyy pokemon desejado:</label>
                    <input type="number" id="pokemon" onChange={(e) => setPokemonNumber(e.target.value)} />
                </div>
                <div className={styles.pokemonDetailsContent}>
                    {   
                        (isLoading && pokemonNumber.length > 0) && <h1>Carregando...</h1>
                    }

                    
                    <h1>{pokemonData?.name}</h1>
                    <img src={pokemonData?.sprites?.other.dream_world.front_default} alt="" />
                    
                </div>
                
                {pokemonData && 
                                <button onClick={handleReloadComponent}>Reload</button>
                }
            </div>
        </div>
    );
}