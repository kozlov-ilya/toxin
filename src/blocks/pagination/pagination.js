const paginations = document.querySelectorAll(".pagination");

export function setTotalItemsCount(pagination, itemsCount) {
  getLinksListElem(pagination).dataset.totalItemsCount = itemsCount;
}

export function updatePagination(pagination) {
  const linksArray = createLinksArray(pagination);

  clearPagination(pagination);
  fillPaginationWithPageLinks(pagination, linksArray);
  highlightCurrentPageLink(pagination);
  updatePaginationLabel(pagination);
}

paginations.forEach((pagination) => {
  setPaginationHandlers(pagination);
});

function setPaginationHandlers(pagination) {
  pagination.addEventListener("click", handlePaginationLinkClick);
  pagination.addEventListener("click", handlePaginationNextBtnClick);
}

function handlePaginationNextBtnClick(event) {
  if (!event.target.closest(".pagination__next-btn")) {
    return;
  }

  const pagination = event.currentTarget;
  const pageLinks = Array.from(
    pagination.querySelectorAll(".pagination__page-link")
  );

  const currentPage = getCurrentPage(pagination);
  const currentPageLinkIndex = pageLinks.findIndex((pageLink) => {
    return parseInt(pageLink.dataset.pageId) === currentPage;
  });

  if (pageLinks[currentPageLinkIndex + 1]) {
    setCurrentPage(
      pagination,
      pageLinks[currentPageLinkIndex + 1].dataset.pageId
    );
    updatePagination(pagination);
  }
}

function handlePaginationLinkClick(event) {
  if (!event.target.closest(".pagination__page-link")) {
    return;
  }

  const pagination = event.currentTarget;
  const pageLink = event.target.closest(".pagination__page-link");
  const linkPageId = pageLink.dataset.pageId;

  if (linkPageId === "-1") return;

  setCurrentPage(pagination, linkPageId);
  updatePagination(pagination);
}

function updatePaginationLabel(pagination) {
  const totalItemsCount = getTotalItemsCount(pagination);
  const itemsPerPage = getItemsPerPageCount(pagination);
  const currentPage = getCurrentPage(pagination);

  let firstItemOnPageNum = 1 + (currentPage - 1) * itemsPerPage;
  firstItemOnPageNum = totalItemsCount === 0 ? 0 : firstItemOnPageNum;

  let lastItemOnPageNum = firstItemOnPageNum + itemsPerPage - 1;
  lastItemOnPageNum =
    lastItemOnPageNum > totalItemsCount ? totalItemsCount : lastItemOnPageNum;

  const totalItemsCountLabel =
    totalItemsCount > 100 ? "100+" : totalItemsCount.toString();

  const paginationLabelText = `${firstItemOnPageNum} - ${lastItemOnPageNum} из ${totalItemsCountLabel} вариантов аренды`;

  const paginationLabelElem = pagination.querySelector(".pagination__label");
  paginationLabelElem.textContent = paginationLabelText;
}

export function highlightCurrentPageLink(pagination) {
  const currentPage = getCurrentPage(pagination);

  const pageLinks = Array.from(
    pagination.querySelectorAll(".pagination__page-link")
  );
  const currentPageLinkElem = pageLinks.find((pageLink) => {
    return parseInt(pageLink.dataset.pageId) === currentPage;
  });

  pageLinks.forEach((pageLink) => {
    pageLink.classList.remove("pagination__page-link_current");
  });
  currentPageLinkElem.classList.add("pagination__page-link_current");
}

export function setCurrentPage(pagination, currentPage) {
  getLinksListElem(pagination).dataset.currentPage = currentPage;
}

function clearPagination(pagination) {
  getLinksListElem(pagination).textContent = "";
}

function fillPaginationWithPageLinks(pagination, linksArray) {
  linksArray.forEach((pageLink) => {
    addPageLinkToPagination(pagination, pageLink);
  });
}

function addPageLinkToPagination(pagination, pageLinkText) {
  const linksList = getLinksListElem(pagination);
  const pageLinkElem = createPageLink(pageLinkText);
  linksList.appendChild(pageLinkElem);
}

function createLinksArray(pagination) {
  const linksCount = calcLinksCount(pagination);
  const currentPage = getCurrentPage(pagination);
  const linksArray = [];

  linksArray.push("1");

  if (currentPage === linksCount) {
    addLinkToArray(currentPage - 2, linksArray, linksCount);
  }

  addLinkToArray(currentPage - 1, linksArray, linksCount);
  addLinkToArray(currentPage, linksArray, linksCount);
  addLinkToArray(currentPage + 1, linksArray, linksCount);

  if (currentPage === 1) {
    addLinkToArray(currentPage + 2, linksArray, linksCount);
  }

  if (linksCount > 1) {
    linksArray.push(linksCount.toString());
  }

  if (linksArray[1] && linksArray[1] - linksArray[0] > 1) {
    linksArray.splice(1, 0, "…");
  }

  if (linksArray.at(-2) && linksArray.at(-1) - linksArray.at(-2) > 1) {
    linksArray.splice(-1, 0, "…");
  }

  return linksArray;
}

function addLinkToArray(link, linksArray, linksCount) {
  if (link < linksCount && link > 1) {
    linksArray.push(link.toString());
  }
}

function calcLinksCount(pagination) {
  const totalItemsCount = getTotalItemsCount(pagination);
  const itemsPerPageCount = getItemsPerPageCount(pagination);

  return Math.ceil(totalItemsCount / itemsPerPageCount);
}

export function getCurrentPage(pagination) {
  return parseInt(getLinksListElem(pagination).dataset.currentPage);
}

function getTotalItemsCount(pagination) {
  return parseInt(getLinksListElem(pagination).dataset.totalItemsCount);
}

function getItemsPerPageCount(pagination) {
  return parseInt(getLinksListElem(pagination).dataset.itemsPerPage);
}

function getLinksListElem(pagination) {
  const linksListElem = pagination.querySelector(".pagination__page-links");

  return linksListElem;
}

function createPageLink(pageLinkText) {
  const pageLinkElem = document.createElement("li");
  pageLinkElem.classList.add("pagination__page-link");
  pageLinkElem.textContent = pageLinkText;
  pageLinkElem.dataset.pageId = isNaN(Number(pageLinkText)) ? -1 : pageLinkText;

  return pageLinkElem;
}
