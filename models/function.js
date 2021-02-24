//get Product from DB
const fetchProducts = () => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (res) {
      ProductList = mapData(res.data);
      createProduct(ProductList);
      // console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// get Product from DB by id
const getProductById = (id) => {
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};
// getProductById(2);

//post Product to DB
const addProduct = () => {
  const newProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: newProduct,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete Product from DB
const deleteProduct = (id) => {
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Update Product by id from DB
const updateProduct = () => {
  const updateProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "PUT",
    data: updateProduct,
  })
    .then()
    .catch();
};
