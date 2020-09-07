var express = require('express');
var router = express.Router();

const got = require('got');
const parser = require('node-html-parser');
const map = new Map();
 
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

const load_html = async (url, res) => {
  try {
      const response = await got(url, {cache: map});
      return response.body;
  } catch (error) {
      return error.response.body
  }
}

const generate_meta_scrap_data = async (body) => {
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
  try {
    let html_content = await load_html(req.body.url, res);
    let meta_scrap_data = await generate_meta_scrap_data(html_content);
    res.json(meta_scrap_data);    
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send({error: "URL is missing! Please try again with url"})
  }
    
}
/* POST meta method. */
router.post('/', meta);
module.exports = router;
