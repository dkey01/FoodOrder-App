import {useState, useContext} from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckOutForm from './CheckOutForm';
import useHttp from '../../hooks/use-http';
import classes from './CartList.module.css';


const CartList = (props) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {sendRequest: postRequest, isLoading: submitting, error} = useHttp();

    const sendingRequest = (orderDetail) => {
        postRequest({
            URL: 'https://react-https-cb35d-default-rtdb.firebaseio.com/orderDetail.json',
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: orderDetail})
        setSubmitted(true);
        cartCtx.clearCart();
    }

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const orderItem = cartCtx.item.length > 0;

    const cartRemoveHandler = (id) => {
        cartCtx.removeFromCart(id)
    }

    const cartAddHandler = (items) => {
        cartCtx.addToCart({...items, amount: 1})
    }

    const orderClickHandler = () => {
        setShowCheckout(true)
    }

    const cartList =<ul className={classes['cart-items']}>{cartCtx.item.map(items => <CartItem 
                        key={items.id}
                        name={items.name}
                        price={items.price} 
                        amount={items.amount}
                        onRemove={cartRemoveHandler.bind(null, items.id)}
                        onAdd={cartAddHandler.bind(null, items)}
                        />)}
                    </ul>
    let content = <>
                    {cartList}
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                    </div>
                    <div className={classes.actions}>
                        <button className={classes['button--alt']} onClick={props.onModalClose}>Close</button>
                        {orderItem && <button className={classes.button} onClick={orderClickHandler}>Order</button>}
                    </div>
                  </>;
    
    if (showCheckout) {
    content = <>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <CheckOutForm onClose={props.onModalClose} onRequest={sendingRequest} />
              </>
    }
    
    if(submitting) {
        content = <p className={classes.submit}>Submitting order....</p>
    }

    if(error) {
        content = <p className={classes.error}>{error}</p>
    }

    if(submitted) {
        content = <div className={classes.actions}>
                    <p className={classes.submit}>Order submitted successfully</p>
                    <button className={classes['button--alt']} onClick={props.onModalClose}>Close</button>
                  </div>
    }
    return  <>
                {content}
            </>
}

export default CartList;