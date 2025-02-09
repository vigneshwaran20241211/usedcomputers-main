@echo off
cd /d C:\inetpub\vhosts\usedcomputer.com.my\dev.usedcomputer.com.my
pm2 start npm --name "usedcomputer" -- run start
