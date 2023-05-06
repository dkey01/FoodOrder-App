import React, {useRef, useState} from 'react';

import classes from './MealsItemForm.module.css';
import Input from '../../UI/Input';

const MealsItemForm = (props) => {

    const [validInput, setValidInput] = useState(true)

    const amountInputRef = useRef()

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredInput = amountInputRef.current.value;
        const enteredInputAmount = +enteredInput;

        if (enteredInput.trim().length === 0 || enteredInputAmount < 1 || enteredInputAmount > 5) {
            setValidInput(false);
            return;
        }

        props.onSubmitInput(enteredInputAmount);
    }
    return <form className={classes.form} onSubmit={formSubmitHandler}>
        <Input label="Amount" ref={amountInputRef} input={{
            id:"amount_" + props.id,
            type:"number",
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 1
        }}/>
        <button>+ Add</button>
        {!validInput && <p>Please enter a valid amount (1-5)</p>}
    </form>
}

export default MealsItemForm;