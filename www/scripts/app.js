var app = {

    views: {
        monthlyList: document.getElementById("monthly-list"),
        currencySuggestDialog: document.getElementById("currency-suggest-dialog"),
        currencySelectDialog: document.getElementById("currency-select-dialog"),
        addExpense: document.getElementById("add-expense-view"),
        options: document.getElementById("options"),
        dailyList: document.getElementById("daily-list-view")
    },

    initialize: function () {
        this.bindViews();
    },

    bindViews: function() {
        ko.applyBindings(monthlyExpenses, this.views.monthlyList);
        ko.applyBindings(currencySuggestion, this.views.currencySuggestDialog);
        ko.applyBindings(currencySelector, this.views.currencySelectDialog),
        ko.applyBindings(addExpense, this.views.addExpense);
        ko.applyBindings(options, this.views.options);
        ko.applyBindings(dailyList, this.views.dailyList);
    }

};

app.initialize();