from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split


def load_data(test_size: float = 0.2, random_state: int = 42):
    dataset = load_digits()
    X_train, X_test, y_train, y_test = train_test_split(
        dataset.data,
        dataset.target,
        test_size=test_size,
        random_state=random_state,
        stratify=dataset.target,
    )
    return X_train, X_test, y_train, y_test
