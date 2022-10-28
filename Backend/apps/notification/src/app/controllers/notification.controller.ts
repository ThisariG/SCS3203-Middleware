export default class NotificationController {

    //notify via an email
    async emailNotification(email: string, subject: string, message: string) {
        return `Email sent to ${email} with subject ${subject} and message ${message}`;
    }

    //notify via a sms
    async smsNotification(phone: string, message: string) {
        return `SMS sent to ${phone} with message ${message}`;
    }
    
}