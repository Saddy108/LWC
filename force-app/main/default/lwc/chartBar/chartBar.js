import { LightningElement, api } from 'lwc';

export default class ChartBar extends LightningElement {
    @api percentage;
    // SGN : Used API beside property to make it public and also to receive from parent

    // SGN : User backtick to generate the width of the style
    get style() {
        return `width: ${this.percentage}%`;
    }
}
