import { useContext } from 'react';
import { ComplimentsContext } from './ComplimentsContext.tsx';

function ComplimentCounter() {
    const compliments = useContext(ComplimentsContext);
    console.log(Array.isArray(compliments));
    console.log('ComplimentsContext when rendering Counter', compliments);

    return (
        <div className="complimentCounter">
            {compliments.length}
            <h1>Number of compliments</h1>
        </div>
    )
}

export default ComplimentCounter