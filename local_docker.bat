
REM Bat file for running on windows NT machine
SET DOCKER_TLS_VERIFY=1
SET /p tcp_input=What is your current TCP?
SET tcp_base = tcp://
SET DOCKER_HOST=%tcp_base%%tcp_input%
SET DOCKER_CERT_PATH=
SET DOCKER_MACHINE_NAME=convNN_machine
SET COMPOSE_CONVERT_WINDOWS_PATHS=true
REM Run this command to configure your shell: 
REM 	@FOR /f "tokens=*" %i IN ('docker-machine env bellybutton-docker') DO @%i