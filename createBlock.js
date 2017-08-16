'use strict';

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');                // будем работать с файловой системой
const pjson = require('./package.json'); // получим настройки из package.json
const dirs = pjson.config.directories;   // отдельно имеем объект с директориями (где лежит папка с блоками)
const mkdirp = require('mkdirp');        // зависимость

let blockName = process.argv[2];          // получим имя блока
let defaultExtensions = ['pug', 'scss']; // расширения по умолчанию
let extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));  // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if(blockName) {

  let dirPath = dirs.source + '/blocks/' + blockName + '/'; // полный путь к создаваемой папке блока
  mkdirp(dirPath, function(err){                            // создаем

    // Если какая-то ошибка — покажем
    if(err) {
      console.error('[NTH] Отмена операции: ' + err);
    }

    // Нет ошибки, поехали!
    else {
      console.log('[NTH] Создание папки ' + dirPath + ' (создана, если ещё не существует)');

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach(function(extention){

        let filePath = dirPath + blockName + '.' + extention; // полный путь к создаваемому файлу
        let fileContent = '';                                 // будущий контент файла
        let fileCreateMsg = '';                               // будущее сообщение в консоли при создании файла

        if(extention == 'scss') {
					fileContent = '.' + blockName +' {\n\n}';
        }
        else if(extention == 'pug') {
          fileContent = 'mixin '+ blockName +'(data)\n  .'+ blockName +'&attributes(attributes)';
        }
        else if(extention == 'js') {
          fileContent = '(function '+ dashToCamelCase(blockName) +'() {\n\n}());\n';
        }

        // Создаем файл, если он еще не существует
        if(fileExist(filePath) === false) {
          fs.writeFile(filePath, fileContent, function(err) {
            if(err) {
              return console.log('[NTH] Файл НЕ создан: ' + err);
            }
            console.log('[NTH] Файл создан: ' + filePath);
            if(fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        }
        else {
          console.log('[NTH] Файл НЕ создан: ' + filePath + ' (уже существует)');
        }
      });
    }
  });
}
else {
  console.log('[NTH] Отмена операции: не указан блок');
}

// Оставить в массиве только уникальные значения (убрать повторы)
function uniqueArray(arr) {
  var objectTemp = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    objectTemp[str] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(objectTemp);
}

// Привести к camelCase
function dashToCamelCase(myStr) {
    return myStr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

// Проверка существования файла
function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch(err) {
    return !(err && err.code === 'ENOENT');
  }
}
