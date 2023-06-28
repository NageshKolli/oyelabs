/*1. Make a api for phone number login

a. Make add Customer api for customer, assume admin is adding customer ..
use the input params validation, code commenting, logging and check for
duplicates where required .
b. Use of transaction connection in mysql is good to have (not the requirement)*/

const express = require('express')
const mysql = require('mysql')
const logging = require('logging')

const app = express()

// Set up the MySQL connection.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database',
})

// Create the addCustomer() function.
function addCustomer(phone_number) {
  // Validate the phone number.
  if (!phone_number.isNumeric()) {
    logging.error('Invalid phone number: %s', phone_number)
    return false
  }

  // Check for duplicates.
  connection.beginTransaction()
  const sql = 'SELECT COUNT(*) AS count FROM customers WHERE phone_number = ?'
  connection.query(sql, [phone_number], (err, results) => {
    if (err) {
      logging.error(err)
      connection.rollback()
      return false
    }

    if (results[0].count > 0) {
      logging.error('Phone number already exists: %s', phone_number)
      connection.rollback()
      return false
    }

    // Add the customer to the database.
    const sql = 'INSERT INTO customers (phone_number) VALUES (?)'
    connection.query(sql, [phone_number], (err, results) => {
      if (err) {
        logging.error(err)
        connection.rollback()
        return false
      }

      logging.info('Customer added successfully: %s', phone_number)
      connection.commit()
      return true
    })
  })
}

// Add the addCustomer() function to the Express app.
app.post('/api/customers', (req, res) => {
  const phone_number = req.body.phone_number
  const success = addCustomer(phone_number)

  if (success) {
    res.status(200).send('Customer added successfully')
  } else {
    res.status(400).send('Failed to add customer')
  }
})

// Start the Express app.
app.listen(3000)
