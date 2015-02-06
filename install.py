from subprocess import call

def install_virtualenv():
	call("sudo pip install virtualenv", shell=True)

install_virtualenv()