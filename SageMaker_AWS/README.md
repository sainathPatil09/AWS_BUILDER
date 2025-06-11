# **💬 Train and Deploy a Sentiment Classifier on Amazon SageMaker (with Minimal Cost)**

## **🌟 Introduction**

Building a machine learning model to understand human sentiment (like classifying reviews as positive or negative) is a popular and useful natural language processing (NLP) task. But training and deploying models on the cloud can be expensive if not done properly.

In this guide, I’ll walk you step-by-step through how to train and deploy a sentiment classifier using Amazon SageMaker — while keeping costs as low as possible.

### We'll use:

- Amazon SageMaker for training and deployment
- HuggingFace Transformers for the model
- Spot instances to reduce cost
- Free-tier eligible options where possible

## **🧠 What You’ll Learn**

- How SageMaker works and how to use it cost-effectively

- How to train a sentiment analysis model using a pre-trained DistilBERT

- How to deploy it as a real-time endpoint

- How to predict and shut down the endpoint to avoid charges

## **🗺️ Project Overview**

| Step | Action                                    |
| ---- | ----------------------------------------- |
| 1    | Set up AWS and SageMaker Studio           |
| 2    | Description here                          |
| 3    | Write the training script (train.py)      |
| 4    | Upload the script to S3                   |
| 5    | Train using SageMaker with spot instances |
| 6    | Deploy as a real-time endpoint (optional) |
| 7    | Make predictions                          |
| 8    | Delete endpoint to avoid charges          |

## **🛠️ Step 1: Set Up AWS & SageMaker Studio**

- Go to the [AWS Console](https://aws.amazon.com)

- Search for SageMaker

- Click SageMaker Studio → Create domain

- Choose default settings and create a user

- Launch SageMaker Studio

## **✍️ Step 2: Create the Training Script (train.py)**
This script tells SageMaker how to train the model.

- Refer code ```train.py```

## **☁️ Step 3: Upload Script to S3**
Use the following code in a notebook to upload your script:

```
import sagemaker
from sagemaker.huggingface import HuggingFace

sess = sagemaker.Session()
role = sagemaker.get_execution_role()

s3_path = sess.upload_data(path='train.py', key_prefix='scripts')

```
## **🏋️ Step 4: Train the Model on a Spot Instance**

```
huggingface_estimator = HuggingFace(
    entry_point="train.py",
    source_dir="./",
    instance_type="ml.m5.large",
    instance_count=1,
    role=role,
    transformers_version="4.26",
    pytorch_version="1.13",
    py_version="py39",
    use_spot_instances=True,
    max_run=1800,
    max_wait=3600,
)

huggingface_estimator.fit()
```
## **🚀 Step 5: Deploy the Trained Model (Optional) **

```
predictor = huggingface_estimator.deploy(
    initial_instance_count=1,
    instance_type="ml.t2.medium"
)

```
## **🔍 Step 6: Make Predictions**

```
result = predictor.predict({
    "inputs": "I absolutely loved this movie!"
})

print(result)
```
## **❌ Step 7: Delete Endpoint to Save Money**

```
predictor.delete_endpoint()
```


## **🧠 Final Thoughts**

Amazon SageMaker, combined with HuggingFace and spot instances, makes it possible to train and deploy deep learning models affordably. By limiting training size, using spot pricing, and cleaning up unused endpoints, you can complete an end-to-end NLP project for less than a cup of coffee ☕.


