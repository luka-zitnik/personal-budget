var options = {

    containerNode: document.getElementById("options-view"),
    currencyCode: ko.observable(currency.getChosenCurrencyCode() || "Currency not selected"),
    budgetStartDate: ko.observable(localStorage.getItem("budgetStartDate") || ""),
    budgetValue: ko.observable(localStorage.getItem("budgetValue") || ""),
    invalidBudgetStartDateConfirm: {

        heading: "Invalid date",
        message: "Please format Budget Start Date as suggested by the placeholder.",
        visible: ko.observable(false),

        fix: function() {
            this.visible(false);
        },

        reset: function() {
            options.reset("budgetValue");
            options.reset("budgetStartDate");
            options.hide();
            this.visible(false);
        }

    },
    invalidBudgetValueConfirm: {

        heading: "Invalid number",
        message: "Please format Budget Value as suggested by the placeholder.",
        visible: ko.observable(false),

        fix: function() {
            this.visible(false);
        },

        reset: function() {
            options.reset("budgetValue");
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
        var value = this.containerNode.querySelector("input[type=number]"),
            date = this.containerNode.querySelector("input[type=date]");

        if (value.checkValidity() === false) {
            this.invalidBudgetValueConfirm.visible(true);
            return;
        }

        if (date.checkValidity() === false) {
            this.invalidBudgetStartDateConfirm.visible(true);
            return;
        }

        this.persist("budgetValue");
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
    },

    clearAllRecords: function () {
        store.clear();
        monthlyRecords.list();
    }

};

options.initialize();
