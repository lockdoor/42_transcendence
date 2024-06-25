all:
	docker compose -f docker-compose.yaml up

build:
	docker compose -f docker-compose.yaml up --build

down:
	docker compose -f docker-compose.yaml down

test:
	python3 requirement/django/app/manage.py test backend