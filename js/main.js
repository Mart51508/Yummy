/// <reference types="../@types/jquery" />
const search = document.getElementById("search");
const demo = document.getElementById("demo");
const category = document.getElementById('category')
const Area = document.getElementById('Area')
const ingredients = document.getElementById('ingredients')


const searchID = document.getElementById('searchID')
const categoriesID = document.getElementById('categoriesID');
const areaID = document.getElementById('areaID')
const ingredientsID = document.getElementById('ingredientsID')
const contactID = document.getElementById('contactID')
categoriesID?.addEventListener('click', function() {
  getCat();
});

areaID?.addEventListener('click' , function(){
  getArea()
})

ingredientsID?.addEventListener('click', function(){
  getING()
})

searchID?.addEventListener('click' , function(){
  
})



$("#bar").on("click", function () {
  $(".menu").toggle();
  if ($(".menu").is(":visible")) {
    $("#bar").removeClass("fa-bars").addClass("fa-x");
  } else {
    $("#bar").removeClass("fa-x").addClass("fa-bars");
  }
});

let close=$("#close").on("click", function () {
  $(".menu").toggle();
  if ($(".menu").is(":visible")) {
    $("#bar").removeClass("fa-x").addClass("fa-bars");
  } else {
    $("#bar").removeClass("fa-bars").addClass("fa-x");
  }
});

// let load=$(function(){
//   $('.loader').fadeOut(4000, function(){
//     $(".loading").slideUp(5000)
//   })
// })


// search


async function getbyName(term) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  response = await data.json()
  displaysearchMeals(response.meals) 
 console.log(response.meals);
}

async function getbyLetter(term) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await data.json()
  displaysearchMeals(response.meals) 
console.log(response.meals);
}
getbyName('s')
function displaysearchMeals(response) {
  let cartoona = "";

  for (let i = 0; i < response.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getsearchDetails('${response[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${response[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${response[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }
  search.innerHTML = cartoona
}


async function getsearchDetails(idMeal) {
      let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      response = await data.json();
      displaysearchDetails(response.meals[0]);
      console.log(response.meals[0]);
    }
    
    
    function displaysearchDetails(response) {
      let cartona = `
        <div class="col-md-4 text-white">
          <img class="w-100 rounded-2 mb-3"src="${response.strMealThumb }" >
          <h6 class="fw-bold">${response.strMeal}</h6>
        </div>
        <div class="col-md-7 text-white offset-1">
          <h3>Instructions</h3>
          <p>${response.strInstructions}</p>
          <h5><span>Area : </span>${response.strArea}</h5>
          <h5><span>Category : </span>${response.strCategory}</h5>
          <h5>Recipes:</h5>
          <a  class="btn btn-success" href="${response.strSource}" target="_blank">Source</a>
          <a  class="btn btn-danger"  href="${response.strYoutube}"target="_blank">Youtube</a>
        </div>`;
        search.innerHTML = cartona;
    }




// // catt
async function getCat() {
  var data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  var response = await data.json();
  displayCat(response.categories);
  console.log(response);
  console.log("hello");
}

getCat()


function displayCat(response) {
  let cartona = "";
  for (let i = 0; i < response.length; i++) {
    cartona += `
           <div class="col-md-3 position-relative overflow-hidden">
           <div class="container-image Pointer">
             <img src="${response[i].strCategoryThumb}" class="image w-100 rounded-2" />
             <div class="overlay overlayBottom text-center p-2 mb-2 rounded-2" onclick=" getCatMeal('${response[i].strCategory}')">
               <h3>${response[i].strCategory}</h3>
                <p>${response[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
            </div>
          </div>
        `;
  }
  category.innerHTML = cartona;
}

async function getCatMeal(category) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let response = await data.json();
  displayCatMeals(response.meals);
  console.log(response.meals);
  console.log("hello");
}

function displayCatMeals(response) {
  let cartona = ``;
  for (let i = 0; i < response.length; i++) {
    cartona += `
    <div class="col-md-3 position-relative overflow-hidden">
             <div class="container-image Pointer">
               <img src="${response[i].strMealThumb}" class="image w-100 rounded-2" />
               <div class="overlay overlayBottom text-center p-2 mb-2 rounded-2" onclick="getCatDetails('${response[i].idMeal}')">
               <h2>${response[i].strMeal}</h2>
              </div>
              </div>
            </div>
      `;
  }
  category.innerHTML = cartona;
}


async function getCatDetails(idMeal) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  response = await data.json();
  displayCatDetails(response.meals[0]);
  console.log(response.meals[0]);
}


