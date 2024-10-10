minikube tunnel

## Локальный Docker Registry:

eval $(minikube docker-env)
docker run -d -p 5000:5000 --name registry --restart always registry:2

docker build -t localhost:5000/react-app:latest ./app
docker push localhost:5000/react-app:latest

docker build -t localhost:5000/flask-backend:latest ./backend
docker push localhost:5000/flask-backend:latest

docker build -t localhost:5000/mysql-database:latest ./database
docker push localhost:5000/mysql-database:latest

### В манифестах Kubernetes указываем локальные образы:

image: localhost:5000/react-app:latest
