$( document ).ready(function() {

    //Номера массивов соответствуют глобальному массиву имен генерал-полицмейстеров 
    //в переменной names файла information.js

    //Внимание! После 6-ой фамилии список продолжается с 8, поэтому данное обстоятельство нужно учитывать при указании индексов

    //Александро-Невская лавра +
    let point1 = [0, 6, 9, 12, 27, 40, 44];

    //Церковь Святого Покрова +
    let point2 = [23];

    //Смоленское православное кладбище +
    let point3 = [26, 29];

    //Сергиева пустынь +
    let point4 = [30, 36, 38];

    //Церковь Тихвинской Божией Матери +
    let point5 = [32]; 

    //Свято-Троицкое кладбище +
    let point6 = [34]; 

    //Вартемягская Софийская Церковь +
    let point7 = [35]; 

    //кладбище села Большого Кузьмина +
    let point8 = [37]; 

    //Новодевичье кладбище +
    let point9 = [42, 46];

    //Казанское кладбище +
    let point10 = [48]; 

    //д. Васакара +
    let point11 = [58]; 

    //Серафимовское кладбище +
    let point12 = [65, 70, 71, 74, 76]; 

    //Большеохтинское кладбище +
    let point13 = [68, 75]; 

    //Богословское кладбище +
    let point14 = [72, 73];     

    let globalPoints = [point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14];
    let namePoints = ['Александро-Невская лавра', 'Церковь Покрова Пресвятой Богородицы', 'Смоленское православное кладбище', 'Свято-Троицкая Сергиева мужская Пустынь', 'Церковь иконы Тихвинской Божией Матери', 'Свято-Троицкое кладбище', 'Софийская Церковь (п. Вартемяги)', 'кладбище села Большого Кузьмина', 'Новодевичье кладбище', 'Казанское кладбище (Царское Село)', 'Кладбище д. Васакара', 'Серафимовское кладбище', 'Большеохтинское кладбище', 'Богословское кладбище'];

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
                list = list + "<li><a href='information.html' id=n" + massPoint[j] + ">" + names[massPoint[j]] + "</a></li>";
            }
            list = list + "</ul>";
            $("#note").html(list);

            $("#note").css("visibility", "visible");

            if ((Number(leftPos) + Number($("#note").css('width').replace('px', ''))) > 1916) 
                $("#note").css("left", (Number(leftPos) - Number($("#note").css('width').replace('px', '')) + 25) + "px");
            else
                $("#note").css("left", (Number(leftPos) + 15) + "px");
            
            if ((Number(topPos) + Number($("#note").css('height').replace('px', ''))) > 969)
                $("#note").css("top",  (Number(topPos) - Number($("#note").css('height').replace('px', '')) - 15) + "px");
            else
                $("#note").css("top",  (Number(topPos) + 15) + "px");
            
        })

        $(points[i]).mouseout(function() {
            $("#note").css("visibility", "hidden");
        })
    }

    //Вешаем слушатели на #note
    $("#note").mouseover(function() {
        $("#note").css("visibility", "visible");
    });

    $("#note").mouseout(function() {
        $("#note").css("visibility", "hidden");
    })

    //Слушатель для записи ключа в Local storage при нажатии на имя (!НЕ РАБОТАЕТ)
    // $('#n36').mouseover(function() {
    //     sessionStorage.setItem('id', this.id);
    //     console.log(sessionStorage.getItem('id'));
    // });  

})