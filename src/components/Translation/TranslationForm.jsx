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

    const [ apiError, setApiError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    const onSubmit = data => {

       /* setLoading(true)
        
        let letterArr = data.translationField.split('')
        
        const [ error, dataResponse ] = await letterArr
        if (error !== null) {
            setApiError(error)
        }
        if (dataResponse !== null) {
            setTranslateWord(letterArr)
        }
        
        setLoading(false) */
        //console.log("yo: " + )
        console.log(data.translationField.toLowerCase())

        let letterArr = data.translationField.toLowerCase().split('')
        setTranslateWord(letterArr)
        
    }

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor="translation-field">Translate word:</label>  
                    <input type="text" {...register('translationField')} placeholder="Type in word..." />
                </fieldset>

                <button
                onClick={() => { // Onclick puts letters that match alphabet in another array

                    let TEST = []

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

                }}
                    type="submit"
                    disabled={ loading }>Translate
                </button>

                { loading && <p>Loading...</p> }
                { apiError && <p>{ apiError }</p> }

                <section> { handImage } </section>
                
            </form>
        </>
    )
}

export default TranslationForm