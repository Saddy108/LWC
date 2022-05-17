import { LightningElement, wire } from 'lwc';
// SGN : To retrieve the data we can use getRecord, And to copy the value or read the value we use getFieldValue
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
// SGN : Above all prebuilt methods and also messageservice are need to be imported

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PICTURE_FIELD from '@salesforce/schema/Contact.Picture__c';

const fields = [
    NAME_FIELD,
    TITLE_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD,
    PICTURE_FIELD
];

export default class LmsSubscriberWebComponent extends LightningElement {
    subscription = null;
    recordId;

    Name;
    Title;
    Phone;
    Email;
    Picture__c;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchToast(error);
        } else if (data) {
            // SGN : This is also a way by which we can read the data and assign value to individual variable
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        }
    }

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    // SGN : We always need to call the MessageContext using wire to initiate
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    // SGN : This is how we subscribe the LMS, and we can subscribe this in connectedcallback
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.recordId;
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    // SGN : In the lifecycle hook we can subscribe it
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: reduceErrors(error).join(', '),
                variant: 'error'
            })
        );
    }
}
