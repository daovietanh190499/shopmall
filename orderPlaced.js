fetch(`https://script.google.com/macros/s/AKfycbyWNwR06egQEYqjfRF-7O-uiF-kxWnXXn-OGlG5kZ5Dav0vMSzBjGljEdAf_EMsfiA/exec?name=${"vietanh"}&phone=${"0377669361"}&email=${"daovietanhsky@gmail.com"}&address=${"Từ Hồ, Hưng Yên"}&order_content=${window.localStorage.getItem("cart_infor")}`)
.then(res => res.json())
.then(res => {
    console.log(res)
    window.localStorage.setItem("cart_infor", JSON.stringify({"list": []}))
})
