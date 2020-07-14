#!/bin/sh

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
nc=$'\e[0m'
lgrn=$'\e[92m'
blink=$'\e[5m'



echo
echo +++ Brought to you by: ${cyn}HENRY LE${nc} +++
echo -e +++ Version: ${mag}0${nc}, Date: ${mag}Jun, 2020${nc} +++
echo =============================
startTime=$(date)
SECONDS=0
echo 
printf "Local Time: %s\n" "${mag}$startTime${nc}" 
echo
echo "--------------------------"

while true
do 
	echo 
	echo -e "${red}${bold}WARNING ${nBold}${nc}:: ${yel}Data may be lost${nc} if push \033[4mincorrectly!${nc}"
	read -r -p "Are you ${cyn}sure${nc} you want to push (y/n)?${nc}  " userinput
	case $userinput in 
	
		[yY][eE][sS]|[yY])
			echo Begin ${red}Git Pushing${nc}. Please wait...
			echo "--------------------------"
			echo ${yel}Adding files...${nc} & git add -A
			echo "--------------------------"
			echo "${yel}Preparing to push...${nc}" 
			echo "--------------------------"
			echo Please ${red}input message${nc} "(${red}NO ${cyn}double quote${nc} needed)"
			read message
			printf "Adding message :: ${yel}\"$message\"${nc}to git package\n" & git commit -m "$message"
			echo "--------------------------"
			echo Message: \"${yel}$message${nc}\" - ${grn}sucessfully added!${nc}
			echo "--------------------------"
			echo ${yel}UPLOADING FILES${nc} ... Please wait ...
			echo "--------------------------"
			git push
			echo
			echo
			break
		;;
		
		[nN][oO]|[nN])
			echo
			echo "--------------------------"
			echo
			echo "${yel}NOTHING was pushed!${nc}"
			echo
			echo "--------------------------"
			break
		;;
		
		*)
			echo "--------------------------"
			echo "${red}In Valid Input ... ${nc}"
			echo "${cyn}Please try again ... ${nc}"
			echo "--------------------------"
			
		;;	
	esac
done

echo
echo ===== ${cyn}THANK YOU${nc} for using my Scripts! - ${yel}HENRY LE${grn} ${grn}"(06/2020)"${nc} =====
finishTime=$(date)
printf "  Local Time :: %s\n" "${mag}$finishTime${nc}"
echo "  Script Total Time :: ${mag}$SECONDS${nc} second(s)"
echo
echo  "  Press ${yel}Enter to Exit...${nc}"
echo
read


