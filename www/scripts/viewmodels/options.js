var options = {

    containerNode: document.getElementById("options-view"),
    currencyCode: ko.observable(currency.getChosenCurrencyCode() || "Currency not selected"),

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
    }

};

options.initialize();