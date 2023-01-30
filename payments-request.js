
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
  
function load () {
    if (window.PaymentRequest) {
      const googlePaymentDataRequest = {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          // A merchant ID is available after approval by Google.
          // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
          // merchantId: '12345678901234567890',
          merchantName: 'Example Merchant'
        },
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            // Check with your payment gateway on the parameters to pass.
            // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
            parameters: {
              'gateway': 'example',
              'gatewayMerchantId': 'exampleGatewayMerchantId'
            }
          }
        }]
      };
        const data = {
          mobile: '',
          initTxnData: {
            mid: 'PRINTE0148525564528',
            orderId: 'integration_20230130190616',
            amount: '1',
            txnToken: '97201810f1234163851ee3791da727b21675085784787'
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
          total: {label: 'Test Purchase', amount: {currency: 'USD', value: '100.00'}},
          displayItems: [
            {
              label: '15% Discount',
              amount: {
                currency: 'INR',
                value: 1
              }
            },
            {
              label: 'Tax',
              amount: {
                currency: 'INR',
                value: 1.5
              }
            }
          ],
          shippingOptions: [
            {
              id: 'standard',
              label: 'Standard shipping',
              amount: {currency: 'INR', value: '5.00'},
              selected: true
            }
          ]
        };
      
        const options = {
          requestPayerEmail: true,
          requestPayerName: true
        };
        const paymentRequest = new PaymentRequest(supportedPaymentMethods, details, options);
        paymentRequest.canMakePayment().then(isAppSupported => {isAppSupported && paymentRequest.show().
          then(paymentResponse => {
            let data = {};
            data.methodName = paymentResponse.methodName;
            data.details = paymentResponse.details;

            return fetch('/pay', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then (response => {
              if(response.status === 200) {
                return result.complete('success');
              }
            }).catch(() => {
              result.complete('fail');
            })
            // paymentResponse.complete('success')
          })});
        //paymentRequest.show().then((response) => validateResponse(response)).catch((err) => console.log(err));
    } else {
        // nont supported
    }
}
