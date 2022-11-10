import { clearTranslation } from "../../api/translate";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";

const ProfileActions = () => {
  const { user, setUser } = useUser();

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure?")) {
      storageDelete(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  const clearHistoryClick = async () => {
    if (!window.confirm("Are you sure you want to clear your history?")) {
      return;
    }
    const [clearError] = await clearTranslation(user.id);

    if (clearError != null) {
      console.log("error");
      return;
    }
    const updatedUser = {
      ...user,
      translations: [],
    };

    storageSave(updatedUser);
    setUser(updatedUser);
  };

  return (
    <ul id="ulProfile">
      <li>
        <button id="btnLogout" onClick={handleLogoutClick}>
          Logout
        </button>
      </li>
      <li>
        <button onClick={clearHistoryClick} id="btnClear">
          Clear history
        </button>
      </li>
    </ul>
  );
};

export default ProfileActions;
