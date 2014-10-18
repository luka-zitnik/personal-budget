var App = {

    initialize: function () {
        Store.each(this.aggregateStoreValues, this.displayStoreValues.bind(this));
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
        ko.applyBindings(
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

        return new MonthlyExpenses(monthlyExpenses);
    }

};

App.initialize();