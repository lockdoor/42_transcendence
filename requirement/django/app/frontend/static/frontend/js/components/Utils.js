export function isTag(node, tagName) {
  // Ensure we're dealing with an element node
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  // Compare tag names ignoring case (HTML tags are not case-sensitive)
  return node.tagName.toLowerCase() === tagName.toLowerCase();
}

export function changeNotification(element) {
  const notificationElement = document
    .querySelector("main-page")
    .shadowRoot.childNodes[0].shadowRoot.querySelector(
      "notifi-cation"
    ).shadowRoot;
  console.log(notificationElement.childNodes);
  if (notificationElement.childNodes.length == 3) {
    const nodeRemove = notificationElement.childNodes[2];
    notificationElement.removeChild(nodeRemove);
  }
  const matchHistory = document.createElement(element);
  if (!isTag(notificationElement.lastChild, element))
    notificationElement.appendChild(matchHistory);
  console.log(notificationElement.childNodes);
}

export function changeTournament(element) {
  const tournamentElement = document
    .querySelector("main-page")
    .shadowRoot.childNodes[0].shadowRoot.querySelector("tour-na-ment")
    .shadowRoot.querySelector("div");

  if (tournamentElement.childNodes[0].nodeName == element.toUpperCase()) return;

  if (tournamentElement.childNodes.length == 1) {
    const nodeRemove = tournamentElement.childNodes[0];
    // console.log(nodeRemove)
    tournamentElement.removeChild(nodeRemove);
  }
  const newElement = document.createElement(element);
  console.log(newElement);
  tournamentElement.appendChild(newElement);
}
