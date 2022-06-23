const path = require('path');
const fs = require('fs');

function func(jsonFileName = `任务书.json`, expression = "撰写-接受日期限定完成日期") {
  const json = require(`./${jsonFileName}`);
  const transform = (str = '') => {
    const split = str.split('-');

    function process(string, json) {
      const find = json.find(value => value.name === string);
      let chunk;
      if (!find) {
        chunk = {
          name: string,
          items: []
        };
        json.push(chunk)
      } else {
        chunk = find;
      }
      return chunk.items
    }

    let items = json;
    for (let string of split) {
      items = process(string, items);
    }
    fs.writeFileSync(path.join(__dirname, `./${jsonFileName}`), JSON.stringify(json))
    console.log(JSON.stringify(json,null,2))
  };

  transform(expression)
}

func('1.json', '{案号}');