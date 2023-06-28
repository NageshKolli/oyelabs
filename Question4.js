/*4. Create a new object which have all the properties of object person and student
const person = {
id : 2 ,
gender : 'mail'
};
const student = {
name : "ravi" ,
email :"ravi11@yopmail.com"
}; */

const person = {
  id: 2,
  gender: 'mail',
}
const student = {
  name: 'ravi',
  email: 'ravi11@yopmail.com',
}

let object = {
  ...person,
  ...student,
}

console.log(`${object.name}${object.id}${object.gender}${object.email}`)

console.log(object)
