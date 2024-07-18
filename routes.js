const appVue = new Vue({
    el: '#root',
    data: {
        url1: "https://script.google.com/macros/s/AKfycby9cMXkQ6RETVHt1p0ZOW3G6m7_VT3Usf-3lQQdn4l4qpGWrLK9gRHQoQD66CoQEQ/exec",
        url2: "https://script.google.com/macros/s/AKfycby9cMXkQ6RETVHt1p0ZOW3G6m7_VT3Usf-3lQQdn4l4qpGWrLK9gRHQoQD66CoQEQ/exec",
        paths: "",
        search_query: "",
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

        fetch(this.url1)
        .then(res => res.json())
        .then(res => {
            this.productList = res['data']

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
                fetch(`${this.url2}?code=` + this.paths[1], {"method": "POST"})
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
        searchProduct() {
            fetch(this.url1 + "?query=" + this.search_query)
            .then(res => res.json())
            .then(res => {
                this.productList = res['data']
            })
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
            fetch(`${this.url2}?name=${this.user.name}&phone=${this.user.phone}&email=${this.user.email}&address=${this.user.address}&order_content=${window.localStorage.getItem("cart_infor")}`, {method: "POST"})
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
        saveCart() {
            window.localStorage.setItem("cart_infor", JSON.stringify(this.cart_infor))
            let totalAmount = 0
            for (let i = 0; i < this.cart_infor.list.length; i++) {
                totalAmount += Number(this.productList[this.cart_infor.list[i].id-1].price) * this.cart_infor.list[i].counter
            }
            this.totalAmount = totalAmount
        },
        deleteCart() {
            window.localStorage.setItem("cart_infor", JSON.stringify({"list": []}))
            this.cart_infor = {"list": []}
            window.location.reload()
        },
        redirect(url) {
            window.location.replace(url)
        }
    }
})
