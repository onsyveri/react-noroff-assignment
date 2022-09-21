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

        let letterArr = data.translationField.split('')
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
                onClick={() => {

                    for (let i = 0; i < translateWord.length; i++) {

                        for (let y = 0; y < 26; y++) {

                            if(translateWord[i] === IMAGES[y].id) {
                                console.log(translateWord[i])
                                setHandImage(<WordTranslated key={ translateWord[i].id } source={ "img/" + translateWord[i] + ".png" } />)
                            }

                        }

                    }

                    //setHandImage( <WordTranslated key={ "a" } source={ "a" } />
                       /* IMAGES.map( signImage => {

                            for (let i = 0; i < translateWord.length; i++) {

                                if(translateWord[i] === signImage.id) {
                                    console.log(translateWord[i])
                                    return <WordTranslated key={ signImage.id } source={ signImage.source } />
                                }
                                
                            }

                            return null

                        }) */
                    //)

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