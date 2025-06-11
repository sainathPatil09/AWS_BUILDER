
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer

def tokenize_function(example):
    return tokenizer(example["text"], truncation=True, padding=True)

# Load IMDb dataset
dataset = load_dataset("imdb")
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")

tokenized_datasets = dataset.map(tokenize_function, batched=True)
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)

training_args = TrainingArguments(
    output_dir="/opt/ml/model",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=1,
    weight_decay=0.01
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"].shuffle(seed=42).select(range(1000)),
    eval_dataset=tokenized_datasets["test"].shuffle(seed=42).select(range(500)),
    tokenizer=tokenizer
)

trainer.train()
