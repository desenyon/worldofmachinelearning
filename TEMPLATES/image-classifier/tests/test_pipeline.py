from data_loader import load_data
from train import train_model


def test_data_loader_shapes():
    X_train, X_test, y_train, y_test = load_data()
    assert X_train.shape[0] > 0
    assert X_test.shape[0] > 0
    assert len(y_train) == X_train.shape[0]
    assert len(y_test) == X_test.shape[0]


def test_train_model_accuracy_range():
    _, accuracy = train_model()
    assert 0.0 <= accuracy <= 1.0
