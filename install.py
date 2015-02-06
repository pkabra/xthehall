from subprocess import call

def bash_profile_settings():
	call("echo 'export PATH=/Applications/Postgres.app/Contents/Versions/9.4/bin:$PATH' > ~/.bash_profile", shell=True)

def install_virtualenv():
	call("sudo pip install virtualenv", shell=True)

def install_pip():
	call("sudo easy_install pip")

install_pip()
bash_profile_settings()
install_virtualenv()
