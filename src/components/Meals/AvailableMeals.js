import React, {useEffect, useState} from 'react';

import classes from './AvailableMeals.module.css';
import Card from  '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import useHttp from '../../hooks/use-http';

  const AvailableMeals = () => {
    const [meal, setMeal] = useState([])
    const {isLoading, error, sendRequest: fetchMeals} = useHttp();

    useEffect(() => {
      const applyData = (appliedData) => {
        const receivedData = [];
        for(const key in appliedData){
          receivedData.push({
            id: key,
            name: appliedData[key].name,
            description: appliedData[key].description,
            price: appliedData[key].price
          })
        }
        setMeal(receivedData)
      }
      fetchMeals({
        URL: 'https://react-https-cb35d-default-rtdb.firebaseio.com/orders.json',
      }, applyData)
    }, [fetchMeals])

    let content;
    
    if (error !== null) {
      content = (
        <section className={classes.error}>
          <p>{error}</p>
        </section>
      );

    } else if (isLoading) {
      content = (
        <section className={classes.loading}>
          <p>Loading meals....</p>
        </section>
      );

    } else if (meal.length > 0){
      const mealList = meal.map((meals) => {
        return (
          <MealsItem
            id={meals.id}
            key={meals.id}
            name={meals.name}
            description={meals.description}
            price={meals.price}
          />
        );
      });
    
      content = (
        <section className={classes.meals}>
          <Card>
            <ul>{mealList}</ul>
          </Card>
        </section>
      );
    }
    
    return (  
          <>{content}</>
        )
  }

  export default AvailableMeals;