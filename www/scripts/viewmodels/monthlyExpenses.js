var monthlyExpenses = {

    currencyCode: ko.observable(currency.getChosenCurrencyCode()),
    monthlyExpensesList: ko.observableArray(),

    initialize: function() {
        var self = this;

        addEventListener("currencyCodeChanged", function(event) {
            self.currencyCode(event.detail.newCurrencyCode);
        });
    },

    list: function() {
        store.each(this.aggregateStoreValues, this.displayStoreValues.bind(this));
    },

    displayStoreValues: function (aggregatedStoreValues) {
        this.setExpenses(
            this.translateStoreValuesToDailyExpenses(aggregatedStoreValues)
        );
    },

    aggregateStoreValues: function (aggregatedStoreValues, storeValue) {
        var date = storeValue.date,
            amount = storeValue.amount,
            month = date.substring(0, 7);

        aggregatedStoreValues[month] || (aggregatedStoreValues[month] = {});

        if (aggregatedStoreValues[month][date]) {
            aggregatedStoreValues[month][date] += amount;
        }
        else {
            aggregatedStoreValues[month][date] = amount;
        }
    },

    setExpenses: function(monthlyExpenses) {
        this.monthlyExpensesList(monthlyExpenses);
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
    },

    updateMonthlyExpensesList: function (month, date, amount) {
        var dailyExpenses = this.findDailyExpenses(month);

        if ((dailyExpenses instanceof DailyExpenses) === false) {
            dailyExpenses = new DailyExpenses(month, []);
            this.monthlyExpensesList.push(dailyExpenses);
        }

        dailyExpenses.updateDailyExpensesList(date, amount);
    },

    findDailyExpenses: function (month) {
        var list = this.monthlyExpensesList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].month === month) {
                return list[i];
            }
        }

        return null;
    }

};

monthlyExpenses.initialize();