const PDF = require('pdfkit')
const fs = require('fs')
const path = require('path')

function GenerarPdf(emp) {
    let doc = new PDF
    doc.pipe(fs.createWriteStream(path.join(__dirname,emp.nombrePdf)))
    doc.text(emp.numero,370,50)
    doc.text(emp.fecha,370,65)
    doc.text(`Nombre: ${emp.nombre}`,40,50)
    doc.text(`Edad: ${emp.edad}`,40,65)
    doc.text(`Sexo: ${emp.sexo}`,40,80)
    doc.text(`Medico Referente: ${emp.mf}`,40,95)
    doc.text(emp.titulo,150,130)
    doc.text(emp.diagnostico,40,145)
    doc.text('Conclusion: ',40,500)
    doc.text(emp.conclusion,40,515)
    doc.text(`Comentario: ${emp.comentario}` ,40,550)
    doc.text('Atentamente',40,580)
    doc.text(emp.radiolgo,40,670)
    doc.text('Radiologo',40,680)
    doc.text('Primera Avenida 1-29 zona 1 Jalapa, Tels. 3483-1368',150,690)
    doc.text('A pocos pasos del Hospital Nacional, atras Elektra',155,700)
    doc.end()
}

module.exports = {
    GenerarPdf
}
// let data ={
//     nombrePdf: 'Hola.pdf',
//     numero:'10-12131',
//     fecha:'12 de Noviembre del 2018',
//     nombre:'Bryan Carias',
//     edad:'21',
//     sexo:'Masculino',
//     mf:'Meliza Sandobal',
//     titulo:'DOPPLER ARTERIAL DE CAROTIDAS BILATERAL',
//     diagnostico: `Se realiza barrido  ultrasonográfico Doppler en ambas carótidas comunes, ambas arterias carótidas externas, y ambas arterias carótidas internas, observando las mismas de calibre adecuado, con una relación intima-media en limites normales, sin imágenes que sugieran calcificaciones, estrecheces, o áreas de compresión extrínsecas o intrínsecas. No se visualizan imágenes que indiquen la presencia de placas ateromatosas. Se observa flujo adecuado con patrón laminar en ambas carótidas y espectros normales.`,
//     conclusion:'ULTRASONIDO DOPPLER DE CAROTIDAS BILATERAL NORMAL PARA LA EDAD AL MOMENTO DEL ESTUDIO',
//     comentario:'Se sugiere correlacionar con clínica y exámenes complementarios, si clínicamente indicado.',
//     radiolgo:'DR. Bryan Heraldo Carias Cervantes'
// }

// GenerarPdf(data)


// doc.text('12 de Noviembre del 2018',370,65)
// doc.text('Nombre: Bryan Carias',40,50)
// doc.text('Edad: 21',40,65)
// doc.text('Sexo: Masculino',40,80)
// doc.text('Medico Referente: Hola No se',40,95)
// doc.text('DOPPLER ARTERIAL DE CAROTIDAS BILATERAL',150,130);
// doc.text(`Se realiza barrido  ultrasonográfico Doppler en ambas carótidas comunes, ambas arterias carótidas externas, y ambas arterias carótidas internas, observando las mismas de calibre adecuado, con una relación intima-media en limites normales, sin imágenes que sugieran calcificaciones, estrecheces, o áreas de compresión extrínsecas o intrínsecas. No se visualizan imágenes que indiquen la presencia de placas ateromatosas. Se observa flujo adecuado con patrón laminar en ambas carótidas y espectros normales.`,40,145)
// doc.text('Conclusion: ',40,500)
// doc.text('1.ULTRASONIDO DOPPLER DE CAROTIDAS BILATERAL NORMAL PARA LA EDAD AL MOMENTO DEL ESTUDIO',40,515)
// doc.text('Comentario: Se sugiere correlacionar con clínica y exámenes complementarios, si clínicamente indicado.',40,550)
// doc.text('Atentamente',40,580)
// doc.text('DR. Bryan Heraldo Carias Cervantes',40,670)
// doc.text('Radiologo',40,680)
// doc.text('Primera Avenida 1-29 zona 1 Jalapa, Tels. 3483-1368',150,690)
// doc.text('A pocos pasos del Hospital Nacional, atras Elektra',155,700)

// doc.end()