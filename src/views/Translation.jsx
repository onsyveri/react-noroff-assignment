import TranslationForm from "../components/Translation/TranslationForm"
import withAuth from "../hoc/withAuth"

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