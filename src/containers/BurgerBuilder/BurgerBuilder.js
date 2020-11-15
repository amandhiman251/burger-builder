import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENTS_PRICE = {
    salad: 0.6,
    bacon: 0.9,
    cheese: 0.8,
    meat: 1.2
};

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon:0,
            cheese:0,
            meat:0
        },
        finalPrice: 4
    }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.finalPrice;
        const ingredPrice = INGREDIENTS_PRICE[type];
        const updatedPrice = oldPrice + ingredPrice;
        this.setState({
            finalPrice: updatedPrice,
            ingredients:updatedIngredients
        }) 
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.finalPrice;
        const ingredPrice = INGREDIENTS_PRICE[type];
        const updatedPrice = oldPrice - ingredPrice;
        this.setState({
            finalPrice: updatedPrice,
            ingredients:updatedIngredients
        }) 
    }

    render() {
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls ingredientsRemove = {this.removeIngredientsHandler} ingredientsAdd = {this.addIngredientsHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;