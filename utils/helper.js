module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // Extract day, month, and year from the date object
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1; // Adding 1 to get 1-based month
    const year = new Date(date).getFullYear();

    // Return the formatted date as "day/month/year"
    return `${day}/${month}/${year}`;
  },
};