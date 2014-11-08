var options = {

    containerNode: document.getElementById("options-view"),
    currencyCode: ko.observable(currency.getChosenCurrencyCode() || "Currency not selected"),
    budgetStartDate: ko.observable(localStorage.getItem("budgetStartDate") || ""),
    budgetAmount: ko.observable(localStorage.getItem("budgetAmount") || ""),
    invalidBudgetStartDateConfirm: {

        heading: "Invalid date",
        message: "Budget start date is not a valid date.",
        visible: ko.observable(false),

        fix: function() {
            this.visible(false);
        },

        reset: function() {
            options.reset("budgetAmount");
            options.reset("budgetStartDate");
            options.hide();
            this.visible(false);
        }

    },
    invalidBudgetAmountConfirm: {

        heading: "Invalid number",
        message: "Budget amount is not a valid number.",
        visible: ko.observable(false),

        fix: function() {
            this.visible(false);
        },

        reset: function() {
            options.reset("budgetAmount");
            options.reset("budgetStartDate");
            options.hide();
            this.visible(false);
        }

    },

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
        this.show();
    },

    close: function() {
        var amount = this.containerNode.querySelector("input[type=number]"),
            date = this.containerNode.querySelector("input[type=date]");

        if (amount.checkValidity() === false) {
            this.invalidBudgetAmountConfirm.visible(true);
            return;
        }

        if (date.checkValidity() === false) {
            this.invalidBudgetStartDateConfirm.visible(true);
            return;
        }

        this.persist("budgetAmount");
        this.persist("budgetStartDate");

        this.hide();
    },

    show: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    hide: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
    },

    reset: function(prop) {
        this[prop](localStorage.getItem(prop) || "");
    },

    persist: function(prop) {
        localStorage.setItem(prop, this[prop]());
    },

    openCurrencySelector: function() {
        currencySelector.open();
    }

};

options.initialize();