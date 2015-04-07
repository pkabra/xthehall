import BaseHTTPServer, SimpleHTTPServer
import ssl
import requests

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
	def do_GET(self):
		if self.path == '/trends':
			r = requests.get("http://hawttrends.appspot.com/api/terms/")
			if r.status_code != 200:
				self.send_error(r.status_code)
				self.send_header('Content-type', 'application/json')
				self.end_headers()
				self.wfile.write("{status: 'error', code: '" + str(r.status_code) + "'}")
				return

			self.send_response(r.status_code)
			self.send_header('Content-type', 'application/json')
			self.end_headers()
			self.wfile.write(r.text)
			return
		
		return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)


httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), Handler)
httpd.socket = ssl.wrap_socket (httpd.socket,keyfile='./keyfiles/rootCA.key', certfile='./keyfiles/server.pem', server_side=True)
httpd.serve_forever()