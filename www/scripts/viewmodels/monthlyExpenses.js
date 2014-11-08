var monthlyExpenses = {

    welcomeIsVisible: ko.observable(false),
    currencyCode: ko.observable(currency.getChosenCurrencyCode()),
    monthlyExpensesList: ko.observableArray(),

    initialize: function() {
        var self = this;

        addEventListener("currencyCodeChanged", function(event) {
            self.currencyCode(event.detail.newCurrencyCode);
        });

        self.list();
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
        this.welcomeIsVisible(monthlyExpenses.length === 0);
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

        this.welcomeIsVisible(this.monthlyExpensesList().length === 0);
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

monthlyExpenses.remaining = ko.computed(function() {
    var budgetStartDate = options.budgetStartDate(),
        budgetAmount = options.budgetAmount(),
        i = 0,
        sum = 0,
        j;

    for (; i < this.monthlyExpensesList().length; ++i) {
        for (j = 0; j < this.monthlyExpensesList()[i].dailyExpensesList().length; ++j) {
            if (this.monthlyExpensesList()[i].dailyExpensesList()[j].date < budgetStartDate) {
                return budgetAmount - sum;
            }

            sum += this.monthlyExpensesList()[i].dailyExpensesList()[j].dailySum();
        }
    }

    return budgetAmount - sum;
}.bind(monthlyExpenses));

monthlyExpenses.initialize();