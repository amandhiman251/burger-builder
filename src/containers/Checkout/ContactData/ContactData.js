import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value=''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'street'
                    },
                    value=''
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value=''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value=''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value=''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        option: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value='fastest'
                },
            },
            loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Aman Dhiman',
                address: {
                    street: 'teststreet',
                    zipcode: '133201',
                    country: 'India'
                },
                email: 'amandhiman251@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading: false})
        });
    }

    render(){
        
        let form =(
            <form>
                    <Input inputtype="input" type='text' name ='name' placeholder = 'Your Name' />
                    <Input inputtype="input" type='email' name ='email' placeholder = 'Your email' />
                    <Input inputtype="input" type='text' name ='street' placeholder = 'street' />
                    <Input inputtype="input" type='text' name ='postalcode' placeholder = 'postalcode' />
                    <Button btntype="Success"clicked= {this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;