fetch(`https://script.google.com/macros/s/AKfycbw7JpGnyfg5JjmA-jaEKX5X-bs87xyEm0j4EsYgMor7a4BUyDHuU94JRduU1UJAoSvJ/exec?name=${"vietanh"}&phone=${"0377669361"}&email=${"daovietanhsky@gmail.com"}&address=${"Từ Hồ, Hưng Yên"}&order_content=${window.localStorage.getItem("cart_infor")}`)
.then(res => res.json())
.then(res => {
    console.log(res)
    window.localStorage.setItem("cart_infor", JSON.stringify({"list": []}))
})
