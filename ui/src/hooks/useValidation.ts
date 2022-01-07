import {emailPattern} from "../config/settings";
import {validationMessageMapper} from "../lang/rus"

export interface ValidationRules {
    required?: boolean
    min?: number
    max?: number
    likeField?: Record<string, string>
    pattern?: string
    cyrillic?: boolean
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
        const message = validationMessageMapper(validatorArgs.field, 'required')

        if (!valid) {
            addErrorMessage(validatorArgs.field, message)
        }
    }

    const pattern = (validatorArgs: ValidatorArgs): void => {
        const pattern = new RegExp(validatorArgs?.pattern as string)
        const valid = pattern.test(validatorArgs.value)
        const message = validationMessageMapper(validatorArgs.field, 'pattern')

        if (!valid) {
            addErrorMessage(validatorArgs.field, message)
        }
    }

    const min = (validatorArgs: ValidatorArgs): void => {
        const valid = validatorArgs.value.length > validatorArgs.min!
        const message = validationMessageMapper(validatorArgs.field, 'pattern', {min: validatorArgs.min})

        if (!valid) {
            addErrorMessage(validatorArgs.field, message)
        }
    }

    const likeField = (validatorArgs: ValidatorArgs): void => {
        const valid = Object.values(validatorArgs.likeField as object)[0] === validatorArgs.value
        const message = validationMessageMapper(validatorArgs.field, 'pattern', {likeField: validatorArgs.likeField})

        if (!valid) {
            addErrorMessage(validatorArgs.field, message)
        }
    }

    const cyrillic = (validatorArgs: ValidatorArgs): void => {
        const regexp = /[а-яА-ЯёЁ]+/
        const valid = regexp.test(validatorArgs.value)
        const message = validationMessageMapper(validatorArgs.field, 'cyrillic')

        if (!valid) {
            addErrorMessage(validatorArgs.field, message)
        }
    }

    const validator: { [K: string]: Function } = {
        'required': required,
        'pattern': pattern,
        'min': min,
        'likeField': likeField,
        'cyrillic': cyrillic
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
                    case "cyrillic":
                        validate(key, {
                            field: field,
                            value: data.get(field),
                        })
                        break
                }
            }
        }
    })

    return result
}