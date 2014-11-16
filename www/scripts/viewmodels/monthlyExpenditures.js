var monthlyExpenditures = {

    welcomeIsVisible: ko.observable(false),
    currencyCode: ko.observable(currency.getChosenCurrencyCode()),
    monthlyExpendituresList: ko.observableArray(),

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
        this.setExpenditures(
            this.translateStoreValuesToDailyExpenditures(aggregatedStoreValues)
        );
    },

    aggregateStoreValues: function (aggregatedStoreValues, storeValue) {
        var date = storeValue.date,
            value = storeValue.value,
            month = date.substring(0, 7);

        aggregatedStoreValues[month] || (aggregatedStoreValues[month] = {});

        if (aggregatedStoreValues[month][date]) {
            aggregatedStoreValues[month][date] += value;
        }
        else {
            aggregatedStoreValues[month][date] = value;
        }
    },

    setExpenditures: function(monthlyExpenditures) {
        this.monthlyExpendituresList(monthlyExpenditures);
        this.welcomeIsVisible(monthlyExpenditures.length === 0);
    },

    translateStoreValuesToDailyExpenditures: function (aggregatedStoreValues) {
        var areInDescLexOrd = function(x, y) {
                return x <= y;
            },
            months = Object.keys(aggregatedStoreValues).sort(areInDescLexOrd),
            monthlyExpenditures = [],
            days,
            dailyExpenditures,
            i,
            j;

        for (i = 0; i < months.length; ++i) {
            dailyExpenditures = [];
            days = Object.keys(aggregatedStoreValues[months[i]]).sort(areInDescLexOrd);
            for (j = 0; j < days.length; ++j) {
                dailyExpenditures.push(new DailySum(days[j], aggregatedStoreValues[months[i]][days[j]]));
            }
            monthlyExpenditures.push(new DailyExpenditures(months[i], dailyExpenditures));
        }

        return monthlyExpenditures;
    },

    updateMonthlyExpendituresList: function (month, date, value) {
        var dailyExpenditures = this.findDailyExpenditures(month);

        if ((dailyExpenditures instanceof DailyExpenditures) === false) {
            dailyExpenditures = new DailyExpenditures(month, []);
            this.monthlyExpendituresList.push(dailyExpenditures);
            this.monthlyExpendituresList.sort(function(x, y) {
                return x.month <= y.month;
            });
        }

        dailyExpenditures.updateDailyExpendituresList(date, value);

        this.welcomeIsVisible(this.monthlyExpendituresList().length === 0);
    },

    findDailyExpenditures: function (month) {
        var list = this.monthlyExpendituresList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].month === month) {
                return list[i];
            }
        }

        return null;
    }

};

monthlyExpenditures.remaining = ko.computed(function() {
    var budgetStartDate = options.budgetStartDate(),
        budgetValue = options.budgetValue(),
        i = 0,
        sum = 0,
        j;

    for (; i < this.monthlyExpendituresList().length; ++i) {
        for (j = 0; j < this.monthlyExpendituresList()[i].dailyExpendituresList().length; ++j) {
            if (this.monthlyExpendituresList()[i].dailyExpendituresList()[j].date < budgetStartDate) {
                return budgetValue - sum;
            }

            sum += this.monthlyExpendituresList()[i].dailyExpendituresList()[j].dailySum();
        }
    }

    return budgetValue - sum;
}.bind(monthlyExpenditures));

monthlyExpenditures.initialize();