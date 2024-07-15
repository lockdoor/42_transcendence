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