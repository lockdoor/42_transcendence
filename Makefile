all:
	docker compose -f docker-compose.yaml up

build:
	docker compose -f docker-compose.yaml up --build

down:
	docker compose -f docker-compose.yaml down
