# Bắt đầu với Frontend
## Available Scripts

Trong thư mục dự án frontend, bạn có thể chạy:

### `npm start`

Chạy ứng dụng ở chế độ phát triển.
Mở http://localhost:3000 để xem trên trình duyệt của bạn.

Trang sẽ tự động tải lại khi bạn thực hiện thay đổi.
Bạn cũng có thể thấy các lỗi lint trong bảng điều khiển.

### `npm test`

Khởi động trình chạy kiểm tra (test runner) ở chế độ tương tác.
Xem thêm trong phần chạy kiểm tra để biết thêm thông tin.

### `npm run build`

Tạo bản dựng cho ứng dụng ở chế độ sản xuất trong thư mục build.
Lệnh này sẽ đóng gói React ở chế độ sản xuất và tối ưu hóa ứng dụng để đạt hiệu năng tốt nhất.

Bản dựng được thu nhỏ (minify), và tên tệp bao gồm cả mã băm.
Ứng dụng của bạn đã sẵn sàng để được triển khai!

Xem thêm trong phần triển khai để biết thêm thông tin..

### `npm run eject`

**Lưu ý: đây là một thao tác một chiều. Một khi bạn đã eject, không thể quay lại!

Nếu bạn không hài lòng với các công cụ và cấu hình mặc định, bạn có thể eject bất kỳ lúc nào. Lệnh này sẽ xóa bỏ sự phụ thuộc vào công cụ duy nhất và sao chép tất cả các tệp cấu hình cũng như các phụ thuộc chuyển tiếp (transitive dependencies) như webpack, Babel, ESLint, v.v. vào dự án của bạn để bạn có toàn quyền kiểm soát.

Tất cả các lệnh trừ eject vẫn sẽ hoạt động, nhưng chúng sẽ trỏ đến các tệp đã sao chép để bạn có thể tùy chỉnh. Ở giai đoạn này, bạn hoàn toàn tự quản lý dự án.

Bạn không cần phải sử dụng eject. Bộ tính năng được chọn lọc này phù hợp cho các dự án nhỏ và trung bình, và bạn không cần cảm thấy bắt buộc phải sử dụng tính năng này trừ khi bạn thực sự cần tùy chỉnh sâu hơn.

# Bắt đầu với Backend
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