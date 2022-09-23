import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/user'
import { storageSave } from '../../utils/storage';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import { STORAGE_KEY_USER } from '../../const/storageKeys';

const usernameConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    // Hooks
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    // Local state
    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState(null)

    // Side Effects
    useEffect(() => {
        if (user !== null) {
            navigate('translation')
        }
        console.log('User has changed!', user)
    }, [ user, navigate ]) // Empty dependencies - Only run once

    // Event Handlers
    const onSubmit = async ({ username }) => {
        setLoading(true)
        const [ error, userResponse ] = await loginUser(username)
        if (error !== null) {
            setApiError(error)
        }
        if (userResponse !== null) {
            storageSave(STORAGE_KEY_USER, userResponse)
            setUser(userResponse)
        }
        setLoading(false)
    }

    // Render Functions
    const errorMessage = (() => {
        if (!errors.username) {
            return null
        }

        if (errors.username.type === 'required') {
            return <span>Name is required</span>
        }

        if (errors.username.type === 'minLength') {
            return <span>Name is too short (min 3 characters)</span>
        }
    })()

    return (
        <>
            <h2>What's your name?</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <input type="text" placeholder="Enter your name here..." { ...register("username", usernameConfig) }/>
                    { errorMessage }
                </fieldset>

                <button id="btnContinue" type="submit" disabled={ loading }>Continue</button>

                { loading && <p id="pLoading">Logging in...</p> }
                { apiError && <p>{ apiError }</p> }
            </form>
        </>
    )
}

export default LoginForm