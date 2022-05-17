import { LightningElement, api } from 'lwc';

export default class Clock extends LightningElement {
    timestamp = new Date();

    // SGN: If we need to call method then we can define as @api
    @api
    refresh() {
        this.timestamp = new Date();
    }
}
