const mongoose = require('mongoose');

main().then(console.log("Database connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://guptaharsh137:ahkQRsy8yusHkE8c@naturemarkapp.zugynic.mongodb.net/Naturemark?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}