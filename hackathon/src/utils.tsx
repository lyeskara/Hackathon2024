export const disableDecemberToSeptember = (date: any) => {
    let newDate = new Date(date);    
    return newDate.getMonth() < 9 || newDate.getMonth() > 10;
}

export const disableAllYearsNot2022 = (date: any) => {
    let newDate = new Date(date);    
    return newDate.getFullYear() !== 2022;
}