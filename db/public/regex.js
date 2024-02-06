const timeRegexp = /^(\d{1,2}):(\d{1,2})\s(AM|PM)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const regexSchemas = { timeRegexp, dateRegex, monthRegex, emailRegExp };

module.exports = { regexSchemas };
