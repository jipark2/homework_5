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

function addToCart() {
    var count = Number(document.getElementById('inc').value);
    count += 1;
    document.getElementById('inc').value = count;
    sessionStorage.setItem("count", JSON.stringify(count));
}


function matchedID(item){
    if (item === "Original"){
        var original = new createBun("Original Cinnamon Bun", 3.00, "images/original.jpeg", 
    "Our classic original cinnamon bun is a fan favorite.", "sugarmilk", 1, "Original");
        return original;
    } 
    else if (item === "Blackberry"){
        var blackberry = new createBun("Blackberry Bun", 2.50,"images/blueberry.jpeg",
    "Our blackberry buns are sweet and delicious. They are fresh.", 
    "sugarmilk", 1, "Blackberry");
        return blackberry;
    }
    else if (item === "Pumpkin"){
        var pumpkinSpice = new createBun("Pumpkin Spice Bun", 3.00, "images/pumpkin-spice.jpeg",
    "Our pumpkin spice buns are a fall favorite.", "sugarmilk", 
    1, "Pumpkin");
        return pumpkinSpice;
    }
    else if (item === "Caramel"){
        var caramelPecan = new createBun("Caramel Pecan Bun", 2.50, "images/caramel-pecan.jpeg",
    "Our caramel pecan bun is filled with fresh pecans and cinnamon buns.", "sugarmilk", 1, "Caramel");
        return caramelPecan;
    }
    else if (item === "Walnut"){
        var walnut = new createBun("Walnut Bun", 2.50, "images/walnutbun.jpeg", 
    "Everybody goes nuts for our walnut bun!",
    "sugarmilk", 1, "Walnut");
        return walnut;
    }
    else if (item === "Gluten"){
        var glutenFree = new createBun("Gluten Free Bun", 3.00, "images/gluten-free.jpeg",
    "We aim to make our buns accessible with gluten allergies.",
    "sugarmilk", 1, "Gluten");
        return glutenFree;
    }
}

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