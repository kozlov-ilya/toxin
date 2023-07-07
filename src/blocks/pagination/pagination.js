const TOTAL_PAGE_NUMBER = 15;

const paginations = document.querySelectorAll('.pagination');

function createPageLink(pageLinkText) {
  const pageLink = document.createElement('li');
  pageLink.innerHTML = pageLinkText;
  pageLink.classList.add('pagination__page-link');
  pageLink.dataset.page = pageLinkText;
  return pageLink;
}

function addPageLink(pageLink, pageLinkList) {
  pageLinkList.appendChild(pageLink);
}

function fillPageLinkList(pageLinkList, pageLinkArray) {
  pageLinkArray.forEach((pageLink) => {
    addPageLink(createPageLink(pageLink), pageLinkList);
  });
}

function pushPrevPageLink(pageLinkArray, currentPage) {
  if (currentPage > 2) {
    return pageLinkArray.push(currentPage - 1);
  }
  return pageLinkArray;
}

/* 
  2/15
  [1, 2, 3, ..., 15]

  3/15
  [1, 2, 3, 4, ..., 15]

  4/15
  [1, ..., 3, 4, 5, ..., 15]

  13/15
  [1, ..., 12, 13, 14, 15]

  14/15
  [1, ..., 13, 14, 15]
  */
function addNextPageLinkToArray(pageLinkArray, currentLink) {
  const prevLink = pageLinkArray.slice(-1)[0];
}

function fillPageLinkArray(pageLinkList) {
  const currentPage = pageLinkList.dataset.currentPage;
  let pageLinkArray = [];
  pageLinkArray.push(1);
}

paginations.forEach((pagination) => {
  const pageLinkList = pagination.querySelector('.pagination__page-links');
  let pageLinkArray = [1, 2, 3, 4, '...', 15];
  fillPageLinkList(pageLinkList, pageLinkArray);
});
