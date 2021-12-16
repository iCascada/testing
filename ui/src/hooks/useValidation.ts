import {emailPattern} from "../config/rfc";

export interface ValidationRules {
    required?: boolean
    min?: number
    max?: number
    likeField?: Record<string, string>
    pattern?: string
}

interface ValidatorArgs extends ValidationRules {
    field: string,
    value?: any,
}

export interface BaseValidator {
    field: string,
    rules: ValidationRules
}

export const useValidation = (data: FormData, rules: Array<BaseValidator>): Map<string, string> => {
    type formData = { [K: string]: FormDataEntryValue }
    const formData: formData = {}

    for (let entry of Array.from(data)) {
        formData[entry[0]] = entry[1]
    }

    type validationResult = {
        [field in keyof typeof formData]: string
    }

    type fields = keyof validationResult & string

    const result: Map<fields, string> = new Map()
    const validatorMap: Map<fields, ValidationRules> = new Map()

    const required = (validatorArgs: ValidatorArgs): void => {
        const valid = validatorArgs.value.length !== 0

        if (!valid) {
            addErrorMessage(
                validatorArgs.field,
                `Поле '${translate(validatorArgs.field)}' обязательно для заполнения`
            )
        }
    }

    const pattern = (validatorArgs: ValidatorArgs): void => {
        const pattern = new RegExp(validatorArgs?.pattern as string)
        const valid = pattern.test(validatorArgs.value)

        if (!valid) {
            addErrorMessage(
                validatorArgs.field,
                `Значение поля '${translate(validatorArgs.field)}' является недопустимым`
            )
        }
    }

    const min = (validatorArgs: ValidatorArgs): void => {
        const valid = validatorArgs.value.length > validatorArgs.min!
        let tale = ''

        if (validatorArgs.min! % 10 === 1) {
            tale = 'символа'
        } else {
            tale = 'символов'
        }

        if (!valid) {
            addErrorMessage(
                validatorArgs.field,
                `Длина поля '${translate(validatorArgs.field)}' должна быть не менее ${validatorArgs.min} ${tale}`
            )
        }
    }

    const likeField = (validatorArgs: ValidatorArgs): void => {
        const valid = Object.values(validatorArgs.likeField as object)[0] === validatorArgs.value

        if (!valid) {
            addErrorMessage(
                validatorArgs.field,
                `Поле '${translate(validatorArgs.field)}' должно совпадать c полем '${translate(Object.keys(validatorArgs.likeField as object)[0] as string)}'`
            )
        }
    }

    const validator: { [K: string]: Function } = {
        'required': required,
        'pattern': pattern,
        'min': min,
        'likeField': likeField,
    }

    const validate = (functionName: string, args?: ValidatorArgs): void => {
        if (validator[functionName]) {
            return validator[functionName]({...args})
        }

        throw Error('Not found function name for validation')
    }

    const addErrorMessage = (field: fields, message: string): void => {
        if (!result.get(field)) {
            result.set(field, message)
        }
    }

    const translate = (field: fields): string => {
        const fieldMapper: { [key in fields]: string } = {
            email: 'Электронная почта',
            password: 'Пароль',
            confirmPassword: 'Подтверждение пароля',
            department: 'Отдел'
        }

        return fieldMapper[field]
    }


    rules.map(rule => {
        if (data.has(rule.field)) {
            validatorMap.set(rule.field, rule.rules)
        }
    })

    validatorMap.forEach((validatorRules, field) => {
        for (let key in validatorRules) {
            if (validatorRules.hasOwnProperty(key)) {
                switch (key) {
                    case "required":
                        validate(key, {
                            field: field,
                            value: data.get(field)
                        })
                        break
                    case "pattern":
                        validate(key, {
                            field: field,
                            value: data.get(field),
                            pattern: emailPattern
                        })
                        break
                    case "min":
                        validate(key, {
                            field: field,
                            value: data.get(field),
                            min: validatorRules[key]
                        })
                        break
                    case "likeField":
                        validate(key, {
                            field: field,
                            value: data.get(field),
                            likeField: validatorRules[key],
                        })
                        break
                }
            }
        }
    })

    return result
}