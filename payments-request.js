
const checkAllValues = response => {
    return new Promise((resolve, reject) => {
        console.log('response', response);
        // Object.keys(response).forEach(val => {
        //     if (val === null) resolve(false);
        // })
        resolve(true);
    });
}
function validateResponse(response) {
    checkAllValues(response)
      .then((response) => {console.log(response);})
      .catch((err) => console.log(err));
  }

  // function handlePaymentResponse(response) {
  //   const formattedResponse = document.createElement('pre');
  //   formattedResponse.appendChild(
  //       document.createTextNode(response));
  //   // document.getElementById('checkout')
  //   //     .insertAdjacentElement('afterend', formattedResponse);
  // }
  
// function load () {
    if (window.PaymentRequest) {
        const data = {
          mobile: '',
          initTxnData: {
            mid: 'AliSub58582630351896',
            orderId: 'integration_20230202122426',
            amount: '1',
            txnToken: 'fb10b06631b141bda5d1a2bb981f49091675320879293'
          },
          type: 'FULL_APP_INVOKE'
        };
        const supportedPaymentMethods = [
          {supportedMethods: 'https://securegw.paytm.in/pay', data: data},
          // {
          //   supportedMethods: 'https://bobbucks.dev/pay',
          //   data: {
          //       supportedNetworks: ['visa', 'mastercard', 'discover'],
          //       supportedTypes: ['credit']
          //     }
          // }
        ];
        const details = {
          total: {label: 'Test Purchase', amount: {currency: 'USD', value: '100.00'}}
        };
      
        const options = {};

        const paymentRequest = new window.PaymentRequest(supportedPaymentMethods, details, options);
        paymentRequest.canMakePayment().then(isAppSupported => {isAppSupported && paymentRequest.show()
          .then(paymentResponse => {paymentResponse.complete('success')})
          .catch(err => console.log(err))
        });
        //paymentRequest.show().then((response) => validateResponse(response)).catch((err) => console.log(err));
    } else {
        // nont supported
    }
