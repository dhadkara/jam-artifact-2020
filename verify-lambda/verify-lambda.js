
// Create a DocumentClient that represents the query to add an item
const AWS = require('aws-sdk');
const codepipeline = new AWS.CodePipeline();

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.handler = async (event, context) => {

  // eslint-disable-next-line no-console
  console.info('received:', event);

  let completed = false ;
  let message = "Not yet completed" ;

  // get codepipeline details
  const params = {
    name: 'Speedy-App-CodePipeline'
  };
  // console.info('params:', params);
  // codepipeline.getPipeline(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });

  const result = await codepipeline.getPipeline(params).promise();
  console.info('result:', JSON.stringify(result, null, 2));

  const state = await codepipeline.getPipelineState(params).promise();
  console.info('state:', JSON.stringify(state, null, 2));
  try{
    if (result.pipeline.stages[1].actions[1].runOrder == 1 && state.stageStates[1].actionStates[1].latestExecution.status == 'Succeeded') {
      completed = true ;
      message = "The challenge has been completed";
    }
  } catch (err){
    console.error(err);
  }

  const response =  {
    "completed": completed, //required: whether this task is completed
    "message": message //required: a message to display to the team indicating progress or next steps
  };


  return response;
};
