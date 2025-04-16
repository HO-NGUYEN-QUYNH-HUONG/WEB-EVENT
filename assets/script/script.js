let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Tự động chuyển slide mỗi 3 giây
setInterval(() => {
    changeSlide(1);
}, 3000);

const buyBtns = document.querySelectorAll('.js-buy-ticket');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.js-modal-container');
const modalClose = document.querySelector('.js-modal-close');
const buyTicketsBtn = document.getElementById("buy-tickets");
const confirmationMessage = document.getElementById("confirmation-message");

// Dữ liệu sự kiện
const events = [
    {
        name: "Tech Conference 2025",
        location: "Hà Nội",
        date: "Fri 27 Sep 2016",
        price: 150000,
        soldOut: true // Sự kiện này đã bán hết
    },
    {
        name: "Art Exhibition: Colors of Life",
        location: "TP.HCM",
        date: "Sat 28 Nov 2016",
        price: 100000,
        soldOut: false
    },
    {
        name: "Book Haven Fair",
        location: "Đà Nẵng",
        date: "Sun 29 Nov 2016",
        price: 100000,
        soldOut: false
    },
    {
        name: "Concert of the Year",
        location: "Hải Phòng",
        date: "Sun 23 Nov 2016",
        price: 200000,
        soldOut: false
    }
];

// Biến để lưu chỉ số sự kiện hiện tại
let currentEventIndex = null;

// Hiển thị modal và thiết lập thông tin sự kiện
function showBuyTickets(eventIndex) {
    currentEventIndex = eventIndex; // Lưu chỉ số sự kiện hiện tại
    const event = events[eventIndex];
    modal.classList.add('open');

    // Hiển thị thông tin sự kiện và địa điểm
    const eventInfo = document.getElementById("event-info");
    eventInfo.textContent = `Event: ${event.name} - Location: ${event.location} - Date: ${event.date}`;

    // Kiểm tra xem sự kiện đã bán hết chưa
    const soldOutElement = document.querySelector('.sold-out'); // Lấy phần tử Sold Out
    if (event.soldOut) {
        confirmationMessage.style.color = "red";
        confirmationMessage.innerHTML = "<i>Sorry, this event was sold out!</i>"; // Thông báo nghiêng
        soldOutElement.style.display = "block"; // Hiển thị khung Sold Out
    } else {
        confirmationMessage.textContent = ""; // Xóa thông điệp trước đó
        soldOutElement.style.display = "none"; // Ẩn khung Sold Out
    }
}

// Ẩn modal
function hideBuyTickets() {
    modal.classList.remove('open');
}

// Thêm sự kiện cho các nút mua vé
buyBtns.forEach((buyBtn, index) => {
    buyBtn.addEventListener('click', () => showBuyTickets(index)); // Truyền chỉ số sự kiện vào hàm
});

// Đóng modal khi nhấn nút đóng
modalClose.addEventListener('click', hideBuyTickets);

// Đóng modal khi nhấn ra ngoài modal container
modal.addEventListener('click', hideBuyTickets);
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

// Kiểm tra thông tin trước khi cho phép thanh toán
buyTicketsBtn.addEventListener("click", function() {
    const ticketQuantity = document.getElementById("ticket-quantity").value.trim();
    const ticketEmail = document.getElementById("ticket-email").value.trim();

    // Sử dụng biến currentEventIndex để lấy thông tin sự kiện
    const event = events[currentEventIndex];

    if (event.soldOut) {
        confirmationMessage.style.color = "red";
        confirmationMessage.innerHTML = "<i>Sorry, this event was sold out!</i>"; // Thông báo nghiêng
        return;
    }

    if (!ticketQuantity || isNaN(ticketQuantity) || ticketQuantity <= 0) {
        confirmationMessage.style.color = "red";
        confirmationMessage.textContent = "Please enter the valid number of tickets!";
        return;
    }

    // Tính tổng giá
    const totalPrice = event.price * ticketQuantity;

    if (!ticketEmail || !ticketEmail.includes("@")) {
        confirmationMessage.style.color = "red";
        confirmationMessage.textContent = "Please enter a valid email!";
        return;
    }

    confirmationMessage.style.color = "green";
    confirmationMessage.textContent = `You have booked ${ticketQuantity} tickets for "${event.name}" in ${event.location}. Tickets will be sent: ${ticketEmail}`;

    // Nội dung email
    const subject = encodeURIComponent(`Confirm the booking for ${event.name}`);
    const body = encodeURIComponent(
        `Congratulations!\n\n` +
        `You have successfully book ${ticketQuantity} tickets for "${event.name}"!\n` +
        `Location: ${event.location}\n` +
        `Time: ${event.date}\n` +
        `Total price: ${totalPrice.toLocaleString()} VNĐ\n` +
        `Please check your email for more details.\n\n` +
        `Best regards,\n` +
        `Event Organizing Committee.`
    );

    // Mở Gmail với nội dung email đã được điền sẵn
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${ticketEmail}&su=${subject}&body=${body}`;
    window.open(gmailLink, "_blank");

    setTimeout(hideBuyTickets, 15000);
});

// Lấy phần tử nút "Cuộn lên đầu trang"
let mybutton = document.getElementById("back-to-top");

// Ẩn nút khi ở đầu trang
mybutton.style.display = "none";

// Lắng nghe sự kiện cuộn trang
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        mybutton.style.display = "block"; // Hiện nút khi cuộn xuống
    } else {
        mybutton.style.display = "none"; // Ẩn nút khi ở đầu trang
    }
});

// Khi người dùng nhấn vào nút, cuộn lên đầu trang mượt mà
mybutton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");

    // Xử lý mở menu sidebar
    menuToggle.addEventListener("click", function () {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    // Đóng sidebar khi bấm nút X hoặc ra ngoài
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('sidebar').style.left = '0'; // Hiện sidebar
        document.getElementById('overlay').style.display = 'block'; // Hiện lớp phủ
    });
    
    document.getElementById('close-btn').addEventListener('click', function() {
        document.getElementById('sidebar').style.left = '-250px'; // Ẩn sidebar
        document.getElementById('overlay').style.display = 'none'; // Ẩn lớp phủ
    });
    
    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('sidebar').style.left = '-250px'; // Ẩn sidebar
        document.getElementById('overlay').style.display = 'none'; // Ẩn lớp phủ
    });

    