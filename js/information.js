let images = img_python.split("&&");
let names = name_python.split(", ");
let captions = caption_python.split("&&,");
let origins = origin_python.split("&&,");
let educations = education_python.split("&&,");
let services = service_python.split("&&,");
let rangs = rang_python.split("&&,");
let medals = medals_python.split("&&,");
let death = death_python.split("&&,");

let currentGeneral = 0;


$( document ).ready(function() {

    console.log(sessionStorage.getItem('id'));

    //Заполняем список генералов
    $(".generals ul").append(function(){
        let str = "";
        names.forEach(general => {
            str = str + "<li>" + general + "</li>";
        });
        return str; 
    });
    //Запоняем список для тега select для мобильных устройств
    $(".generals select").append(function(){
        let str = "";
        let k = 0;
        names.forEach(general => {
            str = str + "<option value='" + k + "'>" + general + "</option>";
            k++;
        });
        return str; 
    });


    let generals;
    if (window.innerWidth > 1300) {
        generals = $('li');
        listenerForDesktop();
    } 
    else {
        generals = $('option');
        listenerForMobile();
    }
    

    //Удаляем знаки && у крайнего генерала в списке
    function cleaner(mass) {
        mass[mass.length-1] = mass[mass.length-1].replace("&&", '');
        return mass;
    }
    captions = cleaner(captions);
    origins = cleaner(origins);
    educations = cleaner(educations);
    services = cleaner(services);
    rangs = cleaner(rangs);
    medals = cleaner(medals);
    death = cleaner(death);

    //Удаляем первый символ из caption, если он равен " "
    for (i = 0; i < captions.length; i++) {
        if ((captions[i])[0] == " ") {
            captions[i] = captions[i].slice(1);
        }

        //Удаляем из caption ФИО, чтобы не дублировалось с именем
        n = names[i].split(" ");
        for (j = 0; j < n.length; j++) {
            captions[i] = captions[i].replace(n[j], "");
        }
    }

    //Преобразует символ \n в <br> и убирает символ \r
    function transfer(mass) {
        for (let i = 0; i < mass.length; i++) {
            elem = mass[i];
            let str = "";
            let isBR = false;
            for(let j = 0; j < elem.length; j++) {
                if (j != (elem.length-1) && elem[j] == "\r") {
                    continue;
                }
                if (j != (elem.length-1) && elem[j] == "\n"  && !isBR) {
                    str = str + "<br>";
                    isBR = true;
                    continue;
                }
                str = str + elem[j];
                isBR = false;
            }
            mass[i] = str.replace('<br>', "", 1);
        }
        return mass;
    } 
    
    origins = transfer(origins);
    educations = transfer(educations);
    captions = transfer(captions);
    services = transfer(services);
    rangs = transfer(rangs);
    medals = transfer(medals);
    death = transfer(death);

    //Получить количество изображений текущего генерал-полицмейстера
    function getAmountImgs() {
        currentAttr = $('#face').attr('src');
        if (currentAttr == null || currentAttr == "") return;
        index = images[currentGeneral].split("||").indexOf(currentAttr);
        amountImgs = images[currentGeneral].split("||").length - 1; //Последний элемент каждого массива равен ""
        return amountImgs;
    }

    function refresh() {
        $('.portrait').css('display', 'flex');
        $('.portrait-separator').css('display', 'none');
    }

    //Вешаем слушатель при изменении параметра option в мобильной версии
    function listenerForMobile () {
        $('#list-mobile').change(function () {
            $('#face').attr('src', (images[$(this).val()].split("||"))[0]);
                $('.description .name').html(names[$(this).val()]);
                $('.description .caption').html(captions[$(this).val()]);
                if ($(this).val() < 54) {
                    $('.description .origin').css('display', 'block');
                    $('.description .origin_content').html(origins[$(this).val()])
                } else {
                    $('.description .origin').css('display', 'none');
                }
                //$('.description .origin_content').html(origins[$(this).val()]);
                $('.description .education_content').html(educations[$(this).val()]);
                $('.description .service_content').html(services[$(this).val()]);
                $('.description .rang_content').html(rangs[$(this).val()]);
                $('.description .medal_content').html(medals[$(this).val()]);
                if (death[$(this).val()] == ' \n') {
                    $('.description .death').css('display', 'none')
                } else {
                    $('.description .death').css('display', 'block');
                    $('.description .death_content').html(death[$(this).val()]);
                }
                if (getAmountImgs() <= 1 || getAmountImgs() == undefined) {
                    $('.arrows').css('display', 'none');
                    refresh();
                    if (getAmountImgs() == undefined) {
                        $('.portrait-separator').css('display', 'block');
                        $('.portrait').css('display', 'block');
                    }
                } else {
                    $('.arrows').css('display', 'block');
                    refresh();
                }
        });
    }
    

    //Вешаем слушатель при нажатии на каждого из генералов
    function listenerForDesktop() {
        for (let i = 0; i < generals.length; i++) {
            $(generals[i]).on('click', function(){
                currentGeneral = i;
                $('#face').attr('src', (images[i].split("||"))[0]);
                $('.description .name').html(names[i]);
                $('.description .caption').html(captions[i]);
                if (currentGeneral < 54) {
                    $('.description .origin').css('display', 'block');
                    $('.description .origin_content').html(origins[i])
                } else {
                    $('.description .origin').css('display', 'none');
                } 
                $('.description .education_content').html(educations[i]);
                $('.description .service_content').html(services[i]);
                $('.description .rang_content').html(rangs[i]);
                $('.description .medal_content').html(medals[i]);
                if (death[i] == ' \n') {
                    $('.description .death').css('display', 'none')
                } else {
                    $('.description .death').css('display', 'block');
                    $('.description .death_content').html(death[i]);
                }
                console.log(death[i]);
                if (getAmountImgs() <= 1 || getAmountImgs() == undefined) {
                    $('.arrows').css('display', 'none');
                    refresh();
                    if (getAmountImgs() == undefined) {
                        $('.portrait-separator').css('display', 'block');
                        $('.portrait').css('display', 'block');
                    }
                } else {
                    $('.arrows').css('display', 'block');
                    refresh();
                }
            });
        };
    }

    $('#face').attr('src', (images[0].split("||"))[0]);
    $('.description .name').html(names[0]);
    $('.description .caption').html(captions[0]);
    $('.description .origin_content').html(origins[0]);
    $('.description .education_content').html(educations[0]);
    $('.description .service_content').html(services[0]);
    $('.description .rang_content').html(rangs[0]);
    $('.description .medal_content').html(medals[0]);
    $('.description .death_content').html(death[0]);
    if (getAmountImgs() <= 1 || getAmountImgs() == undefined) {
        $('.arrows').css('display', 'none');
    } else {
        $('.arrows').css('display', 'block');
    }


    //Выбрать предыдущий портрет
    $('#arrowLeft').on('click', function() {
        amountImgs = getAmountImgs();
        if (amountImgs > 1) {
            index--;
            if (index < 0) index = amountImgs - 1;
        } else return;
        $('#face').attr('src', (images[currentGeneral].split("||"))[index]);
    });

    //Выбрать следующий портрет
    $('#arrowRight').on('click', function() {
        amountImgs = getAmountImgs();
        if (amountImgs > 1) {
            index++;
            if (index >= amountImgs) index = 0;
        } else return;
        $('#face').attr('src', (images[currentGeneral].split("||"))[index]);
    })

});