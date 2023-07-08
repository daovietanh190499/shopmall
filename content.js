// console.clear();

let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("VNĐ  " + ob.price);
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


function convert(table) {
  var header = ["id"];
  var rows = [];

  for (var i = 1; i < table.rows[1].cells.length; i++) {
    if (i < 7) {
      header.push(table.rows[1].cells[i].innerHTML.toLowerCase());
    }
  }

  for (var i = 2; i < table.rows.length; i++) {
      var row = {};
      row["id"] = i - 1;
      var images = []
      for (var j = 1; j < table.rows[i].cells.length; j++) {
          if (j >= 7) {
            images.push(table.rows[i].cells[j].childNodes[0].childNodes[0].src.split("=")[0]);
          } else {
            row[header[j]] = table.rows[i].cells[j].innerHTML;
          }
      }
      row['photos'] = images
      row['preview'] = images[0]
      rows.push(row);
  }
  return rows
}

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSmLhRaYOz9RL78AsV4B64MG9f05zdq08TLkVYX8IepFS8HYAEd83Bt-gKOa0iD3xDMJraPTpDIkkID/pubhtml")
.then(res => res.text())
.then(res => {
  let table = document.createElement('div');
  let table_content = res.slice(res.indexOf("<table"), res.indexOf("table>") + 6)
  table.innerHTML = table_content
  let rows = convert(table.childNodes[0])
  console.log(rows)

  contentTitle = rows

  let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))
  document.getElementById("badge").innerHTML = cart_infor.list.length

  for (let i = 0; i < contentTitle.length; i++) {
    if (contentTitle[i].is_accessory === "t") {
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
