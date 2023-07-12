const appVue = new Vue({
    el: '#root',
    data: {
        paths: "",
        productList: [],
        cart_infor: {"list": []},
        totalAmount: 0
    },
    created () {
        let paths = window.location.pathname.split('/')
        this.paths = paths.slice(1)

        fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSsxNHL-vaqMMnVoya19qYkWWyHD6y9KXXbWkO7xWE9I665bdEpidMtHM7QhUs_iJSaIhOF2HSOEPTt/pubhtml")
        .then(res => res.text())
        .then(res => {
            let table = document.createElement('div');
            let table_content = res.slice(res.indexOf("<table"), res.indexOf("table>") + 6)
            table.innerHTML = table_content
            let rows = convert(table.childNodes[0])
            this.productList = rows

            let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))
            this.cart_infor = cart_infor
            document.getElementById("badge").innerHTML = cart_infor.list.length

            let totalAmount = 0
            for (let i = 0; i < cart_infor.list.length; i++) {
                totalAmount += Number(this.productList[cart_infor.list[i].id-1].price) * cart_infor.list[i].counter
            }
            this.totalAmount = totalAmount
        })
    },
})