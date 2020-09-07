var express = require('express');
var router = express.Router();

const got = require('got');
const parser = require('node-html-parser');
const map = new Map();
 
const load = async (url, res) => {
    try {
        const response = await got(url);
        return response.body;
    } catch (error) {
        return error.response.body
    }
}

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
     const key = obj[property];
     if (!acc[key]) {
        acc[key] = obj.content;
     } else {
      if(typeof(acc[key]) == "string") {
        acc[key] = Array(acc[key])
      }     
      acc[key].push(obj.content);
     }     
     return acc;
  }, {});
}

const generator = async (body) => {
  let meta_elements = await parser.parse(body).querySelectorAll('meta'),
    res_name = [],
    res_property = [];

  meta_elements.forEach(function(el) {
      if(el.attributes.name){
        res_name.push(el.attributes)
      } else if(el.attributes.property) {
        res_property.push(el.attributes)
      }      
  })
  return Object.assign(groupBy(res_name, 'name'), groupBy(res_property, 'property'));
}

const meta = async(req, res, next) => {
    let body = await load(req.body.url, res);
    let re = await generator(body);
    res.json(re);
}
/* GET home page. */
router.post('/', meta);
module.exports = router;
