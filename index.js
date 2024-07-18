// console.clear();

let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "product/" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.Name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.Brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("VNĐ  " + ob.Price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING
// httpRequest.open(
//   "GET",
//   "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
//   true
// );
// httpRequest.send();
function searchProduct(){
  query = document.getElementById("input").value
  callSearchAPI(query)
}

function callSearchAPI(query){
  let query_str = ""
  if (query && query.length > 0) {
    query_str = "?query=" + query
  }
  fetch("https://script.google.com/macros/s/AKfycby9cMXkQ6RETVHt1p0ZOW3G6m7_VT3Usf-3lQQdn4l4qpGWrLK9gRHQoQD66CoQEQ/exec" + query_str)
  .then(res => res.json())
  .then(res => {
    contentTitle = res['data']
  
    let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))
    document.getElementById("badge").innerHTML = cart_infor.list.length

    containerAccessories.innerHTML = ""
    containerClothing.innerHTML = ""
    for (let i = 0; i < contentTitle.length; i++) {
      if (contentTitle[i].Is_Accessory === "t") {
        console.log(contentTitle[i]);
        containerAccessories.appendChild(
          dynamicClothingSection(contentTitle[i])
        );
      } else {
        console.log(contentTitle[i]);
        containerClothing.appendChild(
          dynamicClothingSection(contentTitle[i])
        );
      }
    }
  })
}

callSearchAPI("")
