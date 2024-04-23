export default function SecureGate({ children }) {
  //kiểm tra user đã đăng nhập hay chưa
  let dataJson = localStorage.getItem("USER_INFOR");
  let user = JSON.parse(dataJson);

  if (!user || user.maLoaiNguoiDung != "QuanTri") {
    //hiện thông báo trước khi chuyển hướng trang
    const message = "Bạn cần đăng nhập với tài khoản Quản trị để truy cập trang này.";
    alert(message);
      window.location.href = "/login";
  }
  return children;
}
