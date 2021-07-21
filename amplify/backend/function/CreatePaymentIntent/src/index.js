const stripe = require('stripe')('sk_test_51IqF34G6Jx8dEDvkQZTt3alTmb5C1rkSS7mhHo3pR8OOJL06K0AHrxZP1Y4G88R5BzcQ4ftn83VoRQHIbDVmnuL500mUZrvgak');

//redo to accept id, query id, calculate price

// event
// {
//   "typeName": "Query" | "Mutation", /* Filled dynamically based on @function usage location */
//   "fieldName": "createPaymentMethod", /* Filled dynamically based on @function usage location */
//   "arguments": { amount  /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }

exports.handler = async (event) => {
    // TODO implement
    console.log("payment param")
    console.log(event);

    const { typeName, arguments } = event;

    if (typeName !== 'Mutation') {
        throw new Error('Request is not a mutation');
    }

    if (!arguments?.totalCoins) {
        throw new Error('Amount argument is required');
    }

    // const total = (arguments.price) * (arguments.distance)+1;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.totalCoins,
        currency: 'usd',

    });

    //can also send amount to check in frontend
    return{
        clientSecret: paymentIntent.client_secret,
    }
};
