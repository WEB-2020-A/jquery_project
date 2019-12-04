// Start to user jquery
$(document).ready(function () {
    $("#category").change(function () {
        var selectedItem = $(this).val();
        var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
        $.getJSON(
            url,
            function (data) {
                var result1 = "";
                var result2 = "";
                var result3 = "";
                data.recipes.forEach(element => {
                    const { name, iconUrl, nbGuests, instructions, ingredients } = element;
                    if (element.id == selectedItem) {
                        result1 += `
                       
                            <div class="col-6">
                                <h3>${name}</h3>
                            </div>
                            <div class="col-6">
                                <img src="${iconUrl}" alt="iconUrl" class="img-fluid">
                            </div>
            
                       `;
                        result2 += `
                        <div class="col-6">
                        <h3>Number of person</h3>
                    </div>
                    <div class="col-6">
                        <h4>Calculate</h4>
                    </div>
                        `;
                        element.ingredients.forEach(output => {
                            const { name, quantity, unit, iconUrl } = output;

                            result3 += `
                            <div class="col-12>
                            <img src="${iconUrl}" alt="iconUrl" class="img-fluid">
                        </div>
                        <div class="col-12>
                            <img src="${iconUrl}" alt="iconUrl" class="img-fluid">
                        </div>
                        <div class="col-12>
                            <img src="${iconUrl}" alt="iconUrl" class="img-fluid">
                            
                        </div>
                        `;
                        });
                        
                        
                    }
                });
                $('.result3').append(result3);
                $('.result1').append(result1);
                $('.result2').append(result2);

            });
    });

});



