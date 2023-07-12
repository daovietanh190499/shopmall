console.clear();

let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))

document.getElementById("badge").innerHTML = cart_infor.list.length

let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Chi Phí: VNĐ ' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Thông Tin Đơn Hàng')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Chi Phí: VNĐ ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = 'orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Đặt Hàng')
buttonTag.onclick = function()
{
    console.log("clicked")
}  
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
let totalAmount = 0

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSmLhRaYOz9RL78AsV4B64MG9f05zdq08TLkVYX8IepFS8HYAEd83Bt-gKOa0iD3xDMJraPTpDIkkID/pubhtml")
.then(res => res.text())
.then(res => {
    let table = document.createElement('div');
    let table_content = res.slice(res.indexOf("<table"), res.indexOf("table>") + 6)
    table.innerHTML = table_content
    let rows = convert(table.childNodes[0])
    console.log(rows)

    contentTitle = rows

    document.getElementById("totalItem").innerHTML = ('Tổng Sản Phẩm: ' + cart_infor.list.length)

    for (let i = 0; i < cart_infor.list.length; i++) {
        totalAmount += Number(contentTitle[cart_infor.list[i].id-1].price) * cart_infor.list[i].counter
        dynamicCartSection(contentTitle[cart_infor.list[i].id-1], cart_infor.list[i].counter)
    }

    amountUpdate(totalAmount)
})





