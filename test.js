const api = require('@aws-cdk/aws-apigatewayv2-alpha');
const cdk = require('aws-cdk-lib');
const ec2 = require('aws-cdk-lib/aws-ec2');
const elbv2 = require('aws-cdk-lib/aws-elasticloadbalancingv2');
const int = require('@aws-cdk/aws-apigatewayv2-integrations-alpha');

test('should pass', () => {
  // setup
  const stack = new cdk.Stack(undefined, 'Stack');
  const vpc = new ec2.Vpc(stack, 'Vpc');
  const alb = new elbv2.ApplicationLoadBalancer(stack, 'Alb', { vpc });
  const albListener = alb.addListener('Listener', { port: 80 });
  const vpcLink = new api.VpcLink(stack, 'VpcLink', { vpc });

  // should succeed
  new api.HttpApi(stack, 'Api', {
    defaultIntegration: new int.HttpAlbIntegration('DefaultIntegration', albListener, { vpcLink }),
  });
});