function displayCatDetails(response) {
  let cartona = `
    <div class="col-md-4 text-white">
      <img class="w-100 rounded-2 mb-3"src="${response.strMealThumb }" >
      <h6 class="fw-bold">${response.strMeal}</h6>
    </div>
    <div class="col-md-7 text-white offset-1">
      <h3>Instructions</h3>
      <p>${response.strInstructions}</p>
      <h5><span>Area : </span>${response.strArea}</h5>
      <h5><span>Category : </span>${response.strCategory}</h5>
      <h5>Recipes:</h5>
      <a  class="btn btn-success" href="${response.strSource}" target="_blank">Source</a>
      <a  class="btn btn-danger"  href="${response.strYoutube}"target="_blank">Youtube</a>
    </div>`;
  category.innerHTML = cartona;
}

async function getArea() {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const response = await data.json();
  console.log(response.meals);
  displayArea(response.meals);
  console.log("hello");
}

getArea()

function displayArea(response) {
  let cartona = "";
  for (let i = 0; i < response.length; i++) {
    cartona += `
        <div class="col-md-3 position-relative overflow-hidden  text-center">
          <div class="container-image Pointer" onclick="getARMeal('${response[i].strArea}')">
          <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
            <h3 class="text-white mb-5">${response[i].strArea}</h3>
          </div>
        </div>
        `;
  }
  Area.innerHTML = cartona;
}

async function getARMeal(area) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let response = await data.json();
  displayARMeals(response.meals);
  console.log(response.meals);
  console.log("hello");
}

function displayARMeals(response) {
  let cartona = ``;
  for (let i = 0; i < response.length; i++) {
    cartona += `
    <div class="col-md-3 position-relative overflow-hidden">
             <div class="container-image Pointer">
               <img src="${response[i].strMealThumb}" class="image w-100 rounded-2" />
               <div class="overlay overlayBottom text-center p-2 mb-2 rounded-2" onclick="getAreaDetails('${response[i].idMeal}')">
               <h2>${response[i].strMeal}</h2>
              </div>
              </div>
            </div>
      `;
  }
  Area.innerHTML = cartona;
}


async function getAreaDetails(idMeal) {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  response = await data.json();
  displayAreaDetails(response.meals[0]);
  console.log(response.meals[0]);
}


function displayAreaDetails(response) {
  let cartona = `
    <div class="col-md-4 text-white">
      <img class="w-100 rounded-2 mb-3"src="${response.strMealThumb }" >
      <h6 class="fw-bold">${response.strMeal}</h6>
    </div>
    <div class="col-md-7 text-white offset-1">
      <h3>Instructions</h3>
      <p>${response.strInstructions}</p>
      <h5><span>Area : </span>${response.strArea}</h5>
      <h5><span>Category : </span>${response.strCategory}</h5>
      <h5>Recipes:</h5>
      <a  class="btn btn-success" href="${response.strSource}" target="_blank">Source</a>
      <a  class="btn btn-danger"  href="${response.strYoutube}"target="_blank">Youtube</a>
    </div>`;
    Area.innerHTML = cartona;
}

