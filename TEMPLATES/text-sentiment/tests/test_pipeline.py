from data_loader import load_data
from train import train_model


def test_loader_non_empty():
    X_train, X_test, y_train, y_test = load_data()
    assert len(X_train) > 0
    assert len(X_test) > 0
    assert len(y_train) == len(X_train)
    assert len(y_test) == len(X_test)


def test_f1_range():
    _, f1 = train_model()
    assert 0.0 <= f1 <= 1.0
