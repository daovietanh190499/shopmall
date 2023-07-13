const appVue = new Vue({
    el: '#root',
    data: {
        paths: "",
        productList: [],
        cart_infor: {"list": []},
        totalAmount: 0,
        id_preview: 0,
        inCart: false,
        user: {
            name: "",
            phone: "",
            email: "",
            address: "",
        },
        order: {
            status: "",
            code: "",
            list: [],
            totalAmount: 0,
            user: {
                name: "",
                phone: "",
                email: "",
                address: "",
            }
        }
    },
    created () {

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
            let paths = window.location.pathname.split('/')
            this.paths = paths.slice(1)
            if (this.paths[0] === "order") {
                // console.log("test ok")
                fetch("https://script.google.com/macros/s/AKfycby9P9_oN-ET4dtOZN7rZDs2K9uXQuWSRs2QMBUc1RFbIm46MZq-5Zwc7r-nNpNFkt1h/exec?code=" + this.paths[1])
                .then(res => res.json())
                .then(res => {
                    this.order = res
                    totalAmount = 0
                    for (let i = 0; i < this.order.list.length; i++) {
                        totalAmount += Number(this.productList[this.order.list[i].id-1].price) * this.order.list[i].counter
                    }
                    this.order.totalAmount = totalAmount
                })
            } else if (this.paths[0] === "product") {
                for (let i = 0; i < cart_infor.list.length; i++) {
                    if (this.paths[1] == cart_infor.list[i].id) {
                        this.inCart = true
                        break
                    }
                }
            }

            document.getElementById("badge").innerHTML = cart_infor['list'].length
        })
    },
    methods : {
        changePreview(id) {
            this.id_preview = id
        },
        addToCart(id) {
            let cart = JSON.stringify({"list":[{"id":id, "counter":1}]})
            let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : cart)
            if (window.localStorage.getItem("cart_infor")) {
                let has_item = false
                for (let i = 0; i < cart_infor.list.length; i ++) {
                    if (cart_infor.list[i].id == id) {
                        cart_infor.list[i].counter += 1
                        has_item = true
                        break;
                    }
                }
                if (!has_item) {
                    cart_infor.list.push(JSON.parse(cart).list[0])
                }
            }
            window.localStorage.setItem("cart_infor", JSON.stringify(cart_infor))
            this.cart_infor = cart_infor
            window.location.reload()
        },
        placeOrder() {
            fetch(`https://script.google.com/macros/s/AKfycbw7JpGnyfg5JjmA-jaEKX5X-bs87xyEm0j4EsYgMor7a4BUyDHuU94JRduU1UJAoSvJ/exec?name=${this.user.name}&phone=${this.user.phone}&email=${this.user.email}&address=${this.user.address}&order_content=${window.localStorage.getItem("cart_infor")}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res['result'] === 'success') {
                    window.localStorage.setItem("cart_infor", JSON.stringify({"list": []}))
                    this.cart_infor = {"list": []}
                    window.location.replace('/orderPlaced')
                }
            })
        },
        deleteCart() {
            window.localStorage.setItem("cart_infor", JSON.stringify({"list": []}))
            this.cart_infor = {"list": []}
            window.location.reload()
        }
    }
})