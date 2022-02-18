import { useState } from 'react';
import './App.css';


function App() {



    return (
        <div className="App">
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <h1>Nova Tasca</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <form>
                            <input type='text' name='tasca' id='tasca' className='form-control mt-4'/>
                            <button className='btn btn-primary mt-4' type='submit'>Afegir Tasca</button>
                        </form>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-12 text-center'>
                        <h3>Tasques: </h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
