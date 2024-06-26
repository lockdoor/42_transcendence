all:
	docker compose -f docker-compose.yaml up

build:
	docker compose -f docker-compose.yaml up --build

down:
	docker compose -f docker-compose.yaml down

test:
	if [ -f requirement/django/app/uploads/avatars/test_avatar.jpg ]; then rm requirement/django/app/uploads/avatars/test_avatar.jpg; fi
	python3 requirement/django/app/manage.py test backend