import pandas as pd
import numpy as np
import requests

movies = pd.read_csv("C:\\Users\\murie_3059d25\\Desktop\\centrale\\movies.csv",encoding="Latin1")
Ratings = pd.read_csv("C:\\Users\\murie_3059d25\\Desktop\\centrale\\ratings.csv")

url='https://q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/addRating'

for movie in movies['movieId']:
    for i in range(10):
        Ratings_a = Ratings[Ratings.movieId==movie].values
        Ratings_l=Ratings_a.squeeze().tolist()
        print('The movie number :')
        print(movie)
        print('was noted :')
        print(Ratings_l[i][2])
        print('by user :')
        print(int(Ratings_l[i][0]))
        print('')
        myobj={'userId' : Ratings_l[i][0],'rate' : Ratings_l[i][2],'movieId' : movie}
        x=requests.post(url,data=myobj)
        print(x.text)