// ingredients
async function getING() {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  const response = await data.json();
  console.log(response.meals);
  displayING(response.meals);
}
getING()

 function displayING(response) {
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      if (response[i].strIngredient && response[i].strDescription) {
        cartona += `
              <div class="col-md-3 position-relative overflow-hidden  text-center">
                <div class="container-image Pointer" >
                  <i class="fa-solid fa-drumstick-bite fa-4x text-white" onclick="getINGMeal('${response[i].strIngredient}')" ></i>
                  <h3 class="text-white mb-5">${response[i].strIngredient}</h3>
                  <p class='text-white'>${response[i].strDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                </div>
              </div>
              `;
      }
    }
    ingredients.innerHTML = cartona;
  }


  async function getINGMeal(ING) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ING}`);
    let response = await data.json();
    displayINGMeals(response.meals);
    console.log(response.meals);
    console.log("hello");
  }

  function displayINGMeals(response) {
    let cartona = ``;
    for (let i = 0; i < response.length; i++) {
      cartona += `
      <div class="col-md-3 position-relative overflow-hidden">
               <div class="container-image Pointer">
                 <img src="${response[i].strMealThumb}" class="image w-100 rounded-2" />
                 <div class="overlay overlayBottom text-center p-2 mb-2 rounded-2" onclick="getINGDetails('${response[i].idMeal}')">
                 <h2>${response[i].strMeal}</h2>
                </div>
                </div>
              </div>
        `;
    }
    ingredients.innerHTML = cartona;
  }
  
  
  async function getINGDetails(idMeal) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    response = await data.json();
    displayINGDetails(response.meals[0]);
    console.log(response.meals[0]);
  }
  
  
  function displayINGDetails(response) {
    let cartona = `
      <div class="col-md-4 text-white">
        <img class="w-100 rounded-2 mb-3"src="${response.strMealThumb }" >
        <h6 class="fw-bold">${response.strMeal}</h6>
      </div>
      <div class="col-md-7 text-white offset-1">
        <h3>Instructions</h3>
        <p>${response.strInstructions}</p>
        <h5><span>Area : </span>${response.strArea}</h5>
        <h5><span>Category : </span>${response.strCategory}</h5>
        <h5>Recipes:</h5>
        <a  class="btn btn-success" href="${response.strSource}" target="_blank">Source</a>
        <a  class="btn btn-danger"  href="${response.strYoutube}"target="_blank">Youtube</a>
      </div>`;
      ingredients.innerHTML = cartona;
  }
  

  let Name = document.getElementById('Name')
let Phone = document.getElementById('Phone')
let password = document.getElementById('password')
let email = document.getElementById('email')
let Age = document.getElementById('age')
let repassword = document.getElementById('repassword')
let btnSubmit = document.getElementById('btnSubmit')
let nameAlert = document.getElementById('nameAlert')



function checkName() {
  let regex = /^[a-zA-Z]{0,100}$/;
  if(regex.test(Name.value)== true){
    return true
  }
  else{
    return false
  }
}

Name?.addEventListener('keyup' , function(){
  if( checkName()== true ){
    btnSubmit.removeAttribute('disabled')
    console.log('true');
    $('#nameAlert').css('display' , 'none')
  }else{
    btnSubmit.setAttribute('disabled', true)
    $('#nameAlert').css('display' , 'flex')
    console.log('false');
   let cartona=``
cartona+=`
<div class="alert alert-danger" role="alert">
Special characters and numbers not allowed
</div>
`
document.getElementById('nameAlert').innerHTML = cartona
  }
})



function mail(){
  let regex=/^[a-zA-Z0-9]{3,20}@(gmail|yahoo).com$/gm
  if( regex.test(email.value) == true){
   return true
  }else{
   return false
  }}

  email?.addEventListener('keyup' , function(){
    if( mail()== true ){
      btnSubmit.removeAttribute('disabled')
      console.log('true');
      $('#emailAlert').css('display' , 'none')
    }else{
      btnSubmit.setAttribute('disabled', true)
      $('#emailAlert').css('display' , 'flex')
      console.log('false');
     let cartona=``
  cartona+=`
  <div class="alert alert-danger" role="alert">
  Email not valid *exemple@yyy.zzz
  </div>
  `
  document.getElementById('emailAlert').innerHTML = cartona
    }
  })
  


function phone(){
  let regex=/^01[0125][0-9]{1,8}$/
 if( regex.test(Phone.value) == true){
  return true
 }else{
  return false
 }
}

Phone?.addEventListener('keyup' , function(){
  if( phone()== true ){
    btnSubmit.removeAttribute('disabled')
    console.log('true');
    $('#phoneAlert').css('display' , 'none')
  }else{
    btnSubmit.setAttribute('disabled', true)
    $('#phoneAlert').css('display' , 'flex')
    console.log('false');
   let cartona=``
cartona+=`
<div class="alert alert-danger" role="alert">
Enter valid Phone Number
</div>
`
document.getElementById('phoneAlert').innerHTML = cartona
  }
})

function pass(){
let regex = /[a-zA-Z]{3,8}[0-9]/gm
if( regex.test(password.value) == true){
  return true
 }else{
  return false
 }
}

password?.addEventListener('keyup' , function(){
  if( pass()== true ){
    btnSubmit.removeAttribute('disabled')
    console.log('true');
    $('#PassAlert').css('display' , 'none')
  }else{
    btnSubmit.setAttribute('disabled', true)
    $('#PassAlert').css('display' , 'flex')
    console.log('false');
   let cartona=``
cartona+=`
<div class="alert alert-danger" role="alert">
Enter valid password *Minimum eight characters, at least one letter and one number:*
</div>
`
document.getElementById('PassAlert').innerHTML = cartona
  }
})

repassword?.addEventListener('keyup' , function(){
  if( repassword.value === password.value ){
    btnSubmit.removeAttribute('disabled')
    console.log('true');
    $('#repassAlert').css('display' , 'none')
  }else{
    btnSubmit.setAttribute('disabled', true)
    $('#repassAlert').css('display' , 'flex')
    console.log('false');
   let cartona=``
cartona+=`
<div class="alert alert-danger" role="alert">
Enter valid repassword
</div>
`
document.getElementById('repassAlert').innerHTML = cartona
  }
})

function age(){
  let regex = /^[0-9]{1,2}$/gm
  if( regex.test(Age.value) == true){
    return true
   }else{
    return false
   }
  }

Age?.addEventListener('keyup' , function(){
  if( age()== true ){
    btnSubmit.removeAttribute('disabled')
    console.log('true');
    $('#ageAlert').css('display' , 'none')
  }else{
    btnSubmit.setAttribute('disabled', true)
    $('#ageAlert').css('display' , 'flex')
    console.log('false');
   let cartona=``
cartona+=`
<div class="alert alert-danger" role="alert">
Enter valid age
</div>
`
document.getElementById('ageAlert').innerHTML = cartona
  }
})