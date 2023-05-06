import CartList from './CartList';
import Modal from '../UI/Modal';

const Cart = (props) => {

    const cartContent = <CartList onModalClose={props.onCloseModal}/>

    return (
        <Modal onClose={props.onCloseModal}>
            {cartContent}
        </Modal>
    )
}

export default Cart;