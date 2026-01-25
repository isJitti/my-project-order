// cart.js - ไฟล์ควบคุมระบบตะกร้าสินค้าทั้งหมด

// โหลดข้อมูลเมื่อเปิดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// ฟังก์ชันอัปเดตตัวเลขแดงๆ บนปุ่ม
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('myOrder')) || [];
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// ฟังก์ชันแสดงรายการใน Modal (เมื่อกดรูปตะกร้า)
function renderCartPopup() {
    let cart = JSON.parse(localStorage.getItem('myOrder')) || [];
    const listContainer = document.getElementById('cartItemsList');
    const totalElement = document.getElementById('cartTotalPopup');
    const btnConfirm = document.getElementById('btnConfirmOrder');

    if (!listContainer) return; // กัน Error ถ้าหน้าไหนไม่มี Modal

    listContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-muted my-4"><i class="fas fa-utensils fa-2x mb-2"></i><br>ยังไม่มีรายการอาหาร</div>';
        if (btnConfirm) btnConfirm.classList.add('disabled');
    } else {
        if (btnConfirm) btnConfirm.classList.remove('disabled');

        cart.forEach((item, index) => {
            total += item.price;
            listContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <span class="badge bg-secondary me-2">${index + 1}</span>
                        <span class="cart-item-title">${item.name}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="fw-bold me-3">${item.price} ฿</span>
                        <button class="btn-delete" onclick="deleteItem(${index})" style="color: #dc3545; background: none; border: none;">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }

    if (totalElement) totalElement.innerText = total + ' ฿';
}

// ฟังก์ชันลบสินค้า
function deleteItem(index) {
    let cart = JSON.parse(localStorage.getItem('myOrder')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myOrder', JSON.stringify(cart));

    updateCartCount();
    renderCartPopup(); // รีเฟรชหน้าต่าง Modal ทันที
}
// แก้ฟังก์ชันนี้ใน cart.js
// เพิ่มตัวแปร shop (ตัวที่ 3) เข้ามาในวงเล็บ
function addToCart(name, price, shop) {
    let cart = JSON.parse(localStorage.getItem('myOrder')) || [];

    // ถ้าไม่ได้ส่งชื่อร้านมา ให้ตั้งชื่อว่า 'general' (ร้านทั่วไป)
    let shopName = shop || 'general';

    // บันทึกชื่อร้านลงไปในตะกร้าด้วย
    cart.push({ name: name, price: price, shop: shopName });

    localStorage.setItem('myOrder', JSON.stringify(cart));

    updateCartCount();

    // Effect ปุ่มเด้ง
    const cartBtn = document.querySelector('.floating-cart');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
    }

    // เปลี่ยน Alert เป็น Console.log หรือใช้ Toast
    // alert(`เพิ่ม "${name}" ลงตะกร้าแล้ว!`); // ปิด alert ไว้จะได้ไม่รำคาญ
    console.log(`เพิ่ม ${name} จากร้าน ${shopName} เรียบร้อย`);
}