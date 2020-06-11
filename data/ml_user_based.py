import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


movies = pd.read_csv("C:\\Users\\murie_3059d25\\Desktop\\centrale\\movies.csv",encoding="Latin1")
Ratings = pd.read_csv("C:\\Users\\murie_3059d25\\Desktop\\centrale\\ratings.csv")


Mean = Ratings.groupby(by="userId",as_index=False)['rating'].mean()
Rating_avg = pd.merge(Ratings,Mean,on='userId')
Rating_avg['adg_rating']=Rating_avg['rating_x']-Rating_avg['rating_y']

check = pd.pivot_table(Rating_avg,values='rating_x',index='userId',columns='movieId')
final = pd.pivot_table(Rating_avg,values='adg_rating',index='userId',columns='movieId')

# Replacing NaN by Movie Average
final_movie = final.fillna(final.mean(axis=0))
# Replacing NaN by user Average
final_user = final.apply(lambda row: row.fillna(row.mean()), axis=1)


# user similarity on replacing NAN by item(movie) avg
#cosine = cosine_similarity(final_movie)
#np.fill_diagonal(cosine, 0 )
#similarity_with_movie =pd.DataFrame(cosine,index=final_movie.index)
#similarity_with_movie.columns=final_user.index
#print('similarity_with_movie')
#print(similarity_with_movie.head())


# user similarity on replacing NAN by user avg
b = cosine_similarity(final_user)
np.fill_diagonal(b, 0 )
similarity_with_user = pd.DataFrame(b,index=final_user.index)
similarity_with_user.columns=final_user.index


def find_n_neighbours(df,n):
    order = np.argsort(df.values, axis=1)[:, :n]
    df = df.apply(lambda x: pd.Series(x.sort_values(ascending=False)
           .iloc[:n].index, 
          index=['top{}'.format(i) for i in range(1, n+1)]), axis=1)
    return df

# top 30 neighbours for each user
sim_user_30_u = find_n_neighbours(similarity_with_user,30)

# top 30 neighbours for each movie
# remplacer les u par des m pour avoir une méthode movie-based
#sim_user_30_m = find_n_neighbours(similarity_with_movie,30)
#print(sim_user_30_m.head())

Rating_avg = Rating_avg.astype({"movieId": str})
Movie_user = Rating_avg.groupby(by = 'userId')['movieId'].apply(lambda x:','.join(x))


def User_item_score(user,item):
    a = sim_user_30_u[sim_user_30_u.index==user].values
    b = a.squeeze().tolist()
    c = final_movie.loc[:,item]
    d = c[c.index.isin(b)]
    f = d[d.notnull()]
    avg_user = Mean.loc[Mean['userId'] == user,'rating'].values[0]
    index = f.index.values.squeeze().tolist()
    corr = similarity_with_user.loc[user,index]
    fin = pd.concat([f, corr], axis=1)
    fin.columns = ['adg_score','correlation']
    fin['score']=fin.apply(lambda x:x['adg_score'] * x['correlation'],axis=1)
    nume = fin['score'].sum()
    deno = fin['correlation'].sum()
    final_score = avg_user + (nume/deno)
    return final_score


def User_item_score1(user):
    Movie_seen_by_user = check.columns[check[check.index==user].notna().any()].tolist()
    a = sim_user_30_u[sim_user_30_u.index==user].values
    b = a.squeeze().tolist()
    d = Movie_user[Movie_user.index.isin(b)]
    l = ','.join(d.values)
    Movie_seen_by_similar_users = l.split(',')
    Movies_under_consideration = list(set(Movie_seen_by_similar_users)-set(list(map(str, Movie_seen_by_user))))
    Movies_under_consideration = list(map(int, Movies_under_consideration))
    score = []
    for item in Movies_under_consideration:
        c = final_movie.loc[:,item]
        d = c[c.index.isin(b)]
        f = d[d.notnull()]
        avg_user = Mean.loc[Mean['userId'] == user,'rating'].values[0]
        index = f.index.values.squeeze().tolist()
        corr = similarity_with_user.loc[user,index]
        fin = pd.concat([f, corr], axis=1)
        fin.columns = ['adg_score','correlation']
        fin['score']=fin.apply(lambda x:x['adg_score'] * x['correlation'],axis=1)
        nume = fin['score'].sum()
        deno = fin['correlation'].sum()
        final_score = avg_user + (nume/deno)
        score.append(final_score)
    data = pd.DataFrame({'movieId':Movies_under_consideration,'score':score})
    top_5_recommendation = data.sort_values(by='score',ascending=False).head(5)
    Movie_Name = top_5_recommendation.merge(movies, how='inner', on='movieId')
    Movie_Names = Movie_Name.title.values.tolist()
    return Movie_Names, top_5_recommendation

user = int(input("What is your User Id : "))

if user in set(Ratings['userId']):
    predicted_movies = User_item_score1(user)[0]
    a = sim_user_30_u[sim_user_30_u.index==user].values
    b = a.squeeze().tolist()
    print('Your most similar user is :', b[0])
    print(" ")
    print("We Recommend for User Id : ",user)
    print("   ")
    j=0
    scores=User_item_score1(user)[1]['movieId']
    scores1=list(scores)
    scores_eff=list(User_item_score(user,scores1[l]) for l in range(5))
    for i in predicted_movies:
        print(i)
        print('With the score :',scores_eff[j])
        j=j+1
        
if user not in set(Ratings['userId']):
    print('Unknown user, retry')
