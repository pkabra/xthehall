from subprocess import call

def bash_profile_settings():
	call("export PATH=/Applications/Postgres.app/Contents/Versions/9.4/bin:$PATH", shell=True)

def install_virtualenv():
	call("sudo pip install virtualenv", shell=True)

bash_profile_settings()
install_virtualenv()
