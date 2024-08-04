build: 
	docker build -t tgbot .
run:
	docker run -d -p 3000:300 --name tgbot --rm tgbot