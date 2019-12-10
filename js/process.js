
// Start to user jquery
$(document).ready(() => {
    requestApi();
    $("#recipe").on("change", () => {
        var recipeId = $("#recipe").val();
        selectRecipe(recipeId);
    });

});
// function to request api 
var requestApi = () => {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => console.log("error"),
    });
}
// fuction request url 

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// fuction getRcipe 
var allData = [];
function getRecipe(data) {
    allData = data;
    var option = "";
    data.recipes.forEach(element => {
        var { id, name } = element;
        option += `
            <option value ="${id}">${name}</option>
        `;
    });
    $("#recipe").append(option);
}
// select recipi
function selectRecipe(myId) {
    allData.recipes.forEach(item => {
        var { id, name, iconUrl, nbGuests, instructions, ingredients } = item;
        if (id == myId) {
            eachRecipe(name, iconUrl);
            inGredient(ingredients);
        }
    });
}
// function each recipe 

function eachRecipe(name, iconUrl) {
    var result = "";
    result += `
        <div class="col-6">
            <h4>${name}</h4>
        </div>
        <div class="col-6">
            <img src = "${iconUrl}" style="width:200px">
        </div>
   `;
    $(".cake").html(result);
}
// ingredient 
function inGredient(ingredients) {
    var result = "";
    ingredients.forEach(item => {
        var { name, quantity, unit, iconUrl } = item;
        result += `
            <div class="col-6">
            
                <div class = "row">
                    <div class = "col-4"><img src = "${iconUrl}" style="width:40px"></div>
                    <div class = "col-4">${quantity} ${unit[0]}</div>
                    <div class = "col-4">${name}</div>
                </div>
            </div>
            <div class="col-6">
    
            </div>
        `;
    });
    $(".ingredient").html(result);
}