import {isFunctionExists} from "../common/utils"

export const validationFieldMapper: { [K: string]: string } = {
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтверждение пароля',
    departmentId: 'Отдел',
    name: 'Имя',
    lastName: 'Фамилия'
}

export const rolesMapper: { [K: string]: string } = {
    admin: 'Администратор',
    user: 'Пользователь',
    moderator: 'Модератор',
}

export const departmentMapper: { [K: string]: string } = {
    dev: 'Отдел разработки портальных решений',
    fin: 'Финансовый отдел',
    sup: 'Отдел технического обеспечения',
    sb: 'Служба безопасности',
}

export const validationMessageMapper = (field: string, rule: string, args?: any ): string => {
    const translateField = validationFieldMapper[field] ?? field
    const rulesMessages: { [K: string]: Function } = {
        required: () => `Поле '${translateField}' обязательно для заполнения`,
        pattern: () => `Значение поля '${translateField}' является недопустимым`,
        cyrillic: () => `Значение поля '${translateField}' можем включать только латинские символы`,
        min: () => {
            let tale = ''

            if (!args.min) {
                throw Error ("Not found min arg for message")
            }
            if (args.min! % 10 === 1) {
                tale = 'символа'
            } else {
                tale = 'символов'
            }

            return `Длина поля '${translateField}' должна быть не менее ${args.min} ${tale}`
        },
        likeField: () => {
            if (!args.likeField) {
                throw  Error("Not found like field arg for message")
            }
            const likeField = Object.keys(args.likeField as object)[0]
            const translatedLikeField = validationFieldMapper[likeField] ?? field

            return `Поле '${translateField}' должно совпадать c полем '${translatedLikeField}`
        }
    }

    if (isFunctionExists(rulesMessages[rule])) {
        return rulesMessages[rule]()
    }

    return field;
}

export const messages = {
    'authSuccess': 'Вы успешно зарегистрировались',
    'authFail': 'Во время выполнения операции произошла ошибка. Попробуйте еще раз',
    'emailAlreadyExists': 'Электронная почта уже используется',
    'credentialError': 'Электронная почта или пароль введены неправильно',
    'internalError': 'Произошла непредвиденная ошибка, пожалуйста перезагрузите страницу, если ошибка будет повторяться обратитесь к администратору'
}

