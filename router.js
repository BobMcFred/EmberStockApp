stockApp.Router.map(function() {
    this.resource('StockStateSummary', {path: '/'}, function(){
        this.route('MarketByOrder', {path: '/:company_id'});    //nested routes
        this.route('MarketByPrice');
    });
    this.resource('PlaceBidOrder', {path: '/pbo/:company_id'});
    this.resource('PlaceSaleOrder', {path: '/pso/:company_id'});
});