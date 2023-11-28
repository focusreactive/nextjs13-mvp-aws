# NextJS AWS Readme

This repository is based on [NextJS 13 MVP](https://github.com/focusreactive/MVP-NextJS13-New-Features) and is mainly made to demonstrate how its features work on AWS-based infrastructure. It contains simple configurations for 3-rd party services (Flightcontrol, SST) as well as Dockerfiles for self-hosted solutions.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on SST

SST uses OpenNext under the hood, that basically takes the Next.js build output and converts it into a package that can be deployed to any functions as a service platform.

### Prerequisites

Make sure you configured AWS account as described [here](https://docs.sst.dev/setting-up-aws).

### Getting started

To add SST to your existing Next project, run the following command:
```
npx create-sst@latest
```

This command will create SST configuration file, where you can define your project resources that will be reflected in AWS infrastructure. Example:
```
import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'nextjs13-mvp-aws',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
       app.setDefaultRemovalPolicy('destroy');
    }

    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'nextjs13-mvp-aws');

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
```

Start your local dev environment ([how it works](https://docs.sst.dev/live-lambda-development#how-it-works)):
```
npx sst dev
```

Deploy your project when it's ready:
```
npx sst deploy --stage prod
```

Behind the scenes, it compiles the constructs to AWS CloudFormation, packages your frontend assets and functions, uploads it to AWS, and creates your app's infrastructure.

## Deploy on Flightcontrol

### Prerequisites

- Flightcontrol account
- AWS account (linked to Flightcontorl account)
- Next.js project

No extra steps required as everything can be configured via service UI, though you can manually define resources with JSON configuration file (`flightcontrol.json`). Example:
```
{
    "environments": [
      {
        "id": "production",
        "name": "Production",
        "region": "eu-central-1",
        "source": {
          "branch": "main"
        },
        "services": [
          {
            "id": "nextjs13-mvp-aws-fc",
            "name": "NextJS 13 MVP",
            "type": "fargate",
            "cpu": 1,
            "memory": 2,
            "minInstances": 1,
            "maxInstances": 1,
            "buildCommand": "npm run build",
            "startCommand": "npm run start"
          }
        ]
      }
    ]
  }
```

Flightcontrol is based on ECS Fargate solution, so you can verify your infrastructure through AWS Console.

## Deploy on AWS

TODO
