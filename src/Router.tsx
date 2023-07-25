import { Routes, Route } from 'react-router-dom'
import { PokemonDetails } from './components/PokemonDetails';
import { PokemonList } from './components/PokemonList';
import { DefaultLayout } from './Layouts/DefaultLayout';

export function Router() {
    return(
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<PokemonDetails />} />
                <Route path='/pokemonlist' element={<PokemonList />} />
            </Route>
        </Routes>
    );
}