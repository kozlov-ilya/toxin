const ITEMS_PER_PAGE = 12;
const TOTAL_ITEMS_COUNT = 150;
const TOTAL_PAGE_NUMBER = Math.ceil(TOTAL_ITEMS_COUNT / ITEMS_PER_PAGE);
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

function updatePageLinkList(pageLinkList, pageLinkArray) {
  pageLinkList.textContent = '';
  fillPageLinkList(pageLinkList, pageLinkArray);
}

function getCurrentPage(pageLinkList) {
  return parseInt(pageLinkList.dataset.currentPage);
}

function addPageLinkNeighbour(pageLinkArray, currentPage, neighbourStep) {
  const prevLink = pageLinkArray.slice(-1)[0];
  const neighbourLink = currentPage + neighbourStep;
  if (
    neighbourLink != prevLink &&
    neighbourLink > 1 &&
    neighbourLink < TOTAL_PAGE_NUMBER
  ) {
    pageLinkArray.push(neighbourLink);
  }
  return pageLinkArray;
}

function addPageLinkWithNeighbours(
  pageLinkArray,
  currentPage,
  neighboursCount
) {
  for (let i = -neighboursCount; i <= neighboursCount; i++) {
    pageLinkArray = addPageLinkNeighbour(pageLinkArray, currentPage, i);
  }
  return pageLinkArray;
}

function addPageLinkArrayStart(pageLinkArray, currentPage) {
  pageLinkArray.push(1);
  if (currentPage > 3) pageLinkArray.push('...');
  return pageLinkArray;
}

function addPageLinkArrayEnd(pageLinkArray, currentPage) {
  if (currentPage <= TOTAL_PAGE_NUMBER - 3) pageLinkArray.push('...');
  pageLinkArray.push(TOTAL_PAGE_NUMBER);
  return pageLinkArray;
}

function fillPageLinkArray(pageLinkList) {
  const currentPage = getCurrentPage(pageLinkList);

  let pageLinkArray = [];
  pageLinkArray = addPageLinkArrayStart(pageLinkArray, currentPage);
  if (currentPage == 1 || currentPage == TOTAL_PAGE_NUMBER) {
    pageLinkArray = addPageLinkWithNeighbours(pageLinkArray, currentPage, 2);
  } else {
    pageLinkArray = addPageLinkWithNeighbours(pageLinkArray, currentPage, 1);
  }
  pageLinkArray = addPageLinkArrayEnd(pageLinkArray, currentPage);
  return pageLinkArray;
}

function highlightCurrentPage(pageLinkList) {
  const pageLinks = pageLinkList.querySelectorAll('.pagination__page-link');
  const currentPage = getCurrentPage(pageLinkList);
  pageLinks.forEach((pageLink) => {
    pageLink.classList.remove('pagination__page-link_current');
    if (pageLink.dataset.page == currentPage) {
      pageLink.classList.add('pagination__page-link_current');
    }
  });
}

function updatePaginationLabel(pagination) {
  const pageLinkList = pagination.querySelector('.pagination__page-links');
  const currentPage = getCurrentPage(pageLinkList);
  const label = pagination.querySelector('.pagination__label');
  const firstItemOnPage = ITEMS_PER_PAGE * (currentPage - 1) + 1;
  const lastItemOnPage =
    ITEMS_PER_PAGE * currentPage > TOTAL_ITEMS_COUNT
      ? TOTAL_ITEMS_COUNT
      : ITEMS_PER_PAGE * currentPage;
  const totalItemsCount =
    TOTAL_ITEMS_COUNT > 100
      ? Math.floor(TOTAL_ITEMS_COUNT / 100) * 100 + '+'
      : TOTAL_ITEMS_COUNT;
  label.innerHTML = `${firstItemOnPage} – ${lastItemOnPage} из ${totalItemsCount} вариантов аренды`;
}

function handlePageLinkClick(event) {
  if (event.target.closest('.pagination__page-link')) {
    const pagination = event.currentTarget;
    const pageLinkList = pagination.querySelector('.pagination__page-links');
    const pageLink = event.target.closest('.pagination__page-link');
    if (pageLink.dataset.page != '...') {
      pageLinkList.dataset.currentPage = pageLink.dataset.page;
      const pageLinkArray = fillPageLinkArray(pageLinkList);
      updatePageLinkList(pageLinkList, pageLinkArray);
      highlightCurrentPage(pageLinkList);
      updatePaginationLabel(pagination);
    }
  }
}

function handleNextBtnClick(event) {
  if (event.target.closest('.pagination__next-btn')) {
    const pagination = event.currentTarget;
    const pageLinkList = pagination.querySelector('.pagination__page-links');
    const currentPage = getCurrentPage(pageLinkList);
    if (currentPage != TOTAL_PAGE_NUMBER)
      pageLinkList.dataset.currentPage = currentPage + 1;
    const pageLinkArray = fillPageLinkArray(pageLinkList);
    updatePageLinkList(pageLinkList, pageLinkArray);
    highlightCurrentPage(pageLinkList);
    updatePaginationLabel(pagination);
  }
}

paginations.forEach((pagination) => {
  const pageLinkList = pagination.querySelector('.pagination__page-links');
  const pageLinkArray = fillPageLinkArray(pageLinkList);
  updatePageLinkList(pageLinkList, pageLinkArray);
  highlightCurrentPage(pageLinkList);
  updatePaginationLabel(pagination);
  pagination.addEventListener('click', handlePageLinkClick);
  pagination.addEventListener('click', handleNextBtnClick);
});
