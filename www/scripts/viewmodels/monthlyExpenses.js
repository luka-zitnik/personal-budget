var monthlyExpenses = {

    currencyCode: ko.observable(currency.getChosenCurrencyCode()),
    monthlyExpensesList: ko.observableArray(),

    initialize: function() {
        var self = this;

        addEventListener("currencyCodeChanged", function(event) {
            self.currencyCode(event.detail.newCurrencyCode);
        });
    },

    setExpenses: function(monthlyExpenses) {
        this.monthlyExpensesList(monthlyExpenses);
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