import numpy as np
from sklearn.model_selection import train_test_split


def load_data(test_size: float = 0.2, random_state: int = 42):
    rng = np.random.default_rng(random_state)

    # synthetic 20-feature vectors: class 0 (quiet), class 1 (event)
    class_0 = rng.normal(loc=0.0, scale=1.0, size=(200, 20))
    class_1 = rng.normal(loc=1.2, scale=1.0, size=(200, 20))

    X = np.concatenate([class_0, class_1], axis=0)
    y = np.concatenate([np.zeros(200, dtype=int), np.ones(200, dtype=int)], axis=0)

    return train_test_split(X, y, test_size=test_size, random_state=random_state, stratify=y)
