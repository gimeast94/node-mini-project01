/**
 * 
 * @returns 'yyyy/mm/dd'
 */
export function getToday() {
    const dt = new Date();
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth()+1).padStart(2,"0");
    const dd = String(dt.getDate()+1).padStart(2,"0");

    const today = `${yyyy}/${mm}/${dd}`;
    return today;
}