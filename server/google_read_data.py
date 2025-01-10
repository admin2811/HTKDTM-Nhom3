import csv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import pandas as pd
import json

SERVICE_ACCOUNT_FILE = {
  "type": "service_account",
  "project_id": "able-plating-436809-b1",
  "private_key_id": "0cf76198983069de051e6a21f683b06e0edb0937",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVOXrc2B1QNWXQ\n3bjNa8Amv8dMQs2mJVYfsKsyPpCfCwNCURFte8dLPfzTxKYLLTbwhjThkbjmBX3v\nmcye2rkScv/YKyJeeIgqAoVAHsCf4CUawVPeuOgMCTSPGPw1eqi9tED1aRyJkXhg\nFCBHn/SEFd6LGgGPAXp4jlp54sUoALTjGAUrTcRFXAxphniV0GBcLDC0/jAHF35H\nPZCwMU0xsJJTJ61Ca4cllFAwEXuKc77OP/hIJzlT8yXfdS+EWtdkpUXLmKNxDk9k\nGMsoLIi8TY/2L7x5mhJZIquKsNfTPhltx0cRZAQ1fhfFeQ6nZzNoL8VyomVY0Nj1\nFBLG7xvfAgMBAAECggEARoUDMIU9dKikaubZ1v67B1XIKV2yvC9/A24fwLdWh3NR\n+Z3sQKR+blErDDLuo6WplPUeCjhyyYipdRQNy8AVE5f7K9hgPpRonFRHE8TX+khc\nnTOxdGj9PfXRbz5ZM6rEojE6hq/j40+8WzJs1qN9cC33c1P/jfd0NOkH3WX1xNuU\nbGNtEcKVqwkGZL9u15JlpCoa1GclX3B4Yn2lvlK316RG/AuQ3dxcHQAAG5x0MKKv\nYYebUvCTQaMqt1MgeRjaJfirSaTW2t2ufaZttVIXXkLtZJHhx1YVg4XBklA9IbTI\nfNmFyyL7Rg9fgCE8JwB9dpi+WYEAmVD4Vz0smokTSQKBgQDq06OurWw/ynlQkv1s\nj2DPaCf659FA+wVqsLjifwrsjhckBi/XW3syfVJS/rs9LyQtBvvov8ZW79/VxK9a\nFqK44Vbni7lX9sCI8TQif+ia+dTZrfMSkM9est0Q8yQ6e7Po3kU4XCdnLxLjitB5\naSv22UoD+eiCjAOJQf02fOkTCwKBgQDoczXpgslY8yKvM/8f8zFwTSfnEHxdRVTY\nZHmxjvU+EIF1koQB9pvuQ8sclCbNQUf8l9VrHo3zwxy+32bLU+KThmcY1V9UjU0W\nALHzXSOSGnV00hP7qVJsAnPLgv0kn72QhythxAzbd+/bVbVe7BdZh3dNJ85OQFQ0\n/icmRpQe/QKBgQDYQk40uQu+97Wfqa7wAl8Sw4ZGQKVqZYLIjbXHCV7DGdxf1b7L\nYzli9x0Qx/0hzL9RJGRsJej/+Ws3UCp5Ge2DvCqvlPL8+oa31wK/XvKVfs0yJ0t6\n5pfDS4/hYzoTDgdSxxgSXnP/R8/qc9Woal4NuHC8lrM1PsKm7nnGa2SunwKBgBjS\nJJGYq5NZ8vwuWzG4MDFDq90af40eGB87K1twXnOQI6LAUGQ9Rw08I/YbQ8FrFRq9\nw8Y6bwH2dZ1UEY/olysVkPCv6AwJQo/05wuLiH7TYHNm80dOH0T1RhQXGpzMidti\n85ju7EiLGAudrU5De4LN2klc1MS6TcOS1+9YXfypAoGAHMnTx9xBNx+tmKgv4v+2\n3U2iqZwZz7femiABkwpMdD1+NeqFfwSd6B+elEYTSDutcPDYspBDBfzcUpime6n9\neUOUUe4S5jy3HJfkxTy3kI0pUIIfzQ4wAL03xp+eaQ9WSDMjMRSBRUXdXGSeFann\n7J+iDufbj7gWpbQGtSj90rs=\n-----END PRIVATE KEY-----\n",
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