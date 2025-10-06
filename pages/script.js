//add to cart 
// create an empty array for storing cart items
let cart=[];
let menuItems=[];

//fetch the menu from json file and select the menu container
fetch('menu.json')
   .then(res=> res.json())
    .then(data=>{
        console.log(data);
        menuItems=data.items;
        console.log("Menu Items:", menuItems);
        const menuContainer = document.querySelector('.menu-container')
  //render the menu items
    data.items.forEach(dish => {
        const card=document.createElement("div");
        card.classList.add("Mainmenu")
        card.innerHTML= `
            <div class="menudetails">
                <i class="fa-regular fa-square-caret-up" style="color: #b71010;"></i>
                <h3>${dish.name}</h3>
                <p class="price">Rs.${dish.price}</p>
                <div class="ratingrows">
                    <span class="ratingnumber">
                        <i class="fa-solid fa-star fa-2xs" style="color: #63E6BE;"></i>3.5
                    </span>
                    <span class="peoplerating">${dish.rating}</span>
                </div>
                <p class="dish-description">${dish.description}</p>
            </div>
            <div class="dishimage">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="add-section">
                    <button class="Addbtn">ADD</button>
                    <div class="qty-box">
                       <button onclick="decreaseqty()">-</button>
                       <span id="qty-1">1</span>
                       <button onclick="increaseqty()">+</button>
                    </div>
                </div>
            </div>`
        const addBtn = card.querySelector(".Addbtn");
        addBtn.addEventListener("click", () => addtocart(dish.id));
        const line = document.createElement("div");
        line.classList.add("bottom-line1");
        menuContainer.appendChild(line);
        menuContainer.appendChild(card);
    });
});


function addtocart(id){
    const prod=menuItems.find((dish)=>dish.id==id)
    console.log(prod);
}
