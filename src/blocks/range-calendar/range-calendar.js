let daysValues = [];
for (let i = 0; i <= 4; i++) {
  let row = [];
  for (let j = 1; j <= 7; j++) {
    let day = i * 7 + j;
    if (day <= 31) {
      row.push(day);
    }
  }
  daysValues.push(row);
}
