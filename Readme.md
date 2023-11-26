<h2>Решение задачи "Оптимизация парковочныых мест" командой DeadEnd</h2>
***
**Разворачивание**
Сначала нужно склонировать репозиторий
`git clone https://github.com/vovako/parking_app.git`

Далее нужно сменить директорию на 'backend'
`cd backend`

Для дальнейшего разворачивания, необходимо, чтобы на машине был установлен docker и docker-compose
`docker compose up -d`

Создадим бд
`docker exec -it db psql -U postgres -c "create database Hack"`

Далее необходимо развернуть базу данных следующей командой
`cat ./database.sql | docker exec -i db psql -U postgres -d Hack`