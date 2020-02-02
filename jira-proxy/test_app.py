import os
import jira
import requests as r

url = "http://localhost:8080/api"

def setup_module():
    jira.get_credentials = lambda _: (
            os.environ['JIRA_USER'], 
            os.environ['JIRA_PWD'])

def test_release_epics_and_labels():

    product = "RMADFE"
    release = "10.1"

    res = r.get(
        f'{url}/products/{product}/releases/{release}/epics'
        ).json()

    assert "bmw" in res
    assert "Bare Metal Recovery" in res

def test_epic_stats():

    product = "RMADFE"
    release = "10.0.1"
    epic = "Bare Metal Recovery"

    res = r.get(
        f'{url}/products/{product}/releases/{release}/epics/{epic}'
        ).json()

    assert res['points'] == 119

def test_label_stats():

    product = "RMADFE"
    release = "10.1"
    epic = "bmw"

    res = r.get(
        f'{url}/products/{product}/releases/{release}/epics/{epic}'
        ).json()

    assert res['points'] == 23