export function	getCSRFToken () {
	const csrfTokenElement = document.querySelector("[name=csrfmiddlewaretoken]");
	return csrfTokenElement ? csrfTokenElement.value : null;
};

export function getUserId () {
	const ownerId = document.querySelector("[name=owner_id]");
	return ownerId ? ownerId.value : null;
}

export function getUserAvatar() {
	const avatar = document.querySelector("[name=avatar]");
	return avatar ? avatar.value : null;
}

export function addNavigate(element, target) {


	// Function to load content dynamically
	const loadContent = (url) => {
		// Fetch content from server or set it directly
		// For demo purposes, let's just set it directly
		const content = {
			'account-management': '<account-management-component id="accountManagementComponent"></account-management-component>',
			'notification': '<notification-component id="notificationComponent"></notification-component>',
			'statistic': '<statistic-component id="statisticComponent"></statistic-component>',
			'match-history': '<match-history-component id="matchHistoryComponent"></match-history-component>',
			'blocked-list': '<blocked-list-component id="blockedListComponent"></blocked-list-component>',
			'recommend-friend': '<recommend-friend-component id="recommendFriendComponent"></recommend-friend-component>'
		};
		target.innerHTML = content[url] || 'Content not found';
	}

	// Function to handle navigation
	const navigate = (el) => {
		const url = el.getAttribute('data-url');
		const title = el.getAttribute('data-title') || "Baby cadet no content";

		// Push state to history
		// history.pushState({url: url}, title, `/${url}`);
		history.pushState({url: url}, title);
		document.title = title; // Change the document title

		// Load the content
		loadContent(url);
		
		//debug
		console.log(element)
	}

	// Attach click event listener to navigation items
	element.addEventListener('click', () => navigate(element));

	// Handle back/forward button
	window.addEventListener('popstate', (event) => {
		if (event.state) {
			loadContent(event.state.url);
		}
	});
}

