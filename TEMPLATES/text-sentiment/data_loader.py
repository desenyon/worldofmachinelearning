from sklearn.model_selection import train_test_split


DATA = [
    ("love this build", 1),
    ("great model accuracy", 1),
    ("this feature is useful", 1),
    ("fantastic result", 1),
    ("clear documentation", 1),
    ("this is broken", 0),
    ("terrible latency", 0),
    ("bad predictions", 0),
    ("confusing instructions", 0),
    ("not working at all", 0),
]


def load_data(test_size: float = 0.3, random_state: int = 42):
    texts = [item[0] for item in DATA]
    labels = [item[1] for item in DATA]
    return train_test_split(texts, labels, test_size=test_size, random_state=random_state, stratify=labels)
