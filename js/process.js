
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
            inStructions(instructions);
            numberGuests(nbGuests);
        }
    });
}
// function each recipe 
function eachRecipe(name, iconUrl) {
    var result = "";
    result += `
        <div class="col-6">
            <h4>${name.toString()}</h4>
        </div>
        <div class="col-6">
            <img src = "${iconUrl.toString()}" style="width:200px">
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
                <div class = "row mt-3">
                    <div class = "col-4"><img src = "${iconUrl.toString()}" style="width:40px"></div>
                    <div class = "col-1" id ="quantity" value ="${quantity}">${quantity}</div>
                    <div class = "col-3"> ${unit[0].toLowerCase()}</div>
                    <div class = "col-4">${name}</div>
                </div>
        `;
    });
    $("#ingredient").html(result);
    $("#ing").html("Ingredients");
}
// instruction 
function inStructions(instructions) {
    var result = "";
    result += `
        ${instructions}
    `;
    $("#ins").html("Instructions");
    $("#instructions").html(result);
}
// number guest 

function numberGuests(guest) {
    var result = "";
    result += `
    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <button class="btn btn-primary" type="button" id="minus">&minus;</button>
    </div>
    <input type="number" class="form-control text-center" value="${guest}" disabled id="member" max="15" min="0">
    <div class="input-group-append">
        <button class="btn btn-success" type="button" id="add">&#x2b;</button>
    </div>
</div>
    `;
    $("#count").html(result);
    $("#person").html("Number of person");
    computeNumber();
}
// compute number function 
function computeNumber() {
    $('#minus').on('click', function () {
        var members = $('#member').val();
        decreaseMember(members);
    });
    $('#add').on('click', function () {
        var members = $('#member').val();
        increaseMember(members);
    });
}
// decrease number
function decreaseMember (minus) {
    var member = parseInt(minus) - 1;
    if(member >= 0) {
      $('#member').val(member);
      quantityDecrease();
    }
    
}

// increase number
function increaseMember(add) {
    var members = parseInt(add) + 1;
    if(members <= 15) {
    $('#member').val(members);
    }
}
// quantityDecrease
function quantityDecrease(){
    var quantity = $("#quantity").val();
    console.log(quantity);
    }