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