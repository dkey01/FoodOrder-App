import {Fragment} from 'react';
import meals from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderIconButton from './HeaderIconButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meal</h1>
                <HeaderIconButton onIconClick={props.onShowModal}/>
            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="Variety of meals on a table"/>
            </div>
        </Fragment>
    )
}
export default Header;