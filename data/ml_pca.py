from sklearn.datasets import fetch_openml
dataset = fetch_openml("C:\\Users\\murie_3059d25\\Desktop\\centrale\\movies_dataset.csv")

from sklearn.model_selection import train_test_split
# test_size: what proportion of original data is used for test set
train_img, test_img, train_lbl, test_lbl = train_test_split( dataset.data, dataset.target, test_size=1/7.0, random_state=0)

from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
# Fit on training set only.
scaler.fit(train_img)
# Apply transform to both the training set and the test set.
train_img = scaler.transform(train_img)
test_img = scaler.transform(test_img)

from sklearn.decomposition import PCA
# Make an instance of the Model
pca = PCA(.95)

pca.fit(train_img)

train_img = pca.transform(train_img)
test_img = pca.transform(test_img)

