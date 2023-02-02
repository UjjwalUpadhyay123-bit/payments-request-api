
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
      const methodData = {
        "fetchPayOption": {
            "body": {
                "merchantDetails": {
                    "mcc": "5812",
                    "merchantVpa": "siddharth-sawarkar@paytm",
                    "merchantName": "XYZ Enterprises",
                    "merchantDisplayName": "Paytm  Airtel Recharge",
                    "merchantLogo": "https://stage-webapp.paytm.in//integration-app/blink-checkout/logo11.png",
                    "isAppInvokeAllowed": true,
                    "merchantBankName": "Kanishk Saini",
                    "verifiedMerchant": true,
                    "autoAppInvokeAllowed": false
                },
                "walletOnly": false,
                "nativeJsonRequestSupported": true,
                "paymentFlow": "NONE",
                "merchantPayOption": {
                    "upiProfile": {
                        "respDetails": {
                            "profileDetail": {
                                "vpaDetails": [
                                    {
                                        "name": "6360350289@paytm",
                                        "defaultCreditAccRefId": "331755472",
                                        "defaultDebitAccRefId": "331755472",
                                        "primary": true
                                    }
                                ],
                                "bankAccounts": [
                                    {
                                        "bank": "ICICI Bank",
                                        "ifsc": "ICIC0000388",
                                        "accRefId": "331755472",
                                        "maskedAccountNumber": "XXXXXXXX4953",
                                        "accountType": "SAVINGS",
                                        "credsAllowed": [
                                            {
                                                "CredsAllowedDLength": "6",
                                                "CredsAllowedDType": "Numeric",
                                                "CredsAllowedSubType": "SMS",
                                                "CredsAllowedType": "OTP",
                                                "dLength": "6"
                                            },
                                            {
                                                "CredsAllowedDLength": "4",
                                                "CredsAllowedDType": "Numeric",
                                                "CredsAllowedSubType": "MPIN",
                                                "CredsAllowedType": "PIN",
                                                "dLength": "4"
                                            }
                                        ],
                                        "name": "UJJWAL KUMAR UPADHYAY",
                                        "mpinSet": "Y",
                                        "txnAllowed": "ALL",
                                        "branchAddress": "MUMBAI MALAD II",
                                        "pgBankCode": "ICICI",
                                        "bankMetaData": {
                                            "perTxnLimit": "200000",
                                            "bankHealth": {
                                                "category": "GREEN",
                                                "displayMsg": ""
                                            }
                                        },
                                        "bankLogoUrl": "https://staticgw3.paytm.in/native/bank/ICICI.png",
                                        "bankAccountFeatureList": [
                                            "OTM",
                                            "SUBSCRIPTION"
                                        ]
                                    }
                                ],
                                "profileStatus": "ACTIVE",
                                "upiLinkedMobileNumber": "916360350289",
                                "deviceBinded": false
                            },
                            "metaDetails": {
                                "npciHealthCategory": "GREEN",
                                "npciHealthMsg": ""
                            }
                        },
                        "priority": "3",
                        "upiOnboarding": false,
                        "onboardNewUPIBankAcct": true
                    }
                }
            }
        }
    };
        const data = {
          mobile: '',
          initTxnData: {
            mid: 'AliSub58582630351896',
            orderId: 'integration_20230202133024',
            amount: '1',
            txnToken: 'a1158f03603c42c893b0bb823afbba981675324839092'
          },
          type: 'FULL_APP_INVOKE',
          methodData
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
  }
