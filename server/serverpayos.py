# import json
# import os
# import random

# from payos import PaymentData, ItemData, PayOS
# from flask import Flask, render_template, jsonify, request

# payOS = PayOS(client_id=os.environ.get('PAY_OS_CLIENT'), 
#               api_key=os.environ.get('PAYOS_API_KEY'),
#               checksum_key=os.environ.get('PAYOS_CHECKSUM_KEY'))

# app = Flask(__name__, static_folder='public',
#             static_url_path='', template_folder='public')

# @app.route('/creat_payment_link', methods = ['POST'])
# def create_payment():
#     domain = "http://127.0.0.1:5000"
#     try:
#         paymentData = PaymentData(orderCode=random.randint(1000, 99990), amount=10000, description="demo",
#                                   cancelUrl=f"{domain}/cancel.html", returnUrl=f"{domain}/success.html")
#         payosCreatPayment = payOS.cancelPaymentLink(paymentData)
#         return jsonify(payosCreatPayment.to_json())
    
#     except Exception as e:
#         return jsonify(error=str(e)), 403
        
# if __name__ == '__main__':
#     app.run(port=4242)   
import yt_dlp
import whisper
import torch
import warnings

# Tắt cảnh báo từ whisper
warnings.filterwarnings("ignore", category=UserWarning, module="whisper")
warnings.filterwarnings("ignore", category=FutureWarning, module="torch")
# URL của video YouTube
url = 'https://www.youtube.com/watch?v=saTje2F7REQ'

yt_dlp_opts = {
    'outtmpl': 'output.mp4',   # Đặt tên tệp tải về là 'output.mp4'
    'format': 'best',          # Tải video và âm thanh tốt nhất
    'noplaylist': True,
    'continue': True,
}

def download_video(url):
    try:
        with yt_dlp.YoutubeDL(yt_dlp_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(f"Error downloading video: {e}")
        return False
    return True

def transcribe_video(model_name):
    try:
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        model = whisper.load_model(model_name).to(device)  # Tải mô hình Whisper
        result = model.transcribe("output.mp4")  # Chuyển đổi âm thanh trong video thành văn bản
        return result['text']
    except Exception as e:
        print(f"Error transcribing video: {e}")
        return None

def main():
    url = 'https://www.youtube.com/watch?v=saTje2F7REQ'
    model_name = "base"
    
    if download_video(url):
        transcription_result = transcribe_video(model_name)
        if transcription_result:
            print("Transcription Result:")
            print(transcription_result)

if __name__ == "__main__":
    main()
