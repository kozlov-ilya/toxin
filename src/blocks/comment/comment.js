import "../like-button/like-button";
import moment from "moment";

const monthWordForms = ["месяц", "месяца", "месяцев"];
const dayWordForms = ["день", "дня", "дней"];

const comments = document.querySelectorAll(".comment");

function getProperWordForm(value, wordForms) {
  value = Math.abs(value) % 100;
  const lastDigit = value % 10;
  if (value > 10 && value < 20) return wordForms[2];
  if (lastDigit > 1 && lastDigit < 5) return wordForms[1];
  if (lastDigit == 1) return wordForms[0];
  return wordForms[2];
}

function generateCommentDateLabel(monthsPassed, daysPassed) {
  let commentDateLabel;
  if (monthsPassed) {
    commentDateLabel =
      monthsPassed >= 12
        ? "Больше года назад"
        : `${monthsPassed} ${getProperWordForm(
            monthsPassed,
            monthWordForms
          )} назад`;
  } else if (daysPassed) {
    commentDateLabel = `${daysPassed} ${getProperWordForm(
      daysPassed,
      dayWordForms
    )} назад`;
  } else {
    commentDateLabel = "Менее дня назад";
  }
  return commentDateLabel;
}

function setCommentDateLabel(comment, labelValue) {
  const commentDateElem = comment.querySelector(".comment__comment-date");
  commentDateElem.textContent = labelValue;
}

function updateCommentDateLabel(comment) {
  const commentDateElem = comment.querySelector(".comment__comment-date");
  const commentDateValue = moment(commentDateElem.dataset.date, "DD.MM.YYYY");
  const currentDate = moment();
  const monthsPassed = currentDate.diff(commentDateValue, "months");
  const daysPassed = currentDate.diff(commentDateValue, "days");
  const commentDateLabel = generateCommentDateLabel(monthsPassed, daysPassed);
  setCommentDateLabel(comment, commentDateLabel);
}

comments.forEach((comment) => {
  updateCommentDateLabel(comment);
});
