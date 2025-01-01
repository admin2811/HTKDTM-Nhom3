Bước 1: Set up môi trường ảo

    # Cài đặt môi trường ảo
    python -m venv .venv

    # Chạy môi trường ảo
    .venv\scripts\activate

    # Cài đặt các gói theo requirements.txt
    pip install -r requirements.txt

    # Thêm một file .env

    # Thêm các tham số sau
    SECRET_KEY=;(+9=(\x0c%*\x0b*a"6CHyjC0v\\o[\n@fQH\'!tIl:P\t\r60l\x0c)d\nvBRF8c`<^\nF3-Y
    DEBUG=True
    DATABASE_URL=postgresql://137.66.10.99:5432/serverleaderbroadpostgre

Bước 2: Thiết lập database

    - TH1: Nếu thử trên local (mà không muốn sử dụng database đã hosting)
        Bỏ comment đoạn sau trong code 

        # DATABASES = {
        #     'default': {
        #         'ENGINE': 'django.db.backends.sqlite3',
        #         'NAME': BASE_DIR / "db.sqlite3",  # Tên tệp cơ sở dữ liệu
        #     }
        # }

        Conemt lại đoạn DATABASE trên đó

        # Tạo migrations
        python manage.py makemigrations

        # Áp dụng migrations
        python manage.py migrate

    - TH2: Dùng trên local (nhưng muốn can thiệp vào database host)
        Dữ nguyên. Nhưng có thay đổi gì ở model hãy nhớ makegration

    - TH3: Hosting