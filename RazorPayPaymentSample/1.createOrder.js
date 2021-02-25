/*
1. Set the key_id and secret appropriately:
   Key_Id and secret are got from Razorpay account -> Settings -> API Keys -> Regenereate API Key

2. Create an order by running in the VSCode Terminal at the root directory: >node 1.createOrder

*/

const Razorpay = require('razorpay')
console.log('starting');
//
var rzPay = new Razorpay({
    key_id: 'rzp_xxx',
    key_secret: 'xxx',
  });

  const payment_capture = 1
	const amount = 199
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: 'receipt_1',
		payment_capture
	}

  try {

    

      //Create Order
      var orderDetails = {
        amount: options.amount,  // amount in the smallest currency unit
        currency: currency,
        receipt: options.receipt
        };
        let orderId
        rzPay.orders.create(options, function(err, order) {
          if(err){
            console.log(err);
          }
          else{
            console.log(order);
            orderId = order.id
          }
          console.log(orderId)
        });
  } catch (error) {
    console.log(error)
  }



