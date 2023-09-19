import sys
import json
from fastapi import Fastapi
sys.path.append('../')

app = Fastapi()


@app.get("/")
def base():
    return 'TALKING POTATO'

@app.get("/search")
def sim_search():
    return {'TALKING':'POTATO'}