import { LightningElement, api } from 'lwc';

export default class ViewSource extends LightningElement {
    //baseURL = 'https://github.com/trailheadapps/lwc-recipes/tree/main/force-app/main/default/';

    baseURL =
        'https://github.com/Saddy108/LWC/tree/master/force-app/main/default/';

    @api source;

    get sourceURL() {
        return this.baseURL + this.source;
    }
}
