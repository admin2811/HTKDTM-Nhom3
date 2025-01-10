import csv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import pandas as pd
import json

SERVICE_ACCOUNT_FILE = SERVICE_ACCOUNT_FILE = {
  "type": "service_account",
  "project_id": "able-plating-436809-b1",
  "private_key_id": "c89aa7375bc82c120c64648a2ec827bc4815889f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCg8lwCt8UkbLJA\nLyIfOTopiIQpB7ANu0P9Mo1UpRVKub26SoG75JixqwzDp8M6h/6AYYLqjy7pqz1u\nk18kiXLT/C0BMwf5PLn2Wy/XHVI+VEky8ESvoFqV+3eXXifEdR5w8SIVqZP3xdDZ\noUVcHrX4IwW0spzCvJHgSLxZKJ7AKEMz8/ahnsSkjLe7YhL7qrZM1HNnQQpsGxzh\nr2Gdl8Ij8+DZdpcGuxo8bWrsBPYoovJCd1UDGEAZdp7z3/Eetu+G3PUvNsRIOO5R\nBh2Yl3w73GYsAssqf/eXdrdpmI2NUsUJJpTr+Ad9hpk0eAdcCA25oJCCDgi0yoG7\n3CYRjpktAgMBAAECggEAOwCOVZq8JX3JnPkKd8rZdSdsV8RPOMF5i8VwBWNdml7c\nXIJ67ABCMAPmcoW6buczGCpnPYkPKC+UHkjdfL38wBT3BLUKC8dE3zkPoTtJDruE\neC2X6JCPFOOytGWai41qAvqLRci8i31T8qyKClrh190y9srx5/wMOF5B2ienhwbG\nw+21U/vMmkwIVXhXoNgGAtydPWANMNwP2c5xEVXttsKaYP4X69GfNCktvaEOE5eb\njuG4gzjSIt7hdhHqXAz/dUE8/eaBxYjFW4a+NC+jjRdX5MHfnWAB7/9sd4ci1Wov\nIaJAs4oE/WAJZvBqsHIEGoNQAtz8XTZT94mPtwttGwKBgQDL6Ip0ohfq1ZwTIPNh\njaKOsyIWXnwSIALOcTwYJUEq1a0Hg9i0KL51FrQZu4iSQKEpfaKzzGTZG1xQIkKY\nbD9R7NfBSKEwy2h09z8UIdKbKDUX8wfllQMjDwRRvflw2p1rnittOJJeNnUNpPBy\nKZz59LFzVa9ByaH9qiA2XE5vhwKBgQDKECh1osq8L3s4PQU7EtYifK5O12km78eY\nYiiNPuqoPYzAetYOiJ8C0iDuRyLRuVm/c20VDG1vfPnM2yhmRF9WW3iqsLtwJLG2\nlBZ5tqONVX55dKA3QoS6Uh8/oEGqi/yXJs3YULnsZDSOQFtkyord7s4b2EiZz/l0\nZDCx5+eWqwKBgFAUcVvA1PfLEFKK3Epxn2e/fiGe1ccgfzmoStuItgEmjZ+n7hFC\n9xlw4yY/+jDF5QUwbBeErA5/qk9mRRUrXerEwy8LYRKSr+FPwJwddGKu9bsEHRPS\n47p/CUk4/J+Pm8dKBPAOCZ2qcWn8XtnW8elQaehLvFpv34iJqcDvm3Y9AoGBAJa6\nXOP7bo3YQWtfIWLCl1eceA4546d24AXM2wEZ+MNNPoxqVPj8ctkQ1B3KlK+rOsZ0\nnN9BqPSsXk6xAL7gq9loXGe/c+KgjKxsZSOf2PrZ1oFVPRpblVTDY6n7qmBFEkPS\nX2TIOxiaWxXt7f8Ok24f8EGXIfkSybtH7YcYPYoHAoGAA5gH33F8qaWzsv6EpqnD\nImAw4dmGN8WFuhed2YIRb7WlAh3ww9fxEQGA7LX87CPCXyR+a/FXRoQmrCro1yK8\njZdKQT7kNtXk483dgG6c7FWr1E+SJzAompP80Vq4EnukgGNzNTueOCYr/SXtLP5x\nGAl7exPCn/A1b9+S4m+sBwQ=\n-----END PRIVATE KEY-----\n",
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