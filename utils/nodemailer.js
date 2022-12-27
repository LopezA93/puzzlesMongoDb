require("dotenv").config();
const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const ejs = require("ejs");
const path = require("path");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const mailOrden = async (user, order) => {
  // const requiredPath = path.join(__dirname, "../views/pages/OrderCreated.ejs");

  // const data = await ejs.renderFile(requiredPath, {
  //   nombre: user,
  //   order: order
  // });
  const prods = order.productos.map((i) => {
    return (i = {
      nombre: i.nombre,
      precio: i.precio,
      cantidad: i.cantidad,
    });
  });
  const items = JSON.stringify(prods);
  try {
    // console.log("prods,", prods);
    const info = await transporter.sendMail({
      to: user,
      from: EMAIL,
      subject: "Nueva orden generada de Puzzles",
      html: 
      // data
      `<h3> Le informamos que se ha confirmado la orden de compra realizada con los siguientes datos:</h3> 
        <p> Orden número: ${order.numero} </p>
        <p> Productos: ${items} </p>
        <p> Total: ${order.total} </p>
        <p> Desde ya muchas gracias por su compra. Cualquier duda o consulta no dude en contactarnos.</p>
        
         `,
    })
    
  } catch (error) {
    console.log(`Error en el envio de la orden: ${error}`);
  } finally {
    console.log('Order creada')
  }
};
module.exports = mailOrden;
