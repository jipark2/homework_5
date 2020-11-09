function createBun(name, cost, image, description, glaze, quantity, type){
    this.name = name;
    this.cost = cost;
    this.image = image;
    this.description = description;
    this.glaze = glaze;
    this.quantity = quantity;
    this.type = type;
}

function cartItem(name, glaze, quantity, cost){
    this.name = name;
    this.glaze = glaze;
    this.quantity = quantity;
    this.cost = cost;
}

/*keep track of items in cart */
function addToCart() {
    /*update button to notify that item was added*/
    document.getElementById("cart").innerHTML = "ADDED TO CART!";
    setTimeout(
        function(){
            document.getElementById("cart").innerHTML = "ADD TO CART!";
        }, 2000
    );

    /*increment number of items in cart
    var count = Number(document.getElementById('inc').value);
    count += 1;
    document.getElementById('inc').value = count;
    sessionStorage.setItem("count", JSON.stringify(count));
`*/

    /*get bun of current page*/
    var bun = JSON.parse(localStorage.getItem("buns"));
    selectGlaze(bun);
    selectQty(bun);

    /*compute cost of buns*/
    const cost = bun.cost*bun.quantity
    /*new cartItem for cart list*/
    var addedItem = new cartItem(bun.name, bun.glaze, bun.quantity, Number(cost));
    var cartItems = JSON.parse(sessionStorage.getItem("cart"));

    if (cartItems === null) {
        cartItems = [];
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
    }
    cartItems.push(addedItem);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    document.getElementById('inc').value = cartItems.length;
}

/* for selecting the glaze and quantity options in the product detail page*/
function selectGlaze(item){
    var glaze = document.getElementById("glazeOptions");
    glaze.options[glaze.options.selectedIndex].selected = true;
    var glazeText = glaze.options[glaze.selectedIndex].text;
    item.glaze = glazeText;
}

function selectQty(item){
    var qty = document.getElementById("qtyOptions");
    qty.options[qty.options.selectedIndex].selected = true;
    var qtyText = qty.options[qty.selectedIndex].text;
    item.quantity = qtyText;
}


function matchedID(item){
    if (item === "Original"){
        var original = new createBun("Original Cinnamon Bun", 3.00, "images/original.jpeg", 
    "Our classic original cinnamon bun is a fan favorite.", "sugarmilk", 1, "Original");
        return original;
    } 
    else if (item === "Blackberry"){
        var blackberry = new createBun("Blackberry Cinnamon Bun", 3.75,"images/blueberry.jpeg",
    "Our classic roll with a Blackberry twist!", 
    "sugarmilk", 1, "Blackberry");
        return blackberry;
    }
    else if (item === "Pumpkin"){
        var pumpkinSpice = new createBun("Pumpkin Spice Bun", 4.00, "images/pumpkin-spice.jpeg",
    "Our pumpkin spice buns are a seasonal classic", "sugarmilk", 
    1, "Pumpkin");
        return pumpkinSpice;
    }
    else if (item === "Caramel"){
        var caramelPecan = new createBun("Caramel Pecan Bun", 3.75, "images/caramel-pecan.jpeg",
    "Our caramel pecan bun is filled with ooey gooey caramel.", "sugarmilk", 1, "Caramel");
        return caramelPecan;
    }
    else if (item === "Walnut"){
        var walnut = new createBun("Walnut Bun", 3.75, "images/walnutbun.jpeg", 
    "Everybody goes nuts for our walnut bun!",
    "sugarmilk", 1, "Walnut");
        return walnut;
    }
    else if (item === "Gluten"){
        var glutenFree = new createBun("Gluten Free Bun", 3.50, "gluten-free.jpeg",
    "We aim to our bun for all allergy types",
    "sugarmilk", 1, "Gluten");
        return glutenFree;
    }
}

/*format number to currency*/
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


/*store the selected bun type into local storage*/
function clickBun(item){
    var bun = matchedID(item);
    localStorage.setItem("buns", JSON.stringify(bun));
}


function loadProdPage(){
    /*get stored bun */
    var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    if (cartItems !== null) {
        document.getElementById('inc').value = 0;

    console.log(cartItems.length);
    document.getElementById('inc').value = cartItems.length;
    }
    var bun = JSON.parse(localStorage.getItem("buns"));
    
    /*update page for specific bun*/
    document.getElementById("prodName").textContent = bun.name;
    document.getElementById("prodCost").textContent = formatter.format(bun.cost);
    document.getElementById("description").textContent = bun.description;
    document.getElementById("image1").setAttribute("src", bun.image);
}

function loadCartPage(){

    var cartItems = JSON.parse(sessionStorage.getItem("cart"));

    var total = 0;

    for (var i = 0; i < cartItems.length; i++){
        var item = cartItems[i];
        console.log(item);
        var table = document.getElementsByClassName("itemsInCart")[0];
     
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = item.name;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = '<select id="glazeOptions">\
                        <option id="sugar-milk">sugar-milk</option>\
                        <option id="vanilla-milk">vanilla-milk</option>\
                        <option id="double chocolate">double chocolate</option>\
                        <option id="strawberry">strawberry</option>\
                    </select>';
        var glaze = document.getElementById(item.glaze);
        glaze.selected = true;
        var cell3 = row.insertCell(2);
        cell3.innerHTML = '<select id="qtyOptions"> \
                        <option id="1" >1</option>\
                        <option id="3">3</option>\
                        <option id="6">6</option>\
                        <option id="12">12</option>\
                    </select>';
        const quant1 = Number(item.cost)/Number(item.quantity);
        item.cost = quant1*item.quantity;
        var qty = document.getElementById(item.quantity);
        qty.selected = true;
        var cell4 = row.insertCell(3);
        cell4.id = "itemCost";
        cell4.innerHTML = formatter.format(item.cost);
        var cell5 = row.insertCell(4);
        cell5.innerHTML = '<input type="button" value="x" onclick="deleteRow(this)"/>';
        total += item.cost;
    }
    document.getElementById("sub").textContent = formatter.format(total);
    var tax = total*.025;
    document.getElementById("tax").textContent = formatter.format(tax);
    document.getElementById("total").textContent = formatter.format(total+5+tax);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));

    if (cartItems.length == 0){
        var table = document.getElementsByClassName("itemsInCart")[0];
     
        var row = table.insertRow(1);
        row.id = "empty";
        var cell1 = row.insertCell(0);
        cell1.id = "cells"
        cell1.innerHTML = "Cart is empty";
        document.getElementById("cells").setAttribute("colspan", 5);
        /*update the html loopng thorugh each item in list  */
    }
    document.getElementById('inc').value = cartItems.length;
}


    function deleteRow(item) {
        var cartItems = JSON.parse(sessionStorage.getItem("cart"));
        var table = document.getElementsByClassName("itemsInCart")[0];
        var row = item.parentNode.parentNode;
        const index = row.rowIndex
        if (index > -1){
            cartItems.splice(index-1, 1);
        }
        row.parentNode.removeChild(row);
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
            if (cartItems.length == 0){
        var table = document.getElementsByClassName("itemsInCart")[0];
     
        var row = table.insertRow(1);
        row.id = "empty";
        var cell1 = row.insertCell(0);
        cell1.id = "cells"
        cell1.innerHTML = "Cart is empty";
        document.getElementById("cells").setAttribute("colspan", 5);
        /*update the html looping thorugh each item in list  */

        document.getElementById('inc').value = cartItems.length;
    }
}

function updateNumCart(){
    var cartItems = JSON.parse(sessionStorage.getItem("cart"));
    document.getElementById('inc').value = cartItems.length;
}