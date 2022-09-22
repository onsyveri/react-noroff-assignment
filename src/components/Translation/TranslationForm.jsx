import { useState } from "react"
import { useForm } from "react-hook-form"
import WordTranslated from "./WordTranslated"

const IMAGES = []

for (let i = 0; i < 26; i++) {
    let OBJ = {}
    OBJ.id = (i+10).toString(36)
    OBJ.source = "img/" + (i+10).toString(36) + ".png"
    IMAGES.push(OBJ);
}

const TranslationForm = () => {
    
    const { register, handleSubmit } = useForm()

    const [handImage, setHandImage] = useState(null)
    const [translateWord, setTranslateWord] = useState(null)

    //const [ apiError, setApiError ] = useState(null)
    //const [ loading, setLoading ] = useState(false)
    
    const onSubmit = data => {

        let letterArr =  data.translationField.toLowerCase().split('')
        setTranslateWord(letterArr)

        let TEST = []

        if (translateWord !== null) {

            for (let i = 0; i < translateWord.length; i++) {

                for (let y = 0; y < 26; y++) {

                    if(translateWord[i] === IMAGES[y].id) { // Compare letter from input word to the alphabet
                        let OBJ = {}
                        OBJ.id = i
                        OBJ.source = "img/" + translateWord[i] + ".png"
                        TEST.push(OBJ);
                    }

                }

            }

            setHandImage(TEST.map( signImage => { // Maps the new array and sets it as the handImage using useState()
                    return <WordTranslated key={ signImage.id } source={ signImage.source } /> 
            }))
        }

        if (translateWord === null) {
            console.log("Confirm by pressing again")
        }
        
    }

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <fieldset>
                    <label htmlFor="translation-field">Translate word:</label>  
                    <input type="text" {...register('translationField')} placeholder="Type in word..." />
                </fieldset>

                <button type="submit">Translate</button>

                <section> { handImage } </section>

            </form>

        </>
    )
}

export default TranslationForm