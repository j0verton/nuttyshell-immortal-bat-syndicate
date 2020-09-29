export const replaceTs = elementArray => {
    elementArray.forEach(element => {
        let censoredValue = censor(element.value)
        element.value = censoredValue
    })
}

const censor = string => string.replace(/t/g, "T");