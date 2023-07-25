import { useEffect, useState } from "react";
import axios from 'axios'
import styles from './styles.module.css'
import useDebounce from "../../Hooks/useDebounce";

interface PokemonDataType {
    id: number,
    name: string,
    types?: [{
        type: { name: string }
    }],
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
    name: "Not found"
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

    function getPokemon () {
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
        } else {
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
                    { (isLoading && pokemonNumber.length > 0) && <h1>Carregando...</h1> }

                    <h1>{pokemonData?.name}</h1>
                    
                    {
                        pokemonData && 
                        <div className={styles.typesContainer}>
                            <h4>Types:</h4>
                            {pokemonData.types?.map((type, index) => <p key={index}>{type.type.name}</p>)}
                        </div>
                    }

                    <img src={pokemonData?.sprites?.other.dream_world.front_default} alt="" />
                    
                </div>
                
                { pokemonData && <button onClick={handleReloadComponent}>Reload</button> }
            </div>

        </div>
    );
}