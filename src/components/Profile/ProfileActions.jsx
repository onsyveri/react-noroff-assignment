import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { useUser } from "../../context/UserContext"
import { storageDelete } from "../../utils/storage"

const ProfileActions = () => {

    const { setUser } = useUser()

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure?')){
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    

    return (
        <ul id="ulProfile">
            <li><button id="btnLogout" onClick={ handleLogoutClick }>Logout</button></li>
            <li><button id="btnClear">Clear history</button></li>
        </ul>
    )
}

export default ProfileActions