const stripe = require('stripe')('pk_test_51IqF34G6Jx8dEDvk5FCThtLSeZl7HFqENuCVS7BAMGcLNBSCTliDKZV2AEWcBgn9le2r5nrAhACqiUx0I5oqLXGP00JpQZ7qGB');

//redo to accept id, query id, calculate price

exports.handler = async (event) => {
    // TODO implement
    console.log("payment param")
    console.log(event);

    const {order, arguments} = event;

    if(order!='Mutation'){
        throw newError('Request is not a mutation');
    }

    if(!arguments?.price){
        throw new Error('Amount argument is required');
    }

    // const total = (arguments.price) * (arguments.distance)+1;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.total,
        currency: 'usd',

    });

    //can also send amount to check in frontend
    return{
        clientSecret: paymentIntent.client_secret,
    }
};
