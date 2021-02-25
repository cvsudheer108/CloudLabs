# Install from VSCode command line : >python -m pip install razorpay
import razorpay

client = razorpay.Client(auth = ('rzp_test_uURp2BX9PT5fNK', 'dOj79GSdCAN194fiZKTUms1d'))

# Key_Id and secret are got from Razorpay account -> Settings -> API Keys -> Regenereate API Key
# paymentId and signature are got from step 2
params_dict = {
    'razorpay_order_id': 'order_xxx',
    'razorpay_payment_id': 'pay_yyy',
    'razorpay_signature': 'zzz'
}


try:
    util = razorpay.Utility(client)

    util.verify_payment_signature(params_dict)
    # If there are no errors, then the verification is succeeful.
except Exception as e:
    print("Unexpected error:", e)