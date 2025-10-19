# WearEver AI Assistant - Lambda Function & API Usage

## Overview

This branch contains the **AI Assistant Lambda function** for the WearEver project. It processes clothing images uploaded to S3, generates fashion tags using AWS Bedrock's Claude 3.5 model, stores results in DynamoDB, and exposes the functionality via an API Gateway REST API endpoint.

---

## What the Lambda Function Does

1. **Receives** an `image_key` parameter (the S3 object key of an uploaded image).
2. **Fetches** the image bytes from the S3 bucket `wear-ever-user-searched-uploads`.
3. **Sends** the image plus a detailed fashion stylist prompt to the Bedrock Claude 3.5 model.
4. **Receives** fashion tags describing the clothing item, including category, color, style, fit, and vibe.
5. **Saves** the tags along with metadata (item ID, timestamp, image URL) into the DynamoDB table `WearEverItemsTags`.
6. **Returns** a JSON response with the unique `item_id` and tags.

---

## AWS Resources Involved

| Service          | Resource Name / ID                             | Purpose                                    |
|------------------|------------------------------------------------|--------------------------------------------|
| S3 Bucket        | `wear-ever-user-searched-uploads`               | Stores uploaded clothing images             |
| DynamoDB Table   | `WearEverItemsTags`                              | Stores tags and metadata for each item      |
| Lambda Function  | `TagClothingImageFunction`                       | Processes images, calls Bedrock, saves tags |
| API Gateway REST API | https://zthglwvh94.execute-api.us-east-1.amazonaws.com/dev | Exposes Lambda via REST endpoint            |
| Bedrock Model    | `anthropic.claude-3-5-sonnet-20240620-v1:0`     | Claude 3.5 AI model that generates tags     |

---

## IAM Permissions Required

Make sure the Lambda execution role includes:

- **S3 Permissions:**  
  `s3:GetObject` on bucket `wear-ever-user-searched-uploads`

- **DynamoDB Permissions:**  
  `dynamodb:PutItem` on table `WearEverItemsTags`

- **Bedrock Permissions:**  
  `bedrock:InvokeModel` on the Claude model ID

---

## How to Call the API Gateway Endpoint

- **URL:** https://zthglwvh94.execute-api.us-east-1.amazonaws.com/dev


- **HTTP Method:**  
`POST`

- **Headers:**  
```http

## OTHOR IMPORTANT NOTES:

Content-Type: application/json

Request Body JSON Format:

{
  "image_key": "path/to/image.jpg"
}


Replace "path/to/image.jpg" with the actual key of the image in your S3 bucket.

Response Format:

{
  "item_id": "unique-uuid",
  "tags": {
    "category": "dress",
    "color": ["pink"],
    "style": ["girly", "chic"],
    "fit": ["fitted", "flowy"],
    "vibe": ["party", "date night"]
  }
}


Error Responses:

400 if image_key is missing or invalid.

500 for internal errors (e.g., failure to process AI request or save data).

Example React Fetch Usage
async function getFashionTags(imageKey) {
  try {
    const response = await fetch('https://zthglwvh94.execute-api.us-east-1.amazonaws.com/dev/tag-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_key: imageKey })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`API Error: ${errorMsg}`);
    }

    const data = await response.json();
    console.log('Tags:', data.tags);
    return data;
  } catch (error) {
    console.error('Failed to get fashion tags:', error);
  }
}

// Usage example:
getFashionTags('user_uploads/my-image.jpg');

Important Notes and Next Steps

Image Formats:
The Lambda currently assumes images are JPEGs. You can extend support for PNG or others by modifying the media_type in the payload.

CORS Configuration:
The API Gateway is configured with CORS allowing all origins ('*'). For production, replace '*' with your actual frontend domain to improve security. Example:

Access-Control-Allow-Origin: https://wear-ever-frontend.example.com


Domain for CORS:
Use your deployed React frontend domain or local dev URL for Access-Control-Allow-Origin.

Authentication:
Currently, the API is public. For security, consider adding API keys, AWS Cognito authentication, or other authorization mechanisms.

Error Handling:
Ensure your frontend gracefully handles HTTP 400/500 errors from the API.

Monitoring:
Use CloudWatch Logs for Lambda and API Gateway monitoring to troubleshoot issues.

Contact / Support

For any questions or assistance integrating this AI assistant into your frontend, please reach out to:

Developer: CSRobba

LinkedIN: https://www.linkedin.com/in/chandana-robba-7b3021245/
