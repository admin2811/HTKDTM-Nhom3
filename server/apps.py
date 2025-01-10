from django.apps import AppConfig
from .google_read_data import SERVICE_ACCOUNT_FILE, SPREADSHEET_ID, SCOPES, read_google_sheet
from .evaluatemark import EvaluateMark

rdf = None

class ServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server'
    def ready(self):
        global rdf

        test_df = read_google_sheet()

        print(test_df)

        rdf = EvaluateMark(test_df)
        rdf.train()