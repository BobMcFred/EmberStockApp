stockApp.StockStateSummaryMarketByOrderRoute = Ember.Route.extend({
    renderTemplate: function(){ //Load templates into named outlets
        this.render('MarketByOrder', {
            into: 'StockStateSummary',
            outlet: 'mbo'
        });
        this.render('MarketByPrice', {
            into: 'StockStateSummary',
            outlet: 'mbp'
        });
    },
    model: function(params){    //set model to appropriate company
        return this.store.find('company', params.company_id);
    }
})