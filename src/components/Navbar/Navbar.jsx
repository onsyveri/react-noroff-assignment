import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"

const Navbar = () => {

    const { user } = useUser()

    return (
        <nav>
           { user !== null &&
                <>
                    <h1 id="navH1">Lost in Translation</h1>
                    <ul id="navUl">
                        <li><NavLink to="/translation">Translation</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                    </ul>
                </>
            }
        </nav>
    )
}

export default Navbar