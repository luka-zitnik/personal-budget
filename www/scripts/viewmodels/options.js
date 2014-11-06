var options = {

    containerNode: document.getElementById("options-view"),
    currencyCode: ko.observable(currency.getChosenCurrencyCode() || "Currency not selected"),
    budgetStartDate: ko.observable(localStorage.getItem("budgetStartDate")),
    budgetAmount: ko.observable(localStorage.getItem("budgetAmount")),

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
        var number = this.containerNode.querySelector("input[type=number]");
        var date = this.containerNode.querySelector("input[type=date]");

        if (number.checkValidity() === false) {
            this.budgetAmount(localStorage.getItem("budgetAmount"));
        }
        else {
            localStorage.setItem("budgetAmount", this.budgetAmount());
        }

        if (date.checkValidity() === false) {
            this.budgetStartDate(localStorage.getItem("budgetStartDate"));
        }
        else {
            localStorage.setItem("budgetStartDate", this.budgetStartDate());
        }

        this.containerNode.setAttribute("aria-hidden", "true");
    },

    openCurrencySelector: function() {
        currencySelector.open();
    }

};

options.initialize();