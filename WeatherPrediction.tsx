import React from 'react';
import Dummy from './dummy';

const App: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Quantum Weather Forecaster</h1>
            <Dummy />
        </div>
    );
};

export default App;
