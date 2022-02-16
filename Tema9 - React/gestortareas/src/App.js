import { useState } from 'react';
import './App.css';


function App() {

    const [state, setState] = useState(initialState)

    return (
        <div className="App">
            <p>Nova Tasca</p>
            <div>
                <input type='text' name='tasca' id='tasca' />
                <button>Afegir Tasca</button>
            </div>
            <p>Tasques: </p>

        </div>
    );
}

export default App;
