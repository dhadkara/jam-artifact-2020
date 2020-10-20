# jam-artifact-2020
Jam challenge for re-invent 2020 with AWS codepipeline having parallel actions in a stage

## How to run
* Create a S3 bucket with name "speedy-corp-source-bucket" mentioned in cfn template
* Go to sample-app folder and run
```
 ./scripts/create-artifact.sh
```
* upload dhadkar1-src.zip create above into "speedy-corp-source-bucket" bucket
* Upload cfn file jam-cfn-template-codecommit.yaml file via cfn console and make sure it runs

## How to verify
* Go to verify-lambda folder and run
```
  npm install && ./scripts/package-lambda.sh
```
* Create a role with AWSCodePipelineFullAccess
* Create lambda fn with above role and Upload verify-jam.zip and test with event input 
```
{ name: 'value1', clue: 'value2' }
```