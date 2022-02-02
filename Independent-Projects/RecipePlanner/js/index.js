let displayArea = document.querySelector('.displayArea');
let imgHoler = document.querySelector('.imgHoler');
let searchBtn = document.querySelector('.search-btn');
let details = document.querySelector('.details');
let hidden = document.querySelector('.hidden');
let shown = document.querySelector('.shown');
let header = document.querySelector('header')
let backBtn = document.querySelector('.back');

// Description title
let detailsTiltle = document.querySelector('.details-title');

// Description tags
let tags = document.querySelector('.tag-li');

// Description ingredients
let strIngredient1 = document.querySelector('.strIngredient1');
let strIngredient2 = document.querySelector('.strIngredient2');
let strIngredient3 = document.querySelector('.strIngredient3');
let strIngredient4 = document.querySelector('.strIngredient4');
let strIngredient5 = document.querySelector('.strIngredient5');
let strIngredient6 = document.querySelector('.strIngredient6');
let strIngredient7 = document.querySelector('.strIngredient7');
let strIngredient8 = document.querySelector('.strIngredient8');

// Description paragraph
let instructionsParagraph = document.querySelector('.instructionsParagraph');

// Video holder
let video = document.querySelector('.video')



imgHoler.innerHTML = `<h2 class="display-3 text-center text-muted fw-bold fs-4 mt-4 ">Searched items will display here</h2>`



// event listeners
searchBtn.addEventListener('click', getMealList);
imgHoler.addEventListener('click', getRecipe);
backBtn.addEventListener('click', goBack);


// Get meal searched list

function getMealList() {
    // By name API
    let xhr = new XMLHttpRequest();
    let searchInputTxt = document.querySelector('.search-input').value.trim();

    // Open by name url
    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`, true);  //${searchInputTxt}

    // By name url onload
    xhr.onload = function() {
        // console.log(this.status)
        if(this.status == 200) {
            // console.log(this.responseText);
            let data = JSON.parse(this.responseText)
            // console.log(data.meals)

            output = '';
            // **********LOOP*********** ${data.meals[m].strMealThumb}//
            if(data.meals && searchInputTxt.length > 0) {
                for(let m in data.meals) {
                    // console.log(m)
                    output += `
                    <div>    
                    <div class="holder meal-item" data-id= "${data.meals[m].idMeal}">
                            <img src="${data.meals[m].strMealThumb}" alt="sample image" class=" pr-4" style="border-radius: 20px; height:400px; width: 300px; ">
                            <div class="overlay">
                                <div class="category rounded-pill shadow-lg">
                                    <p class="fw-bold pt-2" style="font-family: 'Comforter', cursive;">Recipe-Planner</p>
                                </div>
                                <div class="text p-1">
                                    <a href = '#' class="display-6 fw-bold fs-5 link-btn text-white">${data.meals[m].strMeal}</a>
                                    <p class="text-muted">Meal ID: ${data.meals[m].idMeal}</p>
                                </div>
                            </div>
                    </div>
                </div>
                    `
            }
        }
        else {
            output += `<h2 class="display-3 text-muted fw-bold fs-4 mt-4 ">Sorry, we didn't find any meal!</h2>`
        }
            imgHoler.innerHTML = output;
            
            
            
        }
    }
    xhr.send();
   
};

function getRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('link-btn')) {
        hidden.classList.remove('hideItems');
        shown.classList.add('hideItems');
        let mealItem = e.target.parentElement.parentElement.parentElement;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`, true);
        xhr.onload = function() {
            if(this.status == 200) {
                let RecipeData = JSON.parse(this.responseText)
                console.log(RecipeData.meals);
                RecipeData.meals.forEach((data) => {

                    header.innerHTML = `<img src='${data.strMealThumb}' alt='header image' style = 'width: 100%; height: 250px; background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)); background-position: center;'>`;

                    detailsTiltle.innerHTML = `${data.strMeal}`;
                    tags.innerHTML = `${data.strCategory}`;

                    strIngredient1.innerHTML = `${data.strIngredient1}`;
                    strIngredient2.innerHTML = `${data.strIngredient2}`;
                    strIngredient3.innerHTML = `${data.strIngredient3}`;
                    strIngredient4.innerHTML = `${data.strIngredient4}`;
                    strIngredient5.innerHTML = `${data.strIngredient5}`;
                    strIngredient6.innerHTML = `${data.strIngredient6}`;
                    strIngredient7.innerHTML = `${data.strIngredient7}`;
                    strIngredient8.innerHTML = `${data.strIngredient8}`;

                    instructionsParagraph.innerHTML = `${data.strInstructions}`;

                    let output = '';
                    output += `
                                <a href="${data.strYoutube}" target = "_blank" class="btn rounded-pill video">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                    </svg>
                                    </span>
                                        Watch Video
                                </a>
                            `;
                    video.innerHTML = output;
                })
                
            };

        };
        xhr.send()
    }
}

function goBack() {
    hidden.classList.add('hideItems');
    shown.classList.remove('hideItems');
}



