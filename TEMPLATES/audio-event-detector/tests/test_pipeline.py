from data_loader import load_data
from train import train_model


def test_loader_shapes():
    X_train, X_test, y_train, y_test = load_data()
    assert X_train.shape[1] == 20
    assert X_test.shape[1] == 20


def test_train_f1_range():
    _, f1 = train_model()
    assert 0.0 <= f1 <= 1.0
