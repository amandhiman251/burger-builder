import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients).map(
      igkey => {return [...Array(props.ingredients[igkey])].map( (_,i) =>
          {return <BurgerIngredients key={igkey + i} type= {igkey} />}
      )  }
    ).reduce((arr, el) => {
        return arr.concat(el)
    },[])
    if ( transformedIngredients==0){
        transformedIngredients = <p> Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type ="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type ="bread-bottom" />
        </div>
    );
}

export default Burger;