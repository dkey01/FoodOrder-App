import React, {useContext, useState, useEffect} from 'react';

import CartIcons from './CartIcons'
import classes from './HeaderIconButton.module.css';
import CartContext from '../../store/cart-context'

const HeaderIconButton = (props) => {
    const [btnAnimation, setBtnAnimation] = useState(false)
    const cartCtx = useContext(CartContext);
    const {item} = cartCtx
    const amountInCart = item.reduce((curNumber, items)=>{
        return curNumber + items.amount
    }, 0)
    const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ""}`

    useEffect(()=>{
        if(item.length === 0) {
        return;
        }
        setBtnAnimation(true)
        const timer = setTimeout(()=>{
            setBtnAnimation(false)
        }, 300)
        return ()=>{
            clearTimeout(timer)
        }
    }, [item])

    return <button className={btnClasses} onClick={props.onIconClick}>
        <span className={classes.icon}><CartIcons /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{amountInCart}</span>
    </button>
}
export default HeaderIconButton;