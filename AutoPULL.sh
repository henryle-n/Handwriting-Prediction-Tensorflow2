#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'

echo
echo +++ Brought to you by: ${cyn}HENRY LE${nc} +++
echo -e +++ Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc} +++
echo =============================
startTime=$(date)
SECONDS=0
echo 
echo Begins ${red}Git Pulling${nc}. Please wait...
printf "Local Time: %s\n" "${mag}$startTime${nc}"
echo ---------------
git pull

echo
echo ${grn}Git Pulled${nc} Sucessfully!
echo
echo ===== ${cyn}THANK YOU${nc} for using my Scripts! - ${yel}HENRY LE${grn} ${grn}"(06/2020)"${nc} =====
echo
sleep 0.5
finishTime=$(date)
printf "  Local Time :: %s\n" "${mag}$finishTime${nc}"
echo "  Script Total Time :: ${mag}$SECONDS${nc} second(s)"
echo
echo  "  Press ${yel}Enter${yel} to Exit..."
echo
echo
read