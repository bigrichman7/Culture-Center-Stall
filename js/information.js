let images = img_python.split("&&");
let names = name_python.split(", ");
let captions = caption_python.split("&&,");
let origins = origin_python.split("&&,");
let educations = education_python.split("&&,");
let services = service_python.split("&&,");
let rangs = rang_python.split("&&,");
let medals = medals_python.split("&&,");
let death = death_python.split("&&,");

$( document ).ready(function() {

function getFace(path) {

}

//Заполняем список генералов
$(".generals ul").append(function(){
    let str = "";
    names.forEach(general => {
        str = str + "<li>" + general + "</li>";
    });
    return str; 
});

let generals = $('li');

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

//Вешаем слушатель при нажатии на каждого из генералов
for (let i = 0; i < generals.length; i++) {
    $(generals[i]).on('click', function(){
        $('#face').attr('src', (images[i].split("||"))[0]);
        $('.description .name').html(names[i]);
        $('.description .caption').html(captions[i]);
        $('.description .origin_content').html(origins[i]);
        $('.description .education_content').html(educations[i]);
        $('.description .service_content').html(services[i]);
        $('.description .rang_content').html(rangs[i]);
        $('.description .medal_content').html(medals[i]);
        $('.description .death_content').html(death[i]);
    });
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

console.log(images[0].split("||"));


});