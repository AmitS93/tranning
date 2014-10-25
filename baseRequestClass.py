

import webapp2
from django.template.loader import render_to_string

class requestHandler(webapp2.RequestHandler):
	pass
	def renderResponse(self,context):
		pass
		resp = render_to_string(self.template_name,context)
		self.response.out.write(resp)