import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"

const Navbar = () => {

    const { user } = useUser()

    return (
        <nav>
           { user !== null &&
                <>
                    <h1>Translation</h1>
                    <ul>
                        <li><NavLink to="/translation">Translation</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                    </ul>
                </>
            }
        </nav>
    )
}

export default Navbar