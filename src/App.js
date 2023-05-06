import React, {useState} from 'react';

import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true);
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }
  return (
    <CartProvider>
      {showModal && <Cart onCloseModal={closeModalHandler}/>}
      <Header onShowModal={openModalHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
