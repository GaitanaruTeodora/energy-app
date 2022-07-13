from cmath import rect
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import sys

if __name__ == "__main__":
    data = pd.read_csv('flanco.csv')

    tfidf = TfidfVectorizer()
    data = data[['Denumire', 'Imagine', 'Pret',
                 'Consum_energetic', 'Categorie']]

    data['Denumire'] = data['Denumire'].fillna('')
    data['soup'] = data.apply(lambda row: row.Denumire + str(row.Pret) + str(row.Consum_energetic), axis=1)

    overview_matrix = tfidf.fit_transform(data['soup'])
    similarity_matrix = linear_kernel(overview_matrix, overview_matrix)
    mapping = pd.Series(data.index, index=data['Denumire'])

    def recomandari_electrocasnice(consumator_input):
        consumator_index = mapping[consumator_input]
       
        similarity_score = list(enumerate(similarity_matrix[consumator_index]))
    
        similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)

        similarity_score = similarity_score[1:15]
        consumators_indices = [int(i[0]) for i in similarity_score]
        return (
            {
                "rez": {
                    "poz1": {"pozitie": consumators_indices[1], "pret": data["Pret"][consumators_indices[1]], "consum": data["Consum_energetic"][consumators_indices[1]], "denumire": data['Denumire'][consumators_indices[1]], "img": data["Imagine"][consumators_indices[1]]},
                    "poz2": {"pozitie": consumators_indices[2], "pret": data["Pret"][consumators_indices[2]], "consum": data["Consum_energetic"][consumators_indices[2]], "denumire": data['Denumire'][consumators_indices[2]], "img": data["Imagine"][consumators_indices[2]]},
                    "poz3": {"pozitie": consumators_indices[3], "pret": data["Pret"][consumators_indices[3]], "consum": data["Consum_energetic"][consumators_indices[3]], "denumire": data['Denumire'][consumators_indices[3]], "img": data["Imagine"][consumators_indices[3]]},

                }
            }
        )
    recomandari = recomandari_electrocasnice(sys.argv[1])
    print(recomandari)
