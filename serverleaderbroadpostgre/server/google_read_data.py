import gspread
import csv
from oauth2client.service_account import ServiceAccountCredentials
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import pandas as pd
import json

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