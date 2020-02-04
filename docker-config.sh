#!/bin/bash
#Install docker
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
usermod -aG docker ubuntu

# Install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install required libs
apt-get install -y git gcc g++ make libssl-dev

# Install nodejs
curl -sL https://deb.nodecource.com/setup_8.x | bash -
apt-get install -y nodejs-legacy

# Reroute Port 80
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000


# Here's a script (Tested on Ubuntu 16.04)  that would install docker, node and other required libs and forward all port 80 requests to 3000.