var app = {

    views: {
        toolbar: document.querySelector("menu[type=toolbar]"),
        monthlyList: document.getElementById("monthly-list"),
        currencySuggestDialog: document.getElementById("currency-suggest-dialog")
    },

    initialize: function () {
        this.bindViews();
        store.each(this.aggregateStoreValues, this.displayStoreValues.bind(this));
    },

    bindViews: function() {
        ko.applyBindings(toolbar, this.views.toolbar);
        ko.applyBindings(monthlyExpenses, this.views.monthlyList);
        ko.applyBindings(currencySuggestion, this.views.currencySuggestDialog);
    },

    aggregateStoreValues: function (aggregatedStoreValues, storeValue) {
        var month = storeValue.date.substring(0, 7),
            date = storeValue.date,
            amount = storeValue.amount;

        aggregatedStoreValues[month] || (aggregatedStoreValues[month] = {});

        if (aggregatedStoreValues[month][date]) {
            aggregatedStoreValues[month][date] += amount;
        }
        else {
            aggregatedStoreValues[month][date] = amount;
        }
    },

    displayStoreValues: function (aggregatedStoreValues) {
        monthlyExpenses.setExpenses(
            this.translateStoreValuesToDailyExpenses(aggregatedStoreValues)
        );
    },

    translateStoreValuesToDailyExpenses: function (aggregatedStoreValues) {
        var monthlyExpenses = [],
            dailyExpenses = [],
            monthIndex,
            dateIndex;

        for (monthIndex in aggregatedStoreValues) {
            dailyExpenses = [];
            for (dateIndex in aggregatedStoreValues[monthIndex]) {
                dailyExpenses.push(new DailySum(dateIndex, aggregatedStoreValues[monthIndex][dateIndex]));
            }
            monthlyExpenses.push(new DailyExpenses(monthIndex, dailyExpenses));
        }

        return monthlyExpenses;
    }

};

app.initialize();