var monthlyRecords = {

    welcomeIsVisible: ko.observable(false),
    currencyCode: ko.observable(currency.getChosenCurrencyCode()),
    monthlyRecordsList: ko.observableArray(),
    progress: ko.observable(0),

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
        this.setRecords(
            this.translateStoreValuesToDailyRecords(aggregatedStoreValues)
        );
        this.progress(100);
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

    setRecords: function(monthlyRecords) {
        this.monthlyRecordsList(monthlyRecords);
        this.welcomeIsVisible(monthlyRecords.length === 0);
    },

    translateStoreValuesToDailyRecords: function (aggregatedStoreValues) {
        var areInDescLexOrd = function(x, y) {
                return x <= y;
            },
            months = Object.keys(aggregatedStoreValues).sort(areInDescLexOrd),
            monthlyRecords = [],
            days,
            dailyRecords,
            i,
            j;

        for (i = 0; i < months.length; ++i) {
            dailyRecords = [];
            days = Object.keys(aggregatedStoreValues[months[i]]).sort(areInDescLexOrd);
            for (j = 0; j < days.length; ++j) {
                dailyRecords.push(new DailySum(days[j], aggregatedStoreValues[months[i]][days[j]]));
            }
            monthlyRecords.push(new DailyRecords(months[i], dailyRecords));
        }

        return monthlyRecords;
    },

    updateMonthlyRecordsList: function (month, date, value) {
        var dailyRecords = this.findDailyRecords(month);

        if ((dailyRecords instanceof DailyRecords) === false) {
            dailyRecords = new DailyRecords(month, []);
            this.monthlyRecordsList.push(dailyRecords);
            this.monthlyRecordsList.sort(function(x, y) {
                return x.month <= y.month;
            });
        }

        dailyRecords.updateDailyRecordsList(date, value);

        this.welcomeIsVisible(this.monthlyRecordsList().length === 0);
    },

    findDailyRecords: function (month) {
        var list = this.monthlyRecordsList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].month === month) {
                return list[i];
            }
        }

        return null;
    }

};

monthlyRecords.remaining = ko.computed(function() {
    var budgetStartDate = options.budgetStartDate(),
        budgetValue = options.budgetValue(),
        i = 0,
        sum = 0,
        j;

    for (; i < this.monthlyRecordsList().length; ++i) {
        for (j = 0; j < this.monthlyRecordsList()[i].dailyRecordsList().length; ++j) {
            if (this.monthlyRecordsList()[i].dailyRecordsList()[j].date < budgetStartDate) {
                return budgetValue - sum;
            }

            sum += this.monthlyRecordsList()[i].dailyRecordsList()[j].dailySum();
        }
    }

    return budgetValue - sum;
}.bind(monthlyRecords));

monthlyRecords.initialize();
