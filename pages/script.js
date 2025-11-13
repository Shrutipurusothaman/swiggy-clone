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
        card.innerHTML += `
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
                </div>
            </div>`
        const addBtn = card.querySelector(".Addbtn");
        addBtn.addEventListener("click", () => addtocart(dish.id));
        const line = document.createElement("div");
        line.classList.add("bottom-line1");
        menuContainer.appendChild(card);
        menuContainer.appendChild(line);
    });
});
function addtocart(id){
    if(cart.some((dish)=>dish.id==id)){
        alert("product already exist")
    }else{
      const prod=menuItems.find((dish)=>dish.id==id)
      cart.push({
        ...prod,
        numberofunits: 1,
      });
      console.log(cart);
    }
    rendercart();
}
function rendercart(){
    const cartcontainer=document.querySelector(".cartitems");
    const totalAmountEl = document.querySelector(".total-amount");
    cartcontainer.innerHTML=""; 
    if(cart.length==0){
        cartcontainer.innerHTML=`<p>Your cart is empty</p>`;
        if (totalAmountEl) totalAmountEl.textContent = "Rs. 0";
        Updatecartcount(); 
        return;
        
    }
    let total=0;
    cart.forEach((item=>{
        const itemTotal = item.price * item.numberofunits; 
        total += itemTotal;
        const listitem=document.createElement("div");
        listitem.classList.add("list-items");
        listitem.innerHTML=`
            <div class="item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="Name">
                ${item.name}
            </div>
            <div class="totalprice">
               Rs.${itemTotal}
            </div>
            <div class="quantity">
                <span class="minus" data-id="${item.id}">-</span>
                <span>${item.numberofunits}</span>
                <span class="plus" data-id="${item.id}">+</span>
            </div>
        `;
        cartcontainer.appendChild(listitem);
    }));
    if (totalAmountEl) {
    totalAmountEl.textContent = `Rs. ${total}`;
  }
    addandreduce();
    Updatecartcount();
}
function addandreduce(){
    document.querySelectorAll(".plus").forEach(btn=>{
          btn.addEventListener("click",(e)=>{
            const id=Number(e.target.dataset.id);
            changeQuantity("increase",id);
          });
    });
    document.querySelectorAll(".minus").forEach(btn=>{
          btn.addEventListener("click",(e)=>{
            const id=Number(e.target.dataset.id);
            changeQuantity("decrease",id);
          });
    });
     document.querySelectorAll(".remove-item").forEach(btn => {
           btn.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            removeItem(id);
       });
    });
}

function changeQuantity(action,id){
    cart=cart.map((item)=>{
        let numberofunits=item.numberofunits;
        if(item.id===id){
            if(action==="increase"){
                numberofunits++;
            }else if(action=="decrease" && numberofunits>1){
                numberofunits--;
            }else if(action=="decrease" && numberofunits===1){
                numberofunits=0;
            }
    }
    return{...item,numberofunits};
  })
   .filter((item) => item.numberofunits > 0);
   rendercart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id != id);
  rendercart();
}

function Updatecartcount(){
    const cartcount=document.querySelector(".cart-count");
    let totalcount=0;
     cart.forEach(item => totalcount += item.numberofunits);
       if (cartcount) {
        cartcount.textContent = totalcount;
  }
}

//cartdisplay
const cartIcon = document.querySelector(".list-6");
const cart1 = document.querySelector(".shopping-cart");
const closeBtn = document.querySelector(".close-btn");
cartIcon.addEventListener("click", () => {
  cart1.classList.toggle("showcart");
});
closeBtn.addEventListener("click", () => {
  cart1.classList.remove("showcart");
});
 
const checkout=document.querySelector(".checkout-btn");
checkout.addEventListener("click",()=> {
    if(cart.length>0){
        alert("Your Items will arrive do complete the payment process");
    }else{
        alert("Add items to cart for payment processing");
    }
})