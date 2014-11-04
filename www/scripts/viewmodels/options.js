var options = {

    containerNode: document.getElementById("options-view"),
    currencyCode: ko.observable(currency.getChosenCurrencyCode() || "Currency not selected"),
    budgetStartDate: localStorage.getItem("budgetStartDate"),
    budgetAmount: localStorage.getItem("budgetAmount"),

    initialize: function() {
        var self = this;

        addEventListener("currencyCodeChanged", function(event) {
            var newCurrencyCode = event.detail.newCurrencyCode;

            if (newCurrencyCode !== null) {
                self.currencyCode(event.detail.newCurrencyCode);
            }
        });
    },

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
    },

    openCurrencySelector: function() {
        currencySelector.open();
    },

    setBudgetStartDate: function(self, event) {
        if (event.target.checkValidity()) {
            localStorage.setItem("budgetStartDate", event.target.value);
            // TODO recalculate monthlyExpenses.remaining
        }
        else {
            event.target.value = localStorage.getItem("budgetStartDate");
        }
    },

    setBudgetAmount: function(self, event) {
        if (event.target.checkValidity()) {
            localStorage.setItem("budgetAmount", event.target.value);
            // TODO recalculate monthlyExpenses.remaining
        }
        else {
            event.target.value = localStorage.getItem("budgetAmount");
        }
    }

};

options.initialize();