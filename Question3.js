/*3. Write a function in node that inserts the following data in mysql , the email should
be unique and if the email already exists in the system then the name of the customer
will be updated with the new name that is there in the array for that customer.*/

// I used mongoDB insted of mysql.

const mongoose = require('mongoose')
const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag',
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer',
  },
  {
    email: 'ravi11@yopmail.com',
    name: 'ravi',
  },
  {
    email: 'akash11@yopmail.com',
    name: 'akash',
  },
  {
    email: 'anjali11@yopmail.com',
    name: 'anjai',
  },
  {
    email: 'santosh11@yopmail.com',
    name: 'santosh',
  },
]
//mongoDB connection ..
mongoose
  .connect('mongodb://localhost:27017/user')
  .then(() => {
    console.log(`connection successful..`)
  })
  .catch(err => {
    console.log(`No connection!!`)
    console.log(err)
  })

//mongoDB Schema ..

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
})

const user = new mongoose.model('user', userSchema)

//insert function
const insertUser = async (name, email) => {
  try {
    const res = await user.findOne({email: email})
    if (res) {
      const update = await user.updateOne({_id: res._id}, {$set: {name: name}})
      console.log(update)
    } else {
      const adata = new user({
        name: name,
        email: email,
      })
      const sdata = await adata.save()
    }
  } catch (err) {
    console.log(err)
  }
}
//array map..
customers.map(cl => {
  insertUser(cl.name, cl.email)
})
