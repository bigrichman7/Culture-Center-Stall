$( document ).ready(function() {

    //Номера массивов соответствуют глобальному массиву имен генерал-полицмейстеров 
    //в переменной names файла information.js

    //Александро-Невская лавра
    let point1 = [0, 7, 10, 13, 28, 41, 45];

    //Церковь Святого Покрова
    let point2 = [24];

    //Смоленское православное кладбище
    let point3 = [27, 30];

    //Сергиева пустынь
    let point4 = [31, 37, 39];

    //Церковь Тихвинской Божией Матери
    let point5 = [33]; 

    //Свято-Троицкое кладбище
    let point6 = [35]; 

    //Вартемягская Софийская Церковь
    let point7 = [36]; 

    //кладбище села Большого Кузьмина
    let point8 = [38]; 

    //Новодевичье кладбище
    let point9 = [43, 47];

    //Казанское кладбище 
    let point10 = [49]; 

    //д. Васакара
    let point11 = [59]; 

    //Серафимовское кладбище
    let point12 = [66, 71, 72, 75, 77]; 

    //Большеохтинское кладбище
    let point13 = [69, 76]; 

    //Богословское кладбище
    let point14 = [73, 74];     

    let globalPoints = [point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14];
    let namePoints = ['Александро-Невская лавра', 'Церковь Святого Покрова', 'Смоленское православное кладбище', 'Сергиева пустынь', 'Церковь Тихвинской Божией Матери', 'Свято-Троицкое кладбище', 'Вартемягская Софийская Церковь', 'кладбище села Большое Кузьмино', 'Новодевичье кладбище', 'Казанское кладбище', 'д. Васакара', 'Серафимовское кладбище', 'Большеохтинское кладбище', 'Богословское кладбище'];

    let names = name_python.split(", ");

    //Вешаем слушатели на точки
    let points = $(".mappoint");

    for (let i=0; i < $(".mappoint").length; i++) {
        $(points[i]).mouseover(function() {
            leftPos = $(points[i]).css("left").replace("px", "");
            topPos = $(points[i]).css("top").replace("px", "");

            massPoint = globalPoints[i];
            let list = "<h6>" + namePoints[i] + "</h6>" + "<ul class=\"dead_generals\">";
            for (let j = 0; j < massPoint.length; j++) {
                list = list + "<li>" + names[massPoint[j]] + "</li>";
            }
            list = list + "</ul>";
            $("#note").html(list);

            $("#note").css("visibility", "visible");

            if ((Number(leftPos) + Number($("#note").css('width').replace('px', ''))) > 1916) 
                $("#note").css("left", (Number(leftPos) - Number($("#note").css('width').replace('px', '')) + 40) + "px");
            else
                $("#note").css("left", (Number(leftPos) + 30) + "px");
            
            if ((Number(topPos) + Number($("#note").css('height').replace('px', ''))) > 969)
                $("#note").css("top",  (Number(topPos) - Number($("#note").css('height').replace('px', '')) - 30) + "px");
            else
                $("#note").css("top",  (Number(topPos) + 30) + "px");
            
        })

        $(points[i]).mouseout(function() {
            $("#note").css("visibility", "hidden");
        })
    }



})