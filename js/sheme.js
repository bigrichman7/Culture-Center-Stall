$( document ).ready(function() {


    let points = $(".mappoint");

    for (let i=0; i < $(".mappoint").length; i++) {
        $(points[i]).mouseover(function() {
            leftPos = $(points[i]).css("left").replace("px", "");
            topPos = $(points[i]).css("top").replace("px", "");

            $("#note").css("visibility", "visible");
            $("#note").css("left", (Number(leftPos) + 30) + "px");
            $("#note").css("top",  (Number(topPos) + 30) + "px");
        })

        $(points[i]).mouseout(function() {
            leftPos = $(points[i]).css("left").replace("px", "");
            topPos = $(points[i]).css("top").replace("px", "");

            $("#note").css("visibility", "hidden");
            $("#note").css("left", (Number(leftPos) + 30) + "px");
            $("#note").css("top",  (Number(topPos) + 30) + "px");
        })
    }

    




})