import os
from os import path
import textract
import base64

images = []
name = []
caption = []
origin = []
education = []
service = []
rang = []
medals = []
death = []

#Адрес сервера, на котором хранятся данные
#Используется для подгрузки изображений
server_address = "127.0.0.1:5500" 


pythonPath = path.dirname(path.abspath(__file__))
index = pythonPath.find('python')
materialPath = "Материал\\Киоск генерал-полицмейстеры\\"
mainPath = pythonPath[:index] + materialPath

#Изначально список папок из директории получается отсортированным по алфавиту, т.е. за 1 следует 10, а не 2
#Метод предназаначен для сортировки по нумерации
def sortByNumber():
    noOrder = True
    while noOrder:
        noOrder = False
        for i in range(len(folders)-1):
            first = folders[i]
            first = first[0:folders[i].find(" ")]
            second = folders[i+1]
            second = second[0:folders[i+1].find(" ")]
            first = int(first)
            second = int(second)
            if second < first:
                noOrder = True
                temp = folders[i]
                folders[i] = folders[i+1]
                folders[i+1] = temp

#Возвращает имя файла .doc в указанной папке
def searchDoc(folder):
    for file in os.listdir(mainPath + folder):
        if file.endswith(".doc"):
            return file
    return ""

#Возвращает имя файла .jpg или .png в указанной папке
def searchImg(folder):
    mass = []
    for file in os.listdir(mainPath + folder):
        if file.endswith(".jpg"):
            #mass.append(server_address + "\\" + materialPath + folder + "\\" + file + "||")
            mass.append("..\\" + materialPath + folder + "\\" + file + "||")
        if file.endswith(".png"):
            #mass.append(server_address + "\\" + materialPath + folder + "\\" + file + "||")
            mass.append("..\\" + materialPath + folder + "\\" + file + "||")
        if file.endswith(".doc"):
            continue
    mass.append("&&")    
    
    return mass

#Заполняет переменные массива
def fullMass(text):
    origin_index = text.find('Происхождение:')
    global caption
    caption.append(text[0:origin_index] + '&&') #&& - используется для последующего разбиения на массив в js
    
    education_index = text.find('Образование:')
    global origin
    origin.append(str(text[origin_index:education_index]).replace('Происхождение:', '', 1) + '&&') #методо replace() удаляет дублирование заголовка раздела

    service_index = text.find('Служебная карьера:')
    global education
    education.append(str(text[education_index:service_index]).replace('Образование:', '', 1) + '&&')

    rang_index = text.find('Чины (звания):')
    global service
    service.append(str(text[service_index:rang_index]).replace('Служебная карьера:', '', 1) + '&&')

    medals_index = text.find('Награды:')
    global rang
    rang.append(str(text[rang_index:medals_index]).replace('Чины (звания):', '', 1) + '&&')

    death_index = text.find('Дата смерти и место захоронения:')
    global medals
    medals.append(str(text[medals_index:death_index]).replace('Награды:', '', 1) + '&&')

    global death
    death.append(str(text[death_index:]).replace('Дата смерти и место захоронения:', '', 1) + '&&')


folders = os.listdir(mainPath)
sortByNumber()


#Считывает содержимое файлов формата .doc в переменную text
for folder in folders:
    if len(searchDoc(folder)) != 0 :
        name.append(searchDoc(folder))
        text = textract.process(mainPath + folder + "/" + searchDoc(folder))
        fullMass(text.decode())
    else:
        print("Файл формата .doc в папке " + folder + " не найден.\n")

    
    images.append(searchImg(folder))


name = str(name).split('.doc')


#Создание .js файлов
img_js = open('js\\data\\img_python.js', 'w+', encoding="utf-8")
img_js.write('img_python = \'' + str(images).replace('\'', '').replace('[', '').replace(']', '').replace(', ', '') + '\';')
img_js.close()

name_js = open('js\\data\\name_python.js', 'w+', encoding="utf-8")
name_js.write(''.join(('name_python = \'', ''.join(name).replace('\'', '').replace('[', '').replace(']', ''), '\';')))
name_js.close()

caption_js = open('js\\data\\caption_python.js', 'w+', encoding="utf-8")
#caption_js.write("caption_python = \'" + " ".join((str(caption).replace('\\r', '').replace('\\n', '').replace('\', \'', ', ')).split()).replace('\'', '').replace('[', '').replace(']', '') + "\'")
caption_js.write("caption_python = \'" + " ".join((str(caption).replace('\', \'', ', ')).split()).replace('\'', '').replace('[', '').replace(']', '') + "\'")
caption_js.close()

origin_js = open('js\\data\\origin_python.js', 'w+', encoding="utf-8")
#origin_js.write('origin_python = \'' + " ".join(str(origin).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
origin_js.write('origin_python = \'' + " ".join(str(origin).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
origin_js.close()

education_js = open('js\\data\\education_python.js', 'w+', encoding="utf-8")
#education_js.write('education_python = \'' + " ".join(str(education).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
education_js.write('education_python = \'' + " ".join(str(education).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
education_js.close()

service_js = open('js\\data\\service_python.js', 'w+', encoding="utf-8")
#service_js.write('service_python = \'' + " ".join(str(service).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
service_js.write('service_python = \'' + " ".join(str(service).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
service_js.close()

rang_js = open('js\\data\\rang_python.js', 'w+', encoding="utf-8")
#rang_js.write('rang_python = \'' + " ".join(str(rang).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
rang_js.write('rang_python = \'' + " ".join(str(rang).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
rang_js.close()

medals_js = open('js\\data\\medals_python.js', 'w+', encoding="utf-8")
#medals_js.write('medals_python = \'' + " ".join(str(medals).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
medals_js.write('medals_python = \'' + " ".join(str(medals).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
medals_js.close()

death_js = open('js\\data\\death_python.js', 'w+', encoding="utf-8")
#death_js.write('death_python = \'' + " ".join(str(death).replace('\\r', '').replace('\\n', '').split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
death_js.write('death_python = \'' + " ".join(str(death).split()).replace('\'', '').replace('[', '').replace(']', '') + '\'')
death_js.close()