import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Formbuilder from "./pages/formbuilder/formbuilder.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Formbuilder/>
        </>
    )
}

export default App
