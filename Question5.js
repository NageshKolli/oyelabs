/*5. Make a promisifed function for the functioan having callback below , after the
function is promisifed then call the function like you call a promise
const request = require('request');
function getGoogleHomePage(finalCallBack){
request('http://www.google.com', function (error, response, body) {
console.error('error:', error); // Print the error if one occurred
finalCallBack(error);
console.log('statusCode:', response && response.statusCode); // Print the response status
code if a response was received
console.log('body:', body); // Print the HTML for the Google homepage.
finalCallBack(null,body);
});
};
console.log(getGoogleHomePage((result)=>{
console.log("RESULT==>",result);
})); */

const axios = require('axios')

const getGoogleHomePage = async () => {
  try {
    const res = await axios.get('http://www.google.com')
    console.log(`statusCode:${res.status} `)
    console.log(res.data)
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

getGoogleHomePage()
