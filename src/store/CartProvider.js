import React, {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const CartReducer = (state, action) => {
    if(action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + action.items.price * action.items.amount;
        
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.items.id)
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItem;
        if (existingCartItem) {
            const updatedItems = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.items.amount
            }
            updatedItem = [...state.items]
            updatedItem[existingCartItemIndex] = updatedItems
        }else{
            updatedItem = state.items.concat(action.items);
        }
        
        return {items: updatedItem ,
                totalAmount: updatedTotalAmount}
    }

    if(action.type === "REMOVE") {
            
        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItem;

        if(existingCartItem.amount === 1) {
                 updatedItem = state.items.filter(item=>item.id !== action.id);
        }else{
                 const updatedItems = {
                ...existingCartItem, amount: existingCartItem.amount - 1
            }
            updatedItem = [...state.items];
            updatedItem[existingCartItemIndex] = updatedItems
        }
        return {items: updatedItem,
                totalAmount: updatedTotalAmount}
    }

    if(action.type === "CLEAR") {
        return defaultCartState
    }
    return defaultCartState
}


const CartProvider = (props) => {
    
    const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState)
    
    const addToCartHandler = (items) => {
        dispatchCartAction({type: "ADD", items: items})
    }
    
    const removeFromCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: "CLEAR"})
    }
    
    const cartContext = {
        item: cartState.items,
        totalAmount: cartState.totalAmount,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        clearCart: clearCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;