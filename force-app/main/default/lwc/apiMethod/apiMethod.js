import { LightningElement } from 'lwc';

export default class ApiMethod extends LightningElement {
    handleRefresh() {
        // SGN : Using querySelector we can call child components method
        this.template.querySelector('c-clock').refresh();
    }
}
