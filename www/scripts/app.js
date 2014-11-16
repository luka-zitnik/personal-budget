var app = {

    views: {
        monthlyList: document.getElementById("monthly-list"),
        currencySuggestDialog: document.getElementById("currency-suggest-dialog"),
        currencySelectDialog: document.getElementById("currency-select-dialog"),
        newExpenditure: document.getElementById("add-expenditure-view"),
        options: document.getElementById("options"),
        dailyList: document.getElementById("daily-list-view")
    },

    initialize: function () {
        this.defineResetHandler();
        this.bindViews();
    },

    defineResetHandler: function() {
        var touchstart = "ontouchstart" in window ? "touchstart" : "mousedown";
        
        ko.bindingHandlers.reset = {
            init: function(element) {
                element.addEventListener(touchstart, function(event) {
                    event.target.previousElementSibling.value = "";
                });
            }
        };
    },

    bindViews: function() {
        ko.applyBindings(monthlyExpenditures, this.views.monthlyList);
        ko.applyBindings(currencySuggestion, this.views.currencySuggestDialog);
        ko.applyBindings(currencySelector, this.views.currencySelectDialog),
        ko.applyBindings(newExpenditure, this.views.newExpenditure);
        ko.applyBindings(options, this.views.options);
        ko.applyBindings(dailyList, this.views.dailyList);
    }

};

app.initialize();