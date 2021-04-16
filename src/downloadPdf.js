const pdf = require('html-pdf');
const fs = require('fs');
 
export const generatePdf = (html, name) => {
        const writeStream = fs.createWriteStream(name);
        const options = { format: "Letter" };
        return new Promise(function (resolve, reject) {
            pdf.create(html, options).toStream(function (err, stream) {
            stream.pipe(writeStream);
            });
            // stream.on("end", function () {
            //   resolve("completed");
            // });
            writeStream.on("error", function (err) {
            console.log(err);
            reject(err);
            });
            resolve({});
    })
}