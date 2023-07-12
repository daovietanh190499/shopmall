console.clear()

let id = location.search.split('?')[1]
console.log(id)

let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))
document.getElementById("badge").innerHTML = cart_infor.list.length

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('VNĐ ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Mô Tả')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Xem Trước')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Thêm vào Giỏ hàng')
    buttonTag.onclick  =   function()
    {
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
        document.getElementById("badge").innerHTML = cart_infor.list.length
        window.localStorage.setItem("cart_infor", JSON.stringify(cart_infor))
    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}



// BACKEND CALLING
  
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSmLhRaYOz9RL78AsV4B64MG9f05zdq08TLkVYX8IepFS8HYAEd83Bt-gKOa0iD3xDMJraPTpDIkkID/pubhtml")
.then(res => res.text())
.then(res => {
    let table = document.createElement('div');
    let table_content = res.slice(res.indexOf("<table"), res.indexOf("table>") + 6)
    table.innerHTML = table_content
    let rows = convert(table.childNodes[0])
    console.log(rows)

    contentTitle = rows
  
    let contentDetails = rows[id-1]
    console.log(contentDetails);
    dynamicContentDetails(contentDetails)
})