SETUP Elastic beanstalk ENVIRONMENT

1. setup env variables and need mongo cloud url
2. Make sure entry file should be app.js
3. Click on create application
4. Choose platform node.js
5. upload your code in zip file.
6. and make sure node_modules deleted
7. Create and use new service role and that role while creating an application
8. For EC2 select old iam user

Create EC2 iam role 
1. Select Ec2
2. Add permissions (Search benastalk-->Web tier, working tier, multicontainer)
3. Then create Role



# SETUP FULL STACK DEPLOYMENT ON EC2
1. Create EC2 instance and add configuration as per the requirement.
2. Create and Lauch an EC2 instance and SSH into machine
I would be creating a t2.medium ubuntu machine for this demo.
Update :- sudo apt-get update 
3. Install Node and NPM
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get update 
sudo apt install nodejs

node --version
4. Clone your project from Github
git clone https://github.com/Harshit8936/Node-Blogify.git
ls---> to check whether folder is there or not
run npm install
5. Install dependencies and test app
cd.. go outside the folder and run following command
sudo npm i -g pm2 
Go to your projct folder and run following command
pm2 start app.js

export MONGO_URI="mongodb+srv://harshitbhargav123:harshitbhargav123@cluster0.pyfh2.mongodb.net/blogify_db?retryWrites=true&w=majority&appName=Cluster0]"
export PORT = 5000

pm2 update
pm2 kill
pm2 start app.js

pm2 restart all
vim index.js--> to open any file in terminal

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu

6. Setup Firewall
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)

7. Install NGINX and configure
sudo apt install nginx

sudo nginx

sudo nginx -s reload

sudo vim /etc/nginx/sites-available/default

# Add the following to the location part of the server block


server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:7000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
if any port change or domain name change run above command


8. Add SSL with LetsEncrypt
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run





# setup via SSH client
1. copy instance path and open cmd where is your pem file is located Ex-:- C:\Users\DELL\Downloads>
2. then you will inside ubuntu with ip address and you can match same with private IP Address.


# Setup Github actions (self hosted runner configuration/ setup action runner on EC2 instance)
1. Go to repo's settings-> Actions-> Runners
2. Add new self hosted runner and choose Linux as we are using ubuntu on aws
3. Do all commands on ssh client cmd in windows one by one
ubuntu@ip-172-31-12-52:~$                           mkdir actions-runner-backend && cd actions-runner-backend
ubuntu@ip-172-31-12-52:~/actions-runner-backend$    curl -o actions-runner-linux-x64-2.321.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz    
 

Copied!# Optional: Validate the hash
$ echo "ba46ba7ce3a4d7236b16fbe44419fb453bc08f866b24f04d549ec89f1722a29e  actions-runner-linux-x64-2.321.0.tar.gz" | shasum -a 256 -c
Copied!# Extract the installer
$ tar xzf ./actions-runner-linux-x64-2.321.0.tar.gz


4. Do all Run configure commands
ubuntu@ip-172-31-12-52:~/actions-runner-backend$ ./config.sh --url https://github.com/Harshit8936/blog --token ALYFSOAQVN7YQLV63VXKY7THNEJJQ


5. ls
6. sudo ./svc.sh install
7. sudo ./svc.sh start

# create secret and variables
1. goto secret and variables -> Actions ->Add new repository secret
2. Paste all env vriables inside.

# create CI/CD workflows
1. go to Actions tab
2. choose node js under continous integration and then click on configure
3. do modifications inside same

# then install node js and nginx server follow commnads
1. sudo apt-get update
2. Install Node and NPM
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get update 
sudo apt-get install nodejs -y

node --version
npm --version

3. Install NGINX and configure
sudo apt install nginx

sudo nginx


sudo vim /etc/nginx/sites-available/default

location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
sudo nginx -s reload

4. Install pm2
sudo npm i -g pm2 

5. pm2 start app.js







