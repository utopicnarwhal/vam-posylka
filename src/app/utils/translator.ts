// tslint:disable-next-line:no-namespace
export namespace Translator {
    export function translateTableHeaders(engTitle: string): string {
        switch (engTitle) {
            case 'firstname':
                return 'Имя';
            case 'lastname':
                return 'Фамилия';
            case 'middlename':
                return 'Отчество';
            case 'passport_number':
                return 'Номер паспорта';
            case 'birthdate':
                return 'Дата рождения';
            case 'employment_date':
                return 'Дата приёма на работу';
            case 'the_beginning_of_the_working_day':
                return 'Начало рабочего дня';
            case 'end_of_work_day':
                return 'Конец рабочего дня';
            case 'city':
                return 'Город';
            case 'street':
                return 'Улица';
            case 'house':
                return 'Дом';
            case 'appartment':
                return 'Квартира';
            case 'mobilephone':
                return 'Телефон';
            case 'recipient':
                return 'Получатель';
            case 'sender':
                return 'Отправитель';
            case 'order_date':
                return 'Дата заказа';
            case 'delivery_date':
                return 'Дата доставки';
            case 'price':
                return 'Цена доставки';
            case 'courier':
                return 'Курьер';
            case 'transport':
                return 'Транспорт';
            case 'transport_number':
                return 'Номер машины';
            case 'model':
                return 'Марка';
            case 'registration_date':
                return 'Дата регистрации';
            case 'color':
                return 'Цвет';
            case 'postcode':
                return 'Индекс';
            default:
                return engTitle;
        }
    }
}
