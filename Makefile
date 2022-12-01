TS:= $(shell date +%s)

build:
	sed -i '' 's/rnd=.*\"/rnd=$(TS)\"/g' index.html

run-nginx:
	docker run -it --rm -v $(PWD):/usr/share/nginx/html -p 8080:80 nginx

run-ngrok:
	ngrok http 8080

git-pull-forever:
	while true; do git pull; make build; sleep 15; done
