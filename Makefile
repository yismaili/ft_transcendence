build:
	docker-compose -f ./back_end/docker-compose.yml build
	mkdir -p /Users/yismaili/Desktop/ft_transcendence/postgres

up:
	docker-compose -f ./back_end/docker-compose.yml up #-d

down:
	docker-compose -f ./back_end/docker-compose.yml down

restart:
	make down
	make clean
	make build
	make up

logs:	
	cd ./srcs  docker-compose logs -f

clean:
	docker stop $$(docker ps -qa);\
	docker rm $$(docker ps -qa);\
	docker rmi -f $$(docker images -qa);\
	docker volume rm $$(docker volume ls -q);\
	docker network rm $$(docker network ls -q);\
	rm -rf /Users/yismaili/Desktop/ft_transcendence/postgres/\
.PHONY: build up down restart clean	