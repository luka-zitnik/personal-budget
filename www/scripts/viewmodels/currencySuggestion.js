var currencySuggestion = {

    visible: ko.observable(false),
    suggestedCurrency: ko.observable(),

    useSuggested: function() {
        currency.setChosenCurrencyCode(this.suggestedCurrency());
        this.close();
    },

    chooseAnother: function() {
        currencySelector.open();
        this.close();
    },

    open: function(currencyCode) {
        this.suggestedCurrency(currencyCode);
        this.visible(true);
    },

    close: function() {
        this.visible(false);
    }

};