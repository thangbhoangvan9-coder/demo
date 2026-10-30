let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];


function displayBookings(bookings) {
  if (bookings.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenue = 0;

  bookings.forEach((element, index) => {
    console.log(
      `${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}`
    );

    console.log(
      `SL: ${element.ticketCount} | Giá: ${element.pricePerTicket} | Tổng TT: ${element.totalAmount}`
    );

    totalRevenue += element.totalAmount;
  });

  console.log(`Tổng: ${bookings.length} đơn đặt vé - Doanh thu: ${totalRevenue}`);
}


function formatName(name) {
  if (!name) {
    return "";
  }
  let trimed = name.trim();
  let words = trimed.split(" "); 
  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizeWords.join(" ");
}

function findBookingIndex(bookingCode) {
  return bookings.findIndex((booking) => {
    return booking.bookingCode === bookingCode.trim().toUpperCase();
  });
}

function validateBookingCode(bookingCode) {
  if (bookingCode.trim() === "") {
    return "Lỗi: Chưa nhập mã đặt vé";
  }

  let code = bookingCode.trim().toUpperCase();

  if (code.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }

  if (!code.startsWith("CIN-")) {
    return 'Lỗi: Sai tiền tố "CIN-"';
  }

  if (/\s/.test(code)) {
    return "Lỗi: Chứa khoảng trắng";
  }

  if (findBookingIndex(code) !== -1) {
    return "Lỗi: Mã đặt vé đã tồn tại";
  }
  return "";
}


function handleCreateBooking() {
  let bookingCode = prompt("Nhập mã đặt vé:");

  if (bookingCode === null) {
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let error = validateBookingCode(bookingCode);

  if (error !== "") {
    console.log(error);
    return;
  }

  let customerName = prompt("Nhập tên khách hàng:");

  if (customerName === null) {
    return;
  }

  customerName = formatName(customerName);

  let movieTitle = prompt("Nhập tên phim:");

  if (movieTitle === null) {
    return;
  }

  movieTitle = formatName(movieTitle);

  let ticketCount = Number(prompt("Nhập số vé:"));
  let pricePerTicket = Number(prompt("Nhập giá mỗi vé:"));

  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? baseCost * 0.1 : 0;
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  let newBooking = {
    bookingCode: bookingCode,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: totalAmount
  };

  bookings.push(newBooking);

  console.log("Thêm đơn đặt vé thành công!");
  displayBookings([newBooking]);
}


function handleUpdateBooking() {
  let bookingCode = prompt("Nhập mã đặt vé cần cập nhật:");
  if (bookingCode === null) {
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();
  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
    return;
  }

  let oldTotalAmount = bookings[index].totalAmount;

  let ticketCount = Number(prompt("Nhập số vé mới:"));
  let pricePerTicket = Number(prompt("Nhập giá mỗi vé mới:"));

  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? baseCost * 0.1 : 0

  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  bookings[index].ticketCount = ticketCount;
  bookings[index].pricePerTicket = pricePerTicket;
  bookings[index].totalAmount = totalAmount;

  console.log("Cập nhật thành công!");
  console.log("Tổng thanh toán cũ:", oldTotalAmount);
  console.log("Tổng thanh toán mới:", totalAmount);

  displayBookings([bookings[index]]);
}

function handleDeleteBooking() {
  let bookingCode = prompt("Nhập mã đặt vé cần xóa:");

  if (bookingCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
    return;
  }

  let confirmDelete = prompt("Bạn có muốn xóa không? (Y/N)");

  if (confirmDelete === null || confirmDelete.trim().toUpperCase() !== "Y") {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  bookings.splice(index, 1);

  console.log("Xóa đơn đặt vé thành công!");
  console.log("Số đơn còn lại:", bookings.length);
}

function handleSearchBooking() {
  let keyword = prompt("Nhập tên phim cần tìm:");

  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  keyword = keyword.trim().toLowerCase();

  let result = bookings.filter((booking) => {
    return booking.movieTitle.toLowerCase().includes(keyword);
  });

  if (result.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
    return;
  }

  displayBookings(result);
}

function main() {
  let choice;
  do {
    choice = +prompt(`
        ===================================
        HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
        ===================================
        1. Hiển thị danh sách đơn đặt vé
        2. Thêm đơn đặt vé mới
        3. Cập nhật đơn đặt vé
        4. Xóa đơn đặt vé
        5. Tìm kiếm đơn đặt vé theo tên phim
        0. Thoát chương trình
        ====================================
        Vui lòng nhập lựa chọn của bạn (0 - 5):
    `);

    switch (choice) {
      case 1:
        displayBookings(bookings);
        break;
      case 2:
        handleCreateBooking();
        break;
      case 3:
        handleUpdateBooking();
        break;
      case 4:
        handleDeleteBooking();
        break;
      case 5:
        handleSearchBooking();
        break;
      case 0:
        alert("Thoát chương trình");
        break;

      default:
        alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        break;
    }
  } while (choice !== 0);
}

main();