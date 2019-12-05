// Start to user jquery
$(document).ready(() => {
    $("#select").on("change", () => {
        var cake = $("#select").val();
        console.log(cake);
    });
});


