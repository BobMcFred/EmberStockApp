/*********************
Follows nearly the same pattern as PlaceBidOrder
*********************/
stockApp.PlaceSaleOrderController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            var make = true;
            var sPrice = parseFloat(this.get('price'));
            var sQuantity = parseInt(this.get('quantity'));

            var buyOrders = this.get('model').get('buyOrders').content;

            var theCompany = this.get('model');

            for (var i = 0; i < buyOrders.length; i++)
            {
                if (parseFloat(buyOrders[i].get('price')) >= sPrice && parseInt(buyOrders[i].get('quantity')) == sQuantity)
                {
                    make = false;

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', buyOrders[i].get('price'));

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal));

                    if(changeVal > 0){
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);

                    var newVolume = parseInt(this.get('model.volume')) + sQuantity;
                    theCompany.set('volume', newVolume);
                    /////////////////////////////////////////////////////////////////////////

                    buyOrders[i].destroyRecord();
                    break;
                }
                else if (parseFloat(buyOrders[i].get('price')) >= sPrice && parseInt(buyOrders[i].get('quantity')) < sQuantity)
                {
                    make = true;
                    sQuantity -= parseInt(buyOrders[i].get('quantity'));

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', buyOrders[i].get('price'));

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal));

                    if(changeVal > 0){
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);

                    var newVolume = parseInt(this.get('model.volume')) + sQuantity;
                    theCompany.set('volume', newVolume);
                    /////////////////////////////////////////////////////////////////////////

                    buyOrders[i].destroyRecord();
                    i = -1;
                }
                else if (parseFloat(buyOrders[i].get('price')) >= sPrice && parseInt(buyOrders[i].get('quantity')) > sQuantity)
                {
                    make = false;
                    buyOrders[i].set('quantity', parseInt(buyOrders[i].get('quantity')) - sQuantity);

                    //Update Summary/////////////////////////////////////////////////////////
                    theCompany.set('currentPrice', buyOrders[i].get('price'));

                    var changeVal = parseFloat(theCompany.get('openPrice')) - parseFloat(theCompany.get('currentPrice'));

                    theCompany.set('changeValue', Math.abs(changeVal));

                    if(changeVal > 0){
                        theCompany.set('changeDir', 'images/down.png');
                    }
                    else if(changeVal < 0){
                        theCompany.set('changeDir', 'images/up.png');
                    }
                    else{
                        theCompany.set('changeDir', 'images/noChange.png');
                    }

                    var changePerc = Math.abs(changeVal/parseFloat(theCompany.get('openPrice'))).toFixed(4)*100;

                    theCompany.set('changePerc', changePerc);

                    var newVolume = parseInt(this.get('model.volume')) + sQuantity;
                    theCompany.set('volume', newVolume);
                    /////////////////////////////////////////////////////////////////////////

                    break;
                }
            }
            if(make) {
                var newSale = this.store.createRecord('sellOrder', {
                    price: sPrice,
                    quantity: sQuantity,
                    company: this.get('model')
                });
                newSale.save();
            }
            this.transitionToRoute('StockStateSummary');
        }
    }
});