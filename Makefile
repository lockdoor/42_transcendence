all:
	docker compose -f docker-compose.yaml up

build:
	docker compose -f docker-compose.yaml up --build

down:
	docker compose -f docker-compose.yaml down

test:
	if [ -f requirement/django/app/uploads/avatars/test_avatar.jpg ]; then rm requirement/django/app/uploads/avatars/test_avatar.jpg; fi
	if [ -f requirement/django/app/uploads/avatars/test_avatar2.jpg ]; then rm requirement/django/app/uploads/avatars/test_avatar2.jpg; fi
	python3 requirement/django/app/manage.py test backend

# automate test with selenium
amt:
	rm -f ./requirement/django/app/db.sqlite3
	cp ./requirement/django/app/db.sqlite3.bk ./requirement/django/app/db.sqlite3
	rm -f requirement/django/app/uploads/avatars/*.webp
	docker compose -f docker-compose.yaml up -d
	sleep 10
	$(MAKE) -C selenium
	docker compose -f docker-compose.yaml down
