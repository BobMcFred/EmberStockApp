stockApp.StockStateSummaryRoute = Ember.Route.extend({
    model: function() { //Set model to list of companies
        return this.store.find('company');
    },
    setupController: function(controller, StockStateSummaryController){ //Set to the appropriate controller
        controller.set('model', StockStateSummaryController);
    },
    beforeModel: function(){    //Automatically load Microsoft's market depth
        this.transitionTo('StockStateSummary.MarketByOrder', '1');
    }
});