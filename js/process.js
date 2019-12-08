// Start to user jquery
$(document).ready(() => {
    $("#select").on("change", () => {
        requestApi();
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

// fuction reques url 

function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// fuction getRcipe 

function getRecipe(data){
    data.recipes.forEach(element => {
        var select = $("#select").val();
        var { id, iconUrl, name,ingredients,instructions } = element;
     
        if (select == id) {
            var result = "";
            result +=`
            <div class = "row">
                <div class="col-6">
                    <h3>${name}</h3>
                </div>
                <div class="col-6">
                    <img src ="${iconUrl}" style="width:150px">
                </div>
            </div>
            `;
            
            $("#cake").html(result);
            getIngredient(ingredients);
            getInstructions(instructions);
        }
    });
}

// function get ingredient 

function getIngredient(ingredients){
    ingredients.forEach(ing =>{
        var {name,quantity,unit,iconUrl} = ing;
        var result = "";
        result +=`
        <div class ="row mt-3">
                <div class ="row">
                    <div class = "col-4">
                        <img src ="${iconUrl}" style="width:40px">
                    </div>
                    <div class = "col-4">
                        ${quantity}  ${unit[0]}
                    </div>
                    <div class = "col-4">
                        ${name}
                    </div>
                </div>
        </div>
        `;
        $("#ingredient").append(result);
    })
}

// function instuction 

function getInstructions(ins){
    ins.forEach(ins =>{
        var instructions = "";
        instructions +=`
            ${ins};
        `;
        $("#instruction").html(instructions);
    });
}