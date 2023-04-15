import React, {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increaseAndLog = () => {
        setCount(count + 1)
        console.log ('We are updating and console logging!')
    }

    return (
        <div>
            <button onClick = {increaseAndLog}>Click to increament</button>
            {/* <button onClick = {() => setCount(count - 1)}>Click to decrement</button> */}
            <p>{count}</p>
        </div>
    )
}
export default Counter


