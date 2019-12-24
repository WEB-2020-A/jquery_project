
// Start to user jquery
$(document).ready(() => {
    $("#line").hide();
    $(".count").hide();
    $("#container").hide();
    requestApi();
    $("#recipe").on("change", () => {
        var recipeId = $("#recipe").val();
        selectRecipe(recipeId);
        $("#line").show();
    $(".count").show();
    $("#container").show();
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
var quan = [];
var oldGuest = 0;
function selectRecipe(myId) {
    allData.recipes.forEach(item => {
        var { id, name, iconUrl, nbGuests, instructions, ingredients } = item;
        quan = ingredients;
        if (id == myId) {
            eachRecipe(name, iconUrl);
            inGredient(ingredients);
            inStructions(instructions);
            numberGuests(nbGuests);
            getQuantiy = item;
            oldGuest = nbGuests;
        }
    });
}
// function each recipe 
function eachRecipe(name, iconUrl) {
    var url = "";
    url += `
    <img src = "${iconUrl.toString()}"style="width:300px"class="rounded ">
   `;
    $(".cake").html(url); 
    var nameRecipe ="";
    nameRecipe +=`
    <h2>${name.toString()}</h2>
    `;
$("#name").html(nameRecipe);
}
// ingredient
function inGredient(ingredients) {
    var result = "";
    ingredients.forEach(item => {
        var { name, quantity, unit, iconUrl } = item;
        quan = quantity;
        result += `
                <div class = "row mt-3">
                    <div class = "col-4"><img src = "${iconUrl.toString()}" style="width:60px" class="rounded"></div>
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
function inStructions(step) {
    var data = step.split('<step>');
    var instruction = "";
    var i = 1;
    for (let i = 1; i < data.length; i++) {
        instruction += `
                <h5 class="text-primary">Step ${i} </h5> 
                <p>${data[i]}</p>
        `;
    }
    $("#ins").html("Instructions");
    $("#instructions").html(instruction);
}

// number guest 

function numberGuests(guest) {
    var result = "";
    result += `
    <div class="input-group mb-3 mt-3">
    <div class="input-group-prepend ">
        <button type="button" class="btn btn-info" id="minus">&minus;</button>
    </div>
    <input type="number" class="form-control text-center " value="${guest}" disabled id="member" max="15" min="0">
    <div class="input-group-append">
        <button type="button" class="btn btn-success" id="add">&#x2b;</button>
    </div>
</div>
    `;
    $(".count").html(result);
    $(".person").html("Number of person");
    computeNumber();
}
// compute number function 
function computeNumber() {

    $('#minus').on('click', function () {
        decreaseMember();
    });
    $('#add').on('click', function () {
        increaseMember();
    });
}
// decrease number
var member = "";
function decreaseMember(minus) {
    var minus = $('#member').val();
    var member = parseInt(minus) - 1;
    if (member >= 1) {
        $('#member').val(member);
        mal($("#member").val());
    }
}

// increase number
function increaseMember(add) {

    var add = $('#member').val();
    var members = parseInt(add) + 1;
    if (members <= 15) {
        $('#member').val(members);
        mal($("#member").val());
    }
}

// calculate
function userInput(values) {
    var getValue = parseInt(values) + 1;
    if (getValue <= 15) {
        $('#value').val(getValue);
        mal($("#member").val());
    }
}

function lowInput(values) {
    var lowValue = parseInt(values) - 1;
    if (lowValue >= 1) {

        $('#value').val(lowValue);
        mal($("#value").val());
    }
}
function mal(output) {
    var quan;
    var newQuan;
    var result = "";
    getQuantiy.ingredients.forEach(el => {
        var { iconUrl, quantity, name, unit } = el;
        quan = quantity / oldGuest;
        newQuan = quan * output;
        result += `
        <div class = "row mt-3">
        <div class = "col-4"><img src = "${iconUrl.toString()}" class="rounded" style="width:60px"></div>
        <div class = "col-1" id ="quantity" value ="${quantity}">${newQuan}</div>
        <div class = "col-3"> ${unit[0].toLowerCase()}</div>
        <div class = "col-4">${name}</div>
    </div>      
    `;
        $("#ingredient").html(result);
    })
}
