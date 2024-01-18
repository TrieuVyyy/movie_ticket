import React from 'react'

export default function SecureGate({children}) {
    //kiểm tra user đã đăng nhập hay chưa
    let dataJson = localStorage.getItem ('USER_INFOR')
    let user = JSON.parse(dataJson)

    if (!user || user.maLoaiNguoiDung != 'QuanTri') {
        window.location.href = '/login';
    }
    return children;
}
