import React, {useContext} from 'react';

import useInput from '../../hooks/use-input';
import CartContext from '../../store/cart-context';
import classes from './CheckOutForm.module.css';

const CheckOutForm = (props) => {
    const cntx = useContext(CartContext);
    
    const itemOrdered = cntx.item;

    const totalAmount = cntx.totalAmount

    const {
        value: nameEntered,
        valueIsValid: fullNameIsValid,
        hasError: nameHasError,
        valueChangeHandler: fullNameChangeHandler,
        onBlurValueHandler: onBlurFullNameHandler,
        valueClass: nameClass,
        reset: resetName} = useInput(value => value.trim() !== '', value=> value ? classes['form-invalid'] : classes['form-valid']);

    const {
        value: streetEntered,
        valueIsValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: addressChangeHandler,
        onBlurValueHandler: onBlurAddressHandler,
        valueClass: streetClass,
        reset: resetStreet} = useInput(value => value.trim() !== '', value=> value ? classes['form-invalid'] : classes['form-valid']);

    const {
        value: postalCodeEntered,
        valueIsValid: postalCodeIsValid,
        hasError: postalCodeHasError,
        valueChangeHandler: postalCodeChangeHandler,
        onBlurValueHandler: onBlurPostalCodeHandler,
        valueClass: postalCodeClass,
        reset: resetPostalCode} = useInput(value => value.trim().length === 5, value=> value ? classes['form-invalid'] : classes['form-valid']);

    const {
        value: cityEntered,
        valueIsValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        onBlurValueHandler: onBlurCityHandler,
        valueClass: cityClass,
        reset: resetCity} = useInput(value => value.trim() !== '', value=> value ? classes['form-invalid'] : classes['form-valid']);

    

    let formIsValid = false;

    if (fullNameIsValid && streetIsValid && postalCodeIsValid  && cityIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const fullOrderDetail = {nameEntered, streetEntered, postalCodeEntered, cityEntered, itemOrdered, totalAmount}

        props.onRequest(fullOrderDetail)

        resetName();
        resetStreet();
        resetPostalCode();
        resetCity();
    }

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className = {nameClass}>
                <label htmlFor='name'>Full name</label>
                <input type='text' id='name'onChange={fullNameChangeHandler} onBlur={onBlurFullNameHandler} value={nameEntered}/>
                {nameHasError && <p>Please name must be entered</p>}
            </div>
            <div className = {streetClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={addressChangeHandler} onBlur={onBlurAddressHandler} value={streetEntered}/>
                {streetHasError && <p>Please street must be entered</p>}
            </div>
            <div className = {postalCodeClass}>
                <label htmlFor='postalCode'>Postal Code</label>
                <input type='text' id='postalCode' onChange={postalCodeChangeHandler} onBlur={onBlurPostalCodeHandler} value={postalCodeEntered}/>
                {postalCodeHasError && <p>Please enter a valid postal code(must be 5 characters)</p>}
            </div>
            <div className = {cityClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={cityChangeHandler} onBlur={onBlurCityHandler} value={cityEntered}/>
                {cityHasError && <p>Please street must be entered</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose}>Close</button>
                <button type='submit' disabled={!formIsValid}>Confirm</button>
            </div>
        </form>
    )
}

export default React.memo(CheckOutForm);