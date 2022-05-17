import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

// SGN : We need to import above all prebuilt methods, as well as LMS which we defined

export default class LmsPublisherWebComponent extends LightningElement {
    @wire(getContactList)
    contacts;

    // SGN : We need to call this wire function to initiate the MessageContext
    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    // SGN : So whenever contact is clicked from child component, we are creating the payload and publishing it,using or passing
    // 3 parameters
    handleContactSelect(event) {
        const payload = { recordId: event.target.contact.Id };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }
}
