Meta Scrapper

Run on local machine. Make sure the node version is higher than 10.x.x

1. npm install
2. npm start

sample API Request

curl --location --request POST 'http://localhost:3000/meta' \
--header 'Content-Type: application/json' \
--data-raw '{"url": "https://developer.mozilla.org"}'

Hosted url
curl --location --request POST 'http://18.216.32.29:80/meta' \
--header 'Content-Type: application/json' \
--data-raw '{"url": "https://developer.mozilla.org"}'

npm packages used
1. got - get web content
2. node-html-parser - html parser for node

Test case Run
1. npm test
Test coverage( 100% coverage for meta route. General App coverage is ignored for now)
1. npm run test-with-coverage
