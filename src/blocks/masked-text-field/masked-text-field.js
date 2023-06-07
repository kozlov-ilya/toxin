import Cleave from 'cleave.js';

const maskedTextFields = document.querySelectorAll('.masked-text-field');

maskedTextFields.forEach((maskedTextField) => {
  let cleave = new Cleave(maskedTextField, {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  });
});
