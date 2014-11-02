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
        var areInDescLexOrd = function(x, y) {
                return x <= y;
            },
            months = Object.keys(aggregatedStoreValues).sort(areInDescLexOrd),
            monthlyExpenses = [],
            days,
            dailyExpenses,
            i,
            j;

        for (i = 0; i < months.length; ++i) {
            dailyExpenses = [];
            days = Object.keys(aggregatedStoreValues[months[i]]).sort(areInDescLexOrd);
            for (j = 0; j < days.length; ++j) {
                dailyExpenses.push(new DailySum(days[j], aggregatedStoreValues[months[i]][days[j]]));
            }
            monthlyExpenses.push(new DailyExpenses(months[i], dailyExpenses));
        }

        return monthlyExpenses;
    },

    updateMonthlyExpensesList: function (month, date, amount) {
        var dailyExpenses = this.findDailyExpenses(month);

        if ((dailyExpenses instanceof DailyExpenses) === false) {
            dailyExpenses = new DailyExpenses(month, []);
            this.monthlyExpensesList.push(dailyExpenses);
            this.monthlyExpensesList.sort(function(x, y) {
                return x.month <= y.month;
            });
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