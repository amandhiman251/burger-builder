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
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'street'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value:'',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        option: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    validation: {
                        required: false
                    },
                    valid: true
                },
            },
            loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData= {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading: false})
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value= event.target.value;
        updatedOrderForm[inputIdentifier]= updatedFormElement;
        updatedFormElement.touched= true;
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        //console.log(updatedFormElement);
        this.setState({ orderForm: updatedOrderForm});
    } 

    checkValidity = (value,rules) => {
        let isValid= true;
        if (rules.required){
            isValid= value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid =  value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid =  value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render(){

        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
                });
        }
        
        let form =(
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement=>(

                         <Input 
                            key={formElement.id}
                            elementType ={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid ? 1 : 0}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                            

                    ))}
                    <Button btntype="Success">ORDER</Button>
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