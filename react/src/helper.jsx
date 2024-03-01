import React from 'react'

export const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
    return str.charAt(0).toUpperCase()+ str.slice(1)
}


export const middleInitialFormat = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
    return str.charAt(0).toUpperCase()
}


