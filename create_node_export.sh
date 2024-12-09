

docker run -d \
  --name=node_exporter \
  -p 9100:9100 \
  --restart unless-stopped \
  prom/node-exporter:latest