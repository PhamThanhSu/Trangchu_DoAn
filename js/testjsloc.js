function handleeFilterFileresult(filterTerm) {
    const filter = {
        brand: null,
        price: null,
        cpu: null,
        vga: null,
    };
    // Lấy giá trị từ thuộc tính 'value'
    var filterValue = filterTerm.getAttribute('value');
    filterValue = filterValue.toString();
    //So sánh mảng các mục cần tìm
    if (['1', '2', '3', '4'].includes(filterValue)) {
        filter.price = filterValue;
    } else if (['ASUS', 'ACER', 'MSI', 'LENOVO', 'DELL', 'HP', 'LG'].includes(filterValue)) {
        filter.brand = filterValue;
    }else if (['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'ADM Ryzen', 'Xeon'].includes(filterValue)) {
        filter.cpu = filterValue;
    }
    // Thêm giá trị vào mảng filtertest
   //Đã thêm vào local nên ẩn dòng này đi var filtertest = JSON.parse(localStorage.getItem('filtertest')) || [];
    filtertest.push(filterValue);
    console.log(filtertest.length);
    var index = filtertest.length;
    if (index > 1) {
        // Xóa phần tử đầu tiên khỏi mảng (vì chỉ cho mảng chứa 2 phần tử nên sẽ xóa phần tử đầu tiên)
        filtertest.splice(0, 1);
    }
    //Cập nhật lại filtertest vào Local Storage sau khi đã xóa phần tử
    localStorage.setItem('filtertest', JSON.stringify(filtertest));
     // Lưu mảng filtertest vào localStorage
     localStorage.setItem('filter', JSON.stringify(filter));
     //Cập nhật lại filtertest vào Local Storage sau khi đã xóa phần tử
     localStorage.setItem('filtertest', JSON.stringify(filtertest));
      // Lưu mảng filtertest vào localStorage
    //Đã thêm vào local nên ẩn dòng này đi  localStorage.setItem('filtertest', JSON.stringify(filtertest));
      // Lưu mảng storedArray vào localStorage
    //Đã thêm vào local nên ẩn dòng này đi  localStorage.setItem('ArrayListProducts', JSON.stringify(storedArray));
     // Hiển thị giá trị filtertest trong console
 
    console.log(filtertest);
    console.log(storedArray);
    // Chuyển hướng trang sau khi xử lý xong dữ liệu
    window.location.href = `ResultSearch.html?filterTerm=${filterValue}`;
    return false; // Ngăn chặn việc gửi biểu mẫu
}
//Lấy giá trị mảng sản phẩm từ LocalStorage
const storedJsonString = localStorage.getItem('ArrayListProducts');
// Chuyển đổi chuỗi JSON thành mảng
const storedArray = JSON.parse(storedJsonString);
// Lấy giá trị filter từ localStorage
const filtertest = JSON.parse(localStorage.getItem('filtertest'));
//Lấy giá trị của hàm filter từ local
const storedJsonfilterString = localStorage.getItem('filter');
const filterarr = JSON.parse(storedJsonfilterString);

 console.log(filtertest);
// Gọi hàm ListSellingProducts với các filter
ListSellingProducts(storedArray, filtertest);

function ListSellingProducts(storedArray, filtertest = []) {
    let s = `<div class="item-selling-products" id="item-selling-products">`;
    for (let i = 0; i < storedArray.length; i++) {
        const product = storedArray[i];
        var anh = product.img;
        var thuonghieu = product.thuonghieu;
        var name = product.name;
        var cpu = product.cpu;
        var ram = product.ram;
        var ssd = product.ssd;
        var vga = product.vga;
        var lcd = product.lcd;
        var pricecompare = product.pricecompare;
        var pricehighlight = product.pricehighlight;
        var labelonsale = product.labelonsale;

        // Kiểm tra điều kiện lọc, nếu filterValue không rỗng thì thực hiện lọc
        if(filterarr.brand){
            if (!filtertest.includes(thuonghieu)) {
                continue;
            }
        }
         // Kiểm tra điều kiện lọc giá
        if(filterarr.price)         //Dùng filtertest hay filterarr.{Gía trị cần lọc} đều được
        {
            if (pricehighlight < 10000000 && !filtertest.includes('1')) continue;
            if (pricehighlight >= 10000000 && pricehighlight <= 15000000 && !filtertest.includes('2')) continue;
            if (pricehighlight > 15000000 && pricehighlight <= 25000000 && !filtertest.includes('3')) continue;
            if (pricehighlight > 25000000 && !filtertest.includes('4')) continue;
        }
        if (filterarr.cpu) {
            if(!filtertest.includes(cpu))
              continue;
         }
 
         if (filterarr.vga) {
             if(filtervga.includes(vga) == false)
               continue;
          }
 


        s += `
            <div class="item-show">
                <a href="#">
                    <img src="${anh}" width="100%"/>
                </a>
                <div class="detail">
                    <h3 class="name-product">
                        <a id="name" href="#" title="${name}" tabindex="0">${name}</a>
                    </h3>
                    <div class="technical">
                        <div class="cpu">
                            <span>${cpu}</span>
                        </div>
                        <div class ="vga">
                            <span>${vga}</span>
                        </div>
                        <div class="ram">
                            <span>${ram}</span>
                        </div>
                        <div class="ssd">
                            <span>${ssd}</span>
                        </div>
                        <div class="lcd">
                            <span>${lcd}</span>
                        </div>
                    </div>
                    <div class="price">
                        <div class="price--compare">
                            <del>${pricecompare}</del>
                        </div>
                        <div class="price--default">
                            <span class="pricehighlight">${pricehighlight}</span>
                            <span class="label--on-sale">${labelonsale}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    s += `</div>`;
    document.getElementById("item-selling-products").innerHTML = s;
}