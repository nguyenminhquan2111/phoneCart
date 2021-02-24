let ProductList = [];
let productCart = [];
let cartList = [];

const findById = function (id, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return i;
  }
  return -1;
};

//chuyển đổi data từ data của backend => data của mình
//input: data của backend
//output: data của mình sau khi đã map

const mapData = (dataFromDB) => {
  for (let i = 0; i < dataFromDB.length; i++) {
    var mappedProduct = new Product(
      dataFromDB[i].id,
      dataFromDB[i].name,
      dataFromDB[i].price,
      dataFromDB[i].screen,
      dataFromDB[i].backCamera,
      dataFromDB[i].frontCamera,
      dataFromDB[i].img,
      dataFromDB[i].desc,
      dataFromDB[i].type
    );
    ProductList.push(mappedProduct);
  }
  return ProductList;
};

const createProduct = (data) => {
  let productHTML = "";
  for (let i = 0; i < data.length; i++) {
    productHTML += `
    <div class="item">
      <div class="product">
        <div class="product__container">
          <div class="image__product">
            <img src="${data[i].img}" alt="${data[i].name}">
          </div>
          <h1>${data[i].name}</h1>
          <p>Price: ${data[i].price}</p>
        </div>
        <button class="btn btn-success" onclick="addToCart('${data[i].id}');">Add to Cart <i class="fas fa-shopping-cart"></i></button>
      </div>
    </div>
    
    `;
  }
  document.getElementById("productList").innerHTML = productHTML;
};

const handleTypePhone = () => {
  var result = [];
  var type = document.getElementById("selectProduct").value;
  type = type.toLowerCase().trim();
  // console.log(type);
  if (type.toLowerCase() === "all") {
    createProduct(ProductList);
  } else {
    for (let i = 0; i < ProductList.length; i++) {
      var convertedType = ProductList[i].type.toLowerCase();
      if (convertedType.includes(type)) {
        result.push(ProductList[i]);
      }
      createProduct(result);
    }
  }
};

const createTableCart = (data) => {
  data = data || cartList;
  var productHTML = "";
  var totalMoney = 0;
  for (let i = 0; i < data.length; i++) {
    productHTML += `<tr>
      <td class ="tbodyListItem"> 
        <img style="width: 100px" src="${data[i].img}"/>
      </td>
      <td>${data[i].name}</td>
      <td>${data[i].price}</td>
      <td>${data[i].quantity}</td>
      <td>
        <div>
          <button class="btn btn-success" onclick="handleDecreaseQuantity('${
            data[i].id
          }')">
          <p class=" w-20 h-20 d-inline">-</p>
          </button>
          <button class="btn btn-success" onclick="handleIncreaseQuantity('${
            data[i].id
          }')">
          <p class=" w-20 h-20 d-inline">+</p>
          </button>
        </div>
      </td>
      <td>${+data[i].price * +data[i].quantity} VND</td>
      <td>
        <button class="btn btn-danger" onclick="handleDeleteItem('${
          data[i].id
        }')">X</button>
      </td>
    </tr>`;
    totalMoney += +data[i].price * +data[i].quantity;
  }
  productHTML += `<tr class="tbodyTotal">
    <td></td>
    <td></td>
    <td></td>
    <td style="font-size: 30px" class="font-weight-bold">
     Tổng Tiền
    </td>
    <td style="font-size: 30px" class="font-weight-bold">${totalMoney} VND</td>
    <td>
      <button  onclick="handlePayTotal()" style="font-size: 30px" class="btn btn-primary">
        Thanh Toán
      </button>
    </td>
  </tr>`;

  document.getElementById("productCartList").innerHTML = productHTML;
};

const addToCart = (id) => {
  const foundedIndex = findById(id, ProductList);
  if (foundedIndex === -1) return alert("Sản Phẩm không tồn tại!!!!");

  const chosenProduct = ProductList[foundedIndex];

  const newCartItem = new CartItem(
    chosenProduct.id,
    chosenProduct.img,
    chosenProduct.name,
    chosenProduct.price,
    1
  );

  for (let i = 0; i < cartList.length; i++) {
    if (id === cartList[i].id) {
      cartList[i].quantity++;
      createTableCart(cartList);
      return;
    }
  }
  cartList.push(newCartItem);
  // createTableCart(productCart);

  createTableCart(cartList);
  console.log(cartList);
  saveLocalStorage();
  // console.log(chosenProduct);
};

const handleDecreaseQuantity = (id) => {
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      if (cartList[i].quantity > 1) {
        cartList[i].quantity--;
      } else {
        handleDeleteItem(id);
        alert("Sản phẩm sẽ bị xóa trong giỏ hàng !!!");
      }
    }
  }
  createTableCart(cartList);
};

const handleIncreaseQuantity = (id) => {
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      cartList[i].quantity++;
    }
  }
  createTableCart(cartList);
};

const handleDeleteItem = (id) => {
  const foundedIndex = findById(id, cartList);
  if (foundedIndex === -1) return alert("Mã Sinh Viên không hợp lệ");

  cartList.splice(foundedIndex, 1);

  createTableCart(cartList);
  saveLocalStorage();
};

const handlePayTotal = () => {
  alert("Thanh toán xong !!!!");
  cartList = [];
  createTableCart(cartList);
  saveLocalStorage();
};

const saveLocalStorage = function () {
  //hảm chuyển từ Obj sang JSON
  const cartListJSON = JSON.stringify(cartList);
  console.log(cartListJSON);
  //localStorage(tên nơi để lưu dữ liệu,dữ liệu cần lưu "dạng chuỗi")
  localStorage.setItem("data", cartListJSON);
};

const getDataFromLocalStorage = function () {
  const dataJSON = localStorage.getItem("data");
  //check data khác rỗng
  if (!dataJSON) return;
  //chuyển từ JSON sang Obj
  const data = JSON.parse(dataJSON);
  //gán data lấy được vào list cart
  cartList = data;
  //render lại table
  createTableCart(cartList);
};

fetchProducts();
console.log(ProductList);

getDataFromLocalStorage();
