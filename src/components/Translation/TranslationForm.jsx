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
    
    const onSubmit = data => {

        let letterArr =  data.translationField.toLowerCase().split('')

        let TEST = []

        for (let i = 0; i < letterArr.length; i++) {

            for (let y = 0; y < 26; y++) {

                if(letterArr[i] === IMAGES[y].id) { // Compare letter from input word to the alphabet
                    let OBJ = {}
                    OBJ.id = i
                    OBJ.source = "img/" + letterArr[i] + ".png"
                    TEST.push(OBJ);
                }

            }

        }

        setHandImage(TEST.map( signImage => { // Maps the new array and sets it as the handImage using useState()
                return <WordTranslated key={ signImage.id } source={ signImage.source } /> 
        }))
        
    }

    return (
        <>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <fieldset>
                    <input type="text" {...register('translationField')} placeholder="Type in word you want to translate..." />
                </fieldset>

                <button id="btnTranslate" type="submit">Translate</button>

                <section id="imgView"> { handImage } </section>

            </form>

        </>
    )
}

export default TranslationForm