import { addTranslation } from "../api/translate";
import TranslationForm from "../components/Translation/TranslationForm";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

/*
const IMAGES = []

for (let i = 0; i < 26; i++) {
    let OBJ = {}
    OBJ.id = (i+10).toString(36)
    OBJ.source = "img/" + (i+10).toString(36) + ".png"
    IMAGES.push(OBJ);
}

console.log(IMAGES)
*/

const Translation = () => {
  const { user, setUser } = useUser();

  const handleTranslation = async (notes) => {
    const translations = notes;
    console.log(translations);
    console.log(user);

    const [error, updatedUser] = await addTranslation(user, translations);
    if (error != null) {
      return;
    }
    //keep ui state and server state in sync
    storageSave(STORAGE_KEY_USER, updatedUser);
    //Update context state
    setUser(updatedUser);

    console.log("Error", error);
    console.log("Result", updatedUser);
  };

  /*
    const handImage = IMAGES.map( signImage => {
        return <WordTranslated key={ signImage.id } source={ signImage.source } />
    })
    */

  /*
    const handleTranslate = field => {
        const trans = (IMAGES.id + " - " + field).trim()
        console.log(trans)
    }
    */

  /*
    return(
        <>
            <h1>Translation</h1>
            <section id="translation-field">
                <TranslationForm />
            </section>
        </>
    )
}

export default withAuth(Translation)

*/

  return (
    <>
      <h1>Translations</h1>
      <section id="translation-notes">
        <TranslationForm onTranslation={handleTranslation} />
      </section>
    </>
  );
};
export default withAuth(Translation);
