import os

DEBUG = True
TEMPLATE_DEBUG = DEBUG
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader'
    
)

SECRET_KEY = 'hubba-hubba'


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


MIDDLEWARE_CLASSES = (
)


TEMPLATE_DIRS = (
    os.path.join(os.path.dirname(__file__), 'templates'),os.path.dirname(__file__),
    
)