import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';

const PayPalButton = ({onSuccess}) => {
    const {products2}= useSelector(state=>state.items2)
    return (
        <PayPalScriptProvider options={{ 'client-id': 'AZ6y5cYvFQ7ptZROnDFCkEJdj2KBuOUuA-4CeJZbY7CR3vhnP9zPTaF2_79EvY7bNQ7Eaeuk858R6L-n' }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                   
                    const items = products2.map(item => ({
                        name: item.Title,
                        quantity: item.amount,
                        unit_amount: {
                            currency_code: 'USD',
                            value: item.Price,
                        },
                    }
                    ));
                    const itemTotal = items.reduce((total, item) => {
                           return total + item.quantity * parseFloat(item.unit_amount.value);
                                 }, 0).toFixed(2);
                     
                               
                   
                    return actions.order.create({
                        purchase_units: [
                        {
                            items,
                            amount: {
                             value: itemTotal,
                             breakdown: {
                             item_total: {
                            currency_code: 'USD',
                            value: itemTotal,
                        },
                    },
                },
                        }
                            
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
