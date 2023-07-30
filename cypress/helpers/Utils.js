import moment from 'moment';

export class Utils {
    static moment = moment;
    static uniqueValue = Math.random().toString().slice(2, 8);

    static uniquify = (string = '') => {
        return `${string}-${Math.random().toString().slice(2, 8)}`;
    };

    static uniquifyLongString = (string = '') => {
        for (let i = 0; i < 161; i++) {
            const random = Math.floor(Math.random() * 27);
            string += String.fromCharCode(97 + random);
        }
        return string;
    };

    static uniquifyPhone = phone => {
        return `${phone}${Math.random().toString().slice(2, 8)}`;
    };

    static uniquifyEmail = email => {
        return `${email.split('@')[0]}-${Date.now()}-${Math.random().toString().slice(2, 4)}@${email.split('@')[1]}`;
    };

    static uniquifyUsingStaticUniqueValue = (string = '') => {
        return `${string}-${this.uniqueValue}`;
    };

    static resetStaticUniqueValue = () => {
        this.uniqueValue = Math.random().toString().slice(2, 8);
    };

    static getRandromNumberBetweenTwoNumbers({ start, end }) {
        return Math.floor(Math.random() * end) + start;
    }

    static parseResponse(response) {
        return response.allRequestResponses[0]['Response Body'];
    }
}
