
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads   = document.getElementById("ads")
let discount = document.getElementById("discount")
let category = document.getElementById("category")
let count = document.getElementById("count")
let total=document.getElementById("total")
let create = document.getElementById("create")
let createitem=document.getElementById("setinfo")
let search = document.getElementById('search')
let srchtit=document.getElementById("srchtit")
let srchcat=document.getElementById("srchcat")

let data=[];

if(localStorage.getItem("prodect")){
  data=JSON.parse(localStorage.getItem("prodect"))
}

srchcat.onclick=function(e){
  e.preventDefault();
  getsearchmood(srchcat.id);
}

srchtit.onclick=function(e){
  e.preventDefault();
  getsearchmood(srchtit.id);
}

let mood="create";
let temp;
let searchmood='title';



function getTotal(){
  if(price.value !="" & price.value>0){
    let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value
    total.innerHTML=result
    total.style.background="#040"
  }
  else{
    total.innerHTML=""
    total.style.background="#a00d02"
  }

}
createitem.addEventListener("submit",function(event){
  event.preventDefault();
  if(price.value !=""  & title.value !="" & category.value !="" ){
  let newpro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()
  }
  if(mood==="create"){
  if(count.value>1){
  for(let i=0;i<count.value;i++){
  data.push(newpro)
  } 
}
  else{
    data.push(newpro)
  }
  }
  else{
    data[temp]=newpro;
    mood="create";
    create.innerHTML="create";
    count.style.display="block";
  }
  localStorage.setItem("prodect",JSON.stringify(data))
  cleardata();
  showitem();
  }
})

function cleardata(){
  title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  count.value="";
  total.innerHTML=""
  category.value="";
  total.style.background="#a00d02"

}

function showitem(){
  let table='';

  for (let i=0;i<data.length;i++){
    table  +=
    `
      <tr>
      <td>${i+1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].category}</td>
      <td><button onclick="update(${i})">update</button></td>
      <td><button onclick=deletedata(${i})>delete</button></td>
      </tr>
    `
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete=document.getElementById("deleteAll");
  if(data.length> 0){
    btndelete.innerHTML=
    `
    <div class="fullinp">
    <button onclick="deleteALL()" class="w-100 link-light" id="deleteall">Delete All(${data.length})</button>
    </div>
    `
  }
  else{
    btndelete.innerHTML=""
  }
}
showitem();

function deleteALL(){
  data.splice(0)
  showitem();
  localStorage.clear();
}

function deletedata(index){
data.splice(index,1);
search.value=""
localStorage.prodect = JSON.stringify(data)
showitem();
}

function update(index){
  title.value=data[index].title;
  price.value=data[index].price;
  taxes.value=data[index].taxes;
  ads.value=data[index].ads;
  discount.value=data[index].discount;
  getTotal()
  search.value=""
  showitem()
  count.style.display="none";
  category.value=data[index].category;
  create.innerHTML="update"
  mood="update"
  temp=index;
  scroll({
    top:0
  })
}


function getsearchmood(id){
  if(id =="srchtit"){
    searchmood='title'
  }
  else if(id=="srchcat"){
    searchmood="category"
  }
  search.placeholder="search by "+searchmood;
  search.focus();
  search.value=""
  showitem()
}

function searchdata(val){
  val=val.toLowerCase()
  let table=''
  for(let i=0;i<data.length;i++){
  if(searchmood==="title"){
      if(data[i].title.includes(val)){
        table +=
        `
          <tr>
          <td>${i}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].category}</td>
          <td><button onclick="update(${i})">update</button></td>
          <td><button onclick=deletedata(${i})>delete</button></td>
          </tr>
        `;

      }
    }
  
  else{
    if(data[i].category.includes(val)){
      table +=
      `
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].category}</td>
        <td><button onclick="update(${i})">update</button></td>
        <td><button onclick=deletedata(${i})>delete</button></td>
        </tr>
      `;
    }
  }
}
  document.getElementById("tbody").innerHTML = table;

}

