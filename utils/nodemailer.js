require('dotenv').config();
const nodemailer = require('nodemailer');
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

const mailOrden = async (user, order) => {
try {
    const info = await transporter.sendMail({
        to:user,
        from: EMAIL,
        subject:"Nueva orden generada de Puzzles",
        text: `Le informamos que se ha confirmado la orden de compra realizada con los siguientes datos:
        Orden número: ${order.numero}, productos: ${order.productos} por un total de $ ${order.total}.
        Desde ya muchas gracias por su compra. Cualquier duda o consulta no dude en contactarnos.`
    })
    console.log(`Se genero el envio de mail de la orden: ${order}`)
} catch (error) {
    console.log(`Error en el envio de la orden: ${error}`)
}
}
module.exports= mailOrden