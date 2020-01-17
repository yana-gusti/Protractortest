module.exports = thisModule= {
    isElementVisible: function (elem, ms = browser.params.timeout) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(elem), ms).then(() => true, () => false);
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
}