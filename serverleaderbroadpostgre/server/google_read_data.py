import csv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import pandas as pd
import json

SERVICE_ACCOUNT_FILE = {
  "type": "service_account",
  "project_id": "able-plating-436809-b1",
  "private_key_id": "50e495f2e4b619f8c4957951e48b0207f0ef747f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHwHSOYlEe6y2V\nuCwvRzJ0qHNf4IJSAl67wJJW9TLpEPHIzmf1S6QzW4XJlwmeSsVykjneFDv66d8y\nKvI+GaHiP5F9r+8Utj0KfuVeGXVx7ZmGcfWBj4daPooNkFThGhCUJve0HGiFzvJ5\nqtekze8fBFanpCQIXkWjdpwy5SIwlw7U/C6C0WSLdYSEss584ntRRqEL75eBoYVL\nn8nhkYetuZ5G+2Yb3YiJuwRH73UrfFT4tiiyD4vWDUcUuYgEkuAu/N2FNMd4t69J\nMvpKAN2/4mXKn44JE5qh4b/i2KUXFLLK+mVYfDZSxWYkk2uMzJz/mvwH6sAbJNFM\naz/7KnMBAgMBAAECggEAMZDryz4Rx5SPd/CexC+MUV7QXEjrRZrRc5DmLz5CXwuF\nl7DCIp/ds6HBCcQZDqaapqKqydTnCkzYxcva1vaI0Um5WkEbGB5deLqCw24ZUsck\n2rPx+e+J5GaS3qlDKqVLWlvuCMso05VF3VN7lalFLgLnVst35nywFo8S1N0/NeOB\nXIzCqD9XQN2LvK3FmPwxS6c2Q4jQbxHLNwyobeZmoG3dixpYQmPsQlHebkNacKPg\nvihvFxfsKzDMEIS2eu81mR4bRqAo1W27UX9nN1eBqk4+d6vzkXd22XbeeWBxrehF\nDZJl3NPrA9zgrAKACKByu9hsXc/f+rDjlUFAUUWdzQKBgQD1ymyBicD/ISkNG5l2\nd9sptYy7XV+a35QhkVSYI6bQRfw7AD9EV6D6iRnD26Sy0iahfcOCSLDeaXsBVrAl\nKWO2OVEou0Vsn7ZoAJlZefHPeJ5n01+q5zpumbsIdoRl/I2ixrSWN+g2ImKKFPcB\nr0gte+gACwUihdpqW5ljBjydVQKBgQDQDHvYa69z/jSjrGdYTIguoMyEb5TdCWka\nDsZqPCeLAve3WMrueLcoo9U1QocsdztNuz5BPs6oZo/6W12SAkvPUvFSpk/YkdGY\nllmmP2sCLP5gcOur9zr3zxdLVLen/adWkyHF1gABR1XyW3oMUQxJgjmNIhJejiBM\nwGx1w4ce/QKBgB1w07Jod6+Xnz0ssyMXlC7YyjSfKJZ6dVnX+JQIoTCNUXsXunxL\nKsMXrPhi1MV+mpX5ZHO0lUruw4cThSHOZV0sXGZOmDA8qTKn77Zh/u7k+cRh8zGb\nZMpeq6KF37H/oE+BEZx0seHaGIeFn1iaUEDyeIWYzFKoSdM3iZXs51HJAoGBAJLu\nziSJ4Q8tkGWr5AzzeBZeUDKUT3FQLR9PIghzVYYS4XpmxmNndAvKsVB9HNRlnMeI\nHy6bOf6q+LJbBpmQ75OLw42YkbmlOn7maIhGL8AIoNrhxT/dSpMregsk2NRXC3DU\nVrzPJ4+/ns6clnTOZLwhsZ2gW5LWE6/BEpiVL//NAoGALk4zb+nsSqPptMUrJmqj\n7wHRPjuiWG0z1Jrg3cT5WsiOk4qTjfOM+1dNb1DInl8xb9YUCPN6/srMYdRLG+cz\nS5MPgEmGIVqeRwR+5f+e6sZgIukWbPYyxxSxp9xlA7ryt41qY92PAjKQQV6mV358\nXsc8eKf089jYR3GpufhZtXE=\n-----END PRIVATE KEY-----\n",
  "client_email": "lam-googlesheet@able-plating-436809-b1.iam.gserviceaccount.com",
  "client_id": "102852901172971486731",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/lam-googlesheet%40able-plating-436809-b1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

SPREADSHEET_ID = '19wY6sH3nUcLx6c65juouyYitTi7-5z8N4Pm4BuwsYEU'

def read_google_sheet():
    """Đọc dữ liệu từ Google Sheet và trả về DataFrame."""
    credentials = Credentials.from_service_account_info(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=credentials)
    sheet = service.spreadsheets()

    # Lấy dữ liệu từ Google Sheet
    result = sheet.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range='data_mark!A1:D'
    ).execute()

    values = result.get('values', [])
    
    # Chuyển đổi dữ liệu thành DataFrame
    if values:
        df = pd.DataFrame(values[1:], columns=values[0])  # Dòng đầu tiên là tiêu đề cột
        df.set_index(df.columns[0], inplace=True)  # Thiết lập cột đầu tiên làm chỉ mục
        return df
    else:
        print("Không có dữ liệu trong Google Sheet.")
        return pd.DataFrame()