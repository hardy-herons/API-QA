# API-QA

The goal of this project was to design a system for an existing e-commerce application for the Questions and Answers microservice component, which could handle increased web traffic of at least 100 request per second across 9 endpoints. The relevant endpoints for this API can be found on the bottom of this readme.

The Questions and Answers data was generated from 3 CSV files inclusive of over 30 million unique records.

Due to the nested structure of the endpoints, and ease of adding on additional fields to tables, MongoDB was selected as the database. Docker was used to create an easily horizontally scalable system.

### System Infrastructure

EC2 t2.micro instances running Node server, an AWS load balancer and MongoDB database deployed with Docker.

### Results

- Optimizations included
- The production version of the service is deployed and scaled to 2 AWS EC2 instances using volumes (t2.micro) and a Load Balancer
- The RESTful API implemented for Questions and Answers endpoints achieved 52ms latency and 0% error rate for 1000 RPS

## Table of Contents

- [Installing-Dependencies](#installing-dependencies)
- [Technologies-Used](#technologies-used)
- [Requirements](#requirements)
- [Routes](#routes)
- [API](#api)

## Installing-Dependencies

> Navigate to the root directory and run the following scripts to run locally

- `npm install` - install dependencies
- `npm start-dev` - start the server in production

* Navigate to http://localhost:3000/

## Technologies-Used

> Back-End

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com)

> Testing

- [Artillery](https://artillery.io/)
- [Loader.io](http://loader.io/)

## Requirements

Ensure that the following modules are installed before running `npm install`

- Node v10.13.0 or higher

## Routes

> Listed are available routes that can be handled by the API.

| Request Type | Endpoint                                     | Purpose                                                                                                     | Status |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| GET          | /qa/:product_id                              | Returns a list of questions for a particular product. This list does not include reported questions         | 200    |
| GET          | /qa/:question_id/answers                     | Returns answers corresponding to questions for a given product. This list does not include reported answers | 200    |
| GET          | /qa/:answer_id/answers/photos                | Returns photos associated with answers                                                                      | 200    |
| PUT          | /qa/question/:question_id/helpful            | Updates a question to show it was found helpful                                                             | 204    |
| PUT          | /qa/answer/:answer_id/helpful                | Updates an answer to show it was found helpful                                                              | 204    |
| PUT          | /qa/question/:question_id/report             | Reports a question and removes is from the list of viewable questions                                       | 204    |
| PUT          | /qa/answer/:answer_id/answers/report         | Reports a question and removes is from the list of viewable questions                                       | 204    |
| POST         | /qa/:product_id                              | Adds a question for the given product                                                                       | 201    |
| POST         | /qa/:question_id/answers:question_id/helpful | Adds an answer for the given question                                                                       | 201    |

## API

# Questions and Answers API

### List Questions

`GET /qa/:product_id`
Retrieves a list of questions for a particular product. This list _does not_ include any reported questions.

Parameters

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| product_id | integer | Specifies the product for which to retrieve questions.    |
| page       | integer | Selects the page of results to return. Default 1.         |
| count      | integer | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK`

```json
{
  "product_id": "5",
  "results": [
    {
      "question_id": 37,
      "question_body": "Why is this product cheaper here than other sites?",
      "question_date": "2018-10-18T00:00:00.000Z",
      "asker_name": "williamsmith",
      "question_helpfulness": 4,
      "reported": 0,
      "answers": [
        {
          "id": 68,
          "body": "We are selling it here without any markup from the middleman!",
          "date": "2018-08-18T00:00:00.000Z",
          "answerer_name": "Seller",
          "helpfulness": 4,
          "photos": []
          // ...
        }
      ]
    },
    {
      "question_id": 38,
      "question_body": "How long does it last?",
      "question_date": "2019-06-28T00:00:00.000Z",
      "asker_name": "funnygirl",
      "question_helpfulness": 2,
      "reported": 0,
      "answers": [
        {
          "id": 70,
          "body": "Some of the seams started splitting the first time I wore it!",
          "date": "2019-11-28T00:00:00.000Z",
          "answerer_name": "sillyguy",
          "helpfulness": 6,
          "photos": []
        },
        {
          "id": 78,
          "body": "9 lives",
          "date": "2019-11-12T00:00:00.000Z",
          "answerer_name": "iluvdogz",
          "helpfulness": 31,
          "photos": []
        }
      ]
    }
    // ...
  ]
}
```

### Answers List

Returns answers for a given question. This list _does not_ include any reported answers.

`GET /qa/:question_id/answers`

Parameters

| Parameter   | Type    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| question_id | integer | Required ID of the Question requested                     |
| page        | integer | Selects the page of results to return. Default 1.         |
| count       | integer | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK`

```json
{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": []
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [
        {
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        }
        // ...
      ]
    }
    // ...
  ]
}
```

### Add a Question

Adds a question for the given product

`POST /qa/:product_id`

Parameters

| Parameter  | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| product_id | integer | Required ID of the Product to post the question for |

Body Parameters

| Parameter | Type | Description                      |
| --------- | ---- | -------------------------------- |
| body      | text | Text of question being asked     |
| name      | text | Username for question asker      |
| email     | text | Email address for question asker |

Response

`Status: 201 CREATED`

### Add an Answer

Adds an answer for the given question

`POST /qa/:question_id/answers`

Parameters

| Parameter   | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| question_id | integer | Required ID of the question to post the answer for |

Body Parameters

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| body      | text   | Text of question being asked                        |
| name      | text   | Username for question asker                         |
| email     | text   | Email address for question asker                    |
| photos    | [text] | An array of urls corresponding to images to display |

Response

`Status: 201 CREATED`

### Mark Question as Helpful

Updates a question to show it was found helpful.

`PUT /qa/question/:question_id/helpful`

Parameters

| Parameter   | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| question_id | integer | Required ID of the question to update |

Response

`Status: 204 NO CONTENT`

### Report Question

Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

`PUT /qa/question/:question_id/report`

Parameters

| Parameter   | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| question_id | integer | Required ID of the question to update |

Response

`Status: 204 NO CONTENT`

### Mark Answer as Helpful

Updates an answer to show it was found helpful.

`PUT /qa/answer/:answer_id/helpful`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| answer_id | integer | Required ID of the answer to update |

Response

`Status: 204 NO CONTENT`

### Report Answer

Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

`PUT /qa/answer/:answer_id/report`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| answer_id | integer | Required ID of the answer to update |

Response

`Status: 204 NO CONTENT`
