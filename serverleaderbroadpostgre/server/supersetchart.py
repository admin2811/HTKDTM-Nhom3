import requests
from bs4 import BeautifulSoup
import json

superset_host = 'ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com'
username = 'admin'
password = 'admin'
chart_id = 2

def get_chart_data(chart_id, superset_host, username, password):
    try:
        # Thiết lập session cho xác thực
        s = requests.Session()
        login_form = s.post(f"http://{superset_host}/login")

        # Lấy token CSRF
        soup = BeautifulSoup(login_form.text, 'html.parser')
        csrf_token = soup.find('input', {'id': 'csrf_token'})['value']
        data = {
            'username': username,
            'password': password,
            'csrf_token': csrf_token
        }

        # Đăng nhập
        login_response = s.post(f'http://{superset_host}/login/', data=data)
        if login_response.status_code != 200:
            print("Đăng nhập thất bại!")
            return None

        # Chuẩn bị payload để truy vấn dữ liệu
        query_url = f'http://{superset_host}/api/v1/chart/data'
        payload = {
            "custom_cache_timeout": 0,
            "datasource": {
                "id": chart_id,
                "type": "table"
            },
            "force": True,
            "queries": [
                {
                    "columns": ['question_number', 'correct_percentage'],  # Để trống để lấy tất cả các cột
                    "filters": [
                        {
                            "col": "id_course",  # Cột điều kiện
                            "op": "==",         # Toán tử so sánh
                            "val": 1            # Giá trị cần lọc
                        }
                    ],
                    "row_limit": 10000,  # Giới hạn số lượng dòng
                }
            ],
            "result_format": "json",
            "result_type": "full"
        }

        # Gửi yêu cầu truy vấn dữ liệu
        response = s.post(query_url, json=payload)
        if response.status_code == 200:
            raw_data = response.json()
            result = {"id_course": "1"}
            data = raw_data["result"][0]["data"]


            for item in data:
                question_number = str(item["question_number"])
                correct_percentage = str(int(item["correct_percentage"]))
                result[question_number] = correct_percentage

            return result
        else:
            print("Không thể lấy dữ liệu từ chart:", response.text)
            return None

    except Exception as e:
        print("Đã xảy ra lỗi:", str(e))
        return None


# Sử dụng hàm
# superset_host = 'ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com'
# username = 'admin'
# password = 'admin'
# chart_id = 2

# chart_data = get_chart_data(chart_id, superset_host, username, password)
# if chart_data:
#     print("Dữ liệu của chart:", json.dumps(chart_data, indent=4))
# else:
#     print("Không thể lấy dữ liệu của chart.")