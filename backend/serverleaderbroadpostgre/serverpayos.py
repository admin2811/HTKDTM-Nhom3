import json
import os
import random

from payos import PaymentData, ItemData, PayOS
from flask import Flask, render_template, jsonify, request

payOS = PayOS(client_id=os.environ.get('PAY_OS_CLIENT'), 
              api_key=os.environ.get('PAYOS_API_KEY'),
              checksum_key=os.environ.get('PAYOS_CHECKSUM_KEY'))

app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

@app.route('/creat_payment_link', methods = ['POST'])
def create_payment():
    domain = "http://127.0.0.1:5000"
    try:
        paymentData = PaymentData(orderCode=reandom.randint(1000, 99990), amount=10000, description="demo",
                                  cancelUrl=f"{domain}/cancel.html", returnUrl=f"{domain}/success.html")
        payosCreatPayment = payOS.cancelPaymentLink(paymentData)
        return jsonify(payosCreatPayment.to_json())
    
    except Exception as e:
        return jsonify(error=str(e)), 403
        
if __name__ == '__main__':
    app.run(port=4242)   