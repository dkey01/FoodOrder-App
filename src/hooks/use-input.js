import {useState} from 'react';


const useInput = (validation, validateClass) => {
    const [valueEntered, setValueEntered] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validation(valueEntered);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setValueEntered(event.target.value)
    }

    const onBlurValueHandler = () => {
        setIsTouched(true)
    }

    const valueClass = validateClass(hasError)

    const reset = () => {
        setValueEntered('');
        setIsTouched(false);
    }
    return {
        value: valueEntered,
        valueIsValid,
        hasError,
        valueChangeHandler,
        onBlurValueHandler,
        valueClass,
        reset
    }
}

export default useInput;