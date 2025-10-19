import json
import boto3
import base64
from datetime import datetime
import uuid

# AWS clients
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

# Configs
S3_BUCKET = 'wear-ever-user-searched-uploads'
DYNAMO_TABLE = 'WearEverItemsTags'
MODEL_ID = 'anthropic.claude-3-5-sonnet-20240620-v1:0'  # replace with your actual model id

PROMPT = """
You are a fashion stylist AI. Given a clothing image, return tags describing the item using this JSON format:

{
  "category": "...",
  "color": ["..."],
  "style": ["..."],
  "fit": ["..."],
  "vibe": ["..."]
}

Only choose from these tag options:

Category: dress, jacket, pants, top, shoes, accessories
Color: black, white, beige, brown, red, pink, blue, green, yellow, purple, gray, multicolor
Style: vintage, streetwear, minimalist, y2k, cottagecore, grunge, academia, boho, chic, sporty, preppy, kawaii, techwear, classic, fairycore, indie, retro, girly, punk, elegant
Fit: oversized, cropped, fitted, flowy, high-waisted, loose, bodycon, layered, structured
Vibe: casual, formal, date night, interview, presentation, party, everyday, picnic, beach, festival, cozy, academic, workwear
"""

def lambda_handler(event, context):
    # 1. Extract image key
    image_key = event.get('image_key')
    if not image_key:
        return {"statusCode": 400, "body": "Missing 'image_key' in event."}

    try:
        # 2. Get image from S3
        s3_response = s3.get_object(Bucket=S3_BUCKET, Key=image_key)
        image_bytes = s3_response['Body'].read()
        encoded_image = base64.b64encode(image_bytes).decode('utf-8')

        # 3. Prepare Bedrock request payload
        payload = {
            "anthropic_version": "bedrock-2023-05-31",  # REQUIRED for Claude models
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": PROMPT},
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",  # or "image/png" if applicable
                                "data": encoded_image
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 1024,
            "temperature": 0.2
        }

        # 4. Invoke Claude model via Bedrock
        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            contentType='application/json',
            accept='application/json',
            body=json.dumps(payload)
        )

        # 5. Read and parse response
        response_body = json.loads(response['body'].read())
        text_output = response_body['content'][0]['text']

        # 6. Parse JSON tags from Claude's output
        try:
            tags = json.loads(text_output)
        except json.JSONDecodeError:
            return {
                "statusCode": 500,
                "body": f"Failed to parse JSON from Claude response: {text_output}"
            }

        # 7. Save tags to DynamoDB
        item_id = str(uuid.uuid4())
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(Item={
            "item_id": item_id,
            "image_url": f"s3://{S3_BUCKET}/{image_key}",
            "category": tags.get("category", ""),
            "color_tags": tags.get("color", []),
            "style_tags": tags.get("style", []),
            "fit_tags": tags.get("fit", []),
            "vibe_tags": tags.get("vibe", []),
            "timestamp": datetime.utcnow().isoformat()
        })

        # 8. Return tags in response
        return {
            "statusCode": 200,
            "body": json.dumps({
                "item_id": item_id,
                "tags": tags
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Error processing request: {str(e)}"
        }
