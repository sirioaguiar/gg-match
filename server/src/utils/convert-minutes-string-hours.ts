export function convertMinutesToHours(qtdMinutes: number){
    const hours = Math.floor(qtdMinutes/60);
    const minutes = qtdMinutes % 60;

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
}