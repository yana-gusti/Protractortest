const xlsx = require('xlsx');
const fs = require('fs');
const crypto = require('crypto');
module.exports = thisModule= {


    isElementVisible: function (elem, ms = browser.params.timeout) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(elem), ms)
            .then(() => true, () => false);
    },


    getTableContentAsJSON: async (table, cellCss) => {
        const headers = [];
        const actual = [];
        const visible = await thisModule.isElementVisible(table);
        if (visible) {
            const collection = await table.all(by.css('th')).asElementFinders_();

            for (let i = 0; i < collection.length; i++) {
                await collection[i].getWebElement().getText().then(text => {
                        headers[i] = text.trim();
                });
            }

            const newCollection = await table.all(by.css('tbody tr')).asElementFinders_();
            for (let i = 0; i < newCollection.length; i++) {
                const rowAsJson = {};
                const row = await newCollection[i].all(by.css('td')).asElementFinders_();
                for (let y = 0; y < row.length; y++) {
                        let cellText = await row[y].getText();
                        rowAsJson[headers[y]] = cellText.trim();
                }
                actual.push(rowAsJson);
            }
            return actual;
        } else {
            throw new Error('Table is not visible');
        }
    },

    getFileHash: function (filePath, hashType = 'sha1') {
        let workbook;
        let hash = crypto.createHash(hashType);
        const timeout = 3000;
        return browser.wait(function () {
            return fs.existsSync(filePath);
        }, timeout, filePath + ' is not found after ' + timeout + ' ms.').then(function () {
            /**
             * if statement here is used to generate a valid HASH for .xlsx files
             */
            if (filePath.endsWith('.xlsx')) {
                workbook = xlsx.readFile(filePath);
                workbook.Props.CreatedDate = ''; // we need it to generate hash code only from data inside the Excel file, without any information about date (otherwise it will caused new hashcode every time)
                workbook.Props.ModifiedDate = ''; // we need it to generate hash code only from data inside the Excel file, without any information about date (otherwise it will caused new hashcode every time)

                return new Promise((resolve, reject) => {
                    try {
                        hash.update(JSON.stringify(workbook));
                        resolve(hash.digest('hex'));
                    } catch (e) {
                        reject(`Error in getting hash from ${filePath} file.\n${e}`);
                    }
                });
            }
            let readStream = fs.createReadStream(filePath);
            return new Promise((resolve, reject) => {
                readStream
                    .on('data', function (chunk) {
                        hash.update(chunk);
                    })
                    .on('end', function () {
                        resolve(hash.digest('hex'));
                    })
                    .on('error', function (error) {
                        reject(error);
                    })
            });
        });
    },
};