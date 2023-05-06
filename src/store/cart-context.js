import React from 'react';

const CartContext = React.createContext({
    item: [],
    totalAmount: 0,
    addToCart: (item) => {},
    removeFromCart: (id) => {},
    clearCart: () => {}
})

export default CartContext;