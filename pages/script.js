
//fetch the menu from json file and select the menu container
fetch('menu.json')
   .then(res=> res.json())
    .then(data=>{
        console.log(data);
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
                <button class="Addbtn" onclick="addtocart()">ADD</button>
            </div>`
            
        menuContainer.appendChild(card);
    });
});

//add to cart 
// create an empty array for storing cart items
let cart=[];

function addtocart(id){
    console.log(id);
}
