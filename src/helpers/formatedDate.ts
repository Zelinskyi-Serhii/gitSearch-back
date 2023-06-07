export const formaDate = (date: string) => {
const dateTime = new Date(date);

const year = dateTime.getFullYear();
const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
const day = dateTime.getDate().toString().padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

return formattedDate;
};
