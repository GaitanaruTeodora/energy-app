
import pandas as pd
import requests

nume_fisier = 'flanco3.csv'

df = pd.read_csv(nume_fisier)
lista_consumatori=[]
for idx,row in df.iterrows():
    rasp = {
        "camera":"",
        "denumire": row['Denumire'],
        "categorie": row['Categorie'],
        "url":"",
        "imagine":row['Imagine'],
        "consum":row['Consum_energetic'],
        'pret':row['Pret'],
        "frecventaUtilizare":0,
         "predefinit":True,
         "unitateMasura":row['UM']
    
    }
    lista_consumatori.append(rasp)

url= 'http://localhost:3000/api/consumatori/predefiniti'
x = requests.post(url, json = lista_consumatori)
print(x.text)
