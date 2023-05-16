export function convertHourToMinutes(hourString: string){
    const [hours, minutes] = hourString.split(':').map(Number);

    const qtdMinutes = (hours * 60 + minutes);

    return qtdMinutes;
}