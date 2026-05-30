document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('successBanner');
    
    // Tạo hiệu ứng xuất hiện sau 300ms khi trang load
    setTimeout(() => {
        banner.classList.add('show');
    }, 300);

    // Bạn có thể thêm logic kiểm tra mã code ở đây nếu cần
    console.log("Hệ thống xác thực Lemon Bottle đã sẵn sàng.");
});

// random id

document.addEventListener('DOMContentLoaded', () => {
    const codeBtn = document.getElementById('randomCode');
    const banner = document.getElementById('successBanner');

    // 1. Hiệu ứng hiện thanh thông báo xanh mượt mà
    setTimeout(() => {
        if(banner) banner.classList.add('show');
    }, 300);

    // 2. Hàm tạo mã theo đúng quy tắc: Chữ - Số - Số - Chữ - Chữ - Chữ - Chữ
    function generateRandomCode() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        const char1 = letters.charAt(Math.floor(Math.random() * letters.length));
        const num2 = numbers.charAt(Math.floor(Math.random() * numbers.length));
        const num3 = numbers.charAt(Math.floor(Math.random() * numbers.length));
        const char4 = letters.charAt(Math.floor(Math.random() * letters.length));
        const char5 = letters.charAt(Math.floor(Math.random() * letters.length));
        const char6 = letters.charAt(Math.floor(Math.random() * letters.length));
        const char7 = letters.charAt(Math.floor(Math.random() * letters.length));

        return `${char1}${num2}${num3}${char4}${char5}${char6}${char7}`;
    }

    // 3. Cơ chế tự động kiểm tra và đổi mã sau mỗi 1 giờ
    function handleAutoUpdateCode() {
        const now = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 3,600,000 miliseconds
        
        const savedCode = localStorage.getItem('lemon_code');
        const lastUpdate = localStorage.getItem('lemon_code_time');

        // Nếu chưa có mã lưu trữ hoặc đã quá 1 giờ kể từ lần cuối tạo mã
        if (!savedCode || !lastUpdate || (now - lastUpdate) > oneHour) {
            const newCode = generateRandomCode();
            
            // Lưu mã mới và thời điểm tạo vào bộ nhớ trình duyệt
            localStorage.setItem('lemon_code', newCode);
            localStorage.setItem('lemon_code_time', now);
            
            // Hiển thị mã mới lên giao diện
            codeBtn.innerText = newCode;
        } else {
            // Nếu vẫn trong vòng 1 giờ, giữ nguyên mã cũ
            codeBtn.innerText = savedCode;
        }
    }

    // Chạy kiểm tra ngay khi trang web tải xong
    handleAutoUpdateCode();
});