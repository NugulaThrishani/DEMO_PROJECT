# AWS Deployment

This project uses:

- MongoDB Atlas for the database
- Amazon ECR for the API Docker image
- AWS App Runner for the Express API
- Amazon S3 + CloudFront for the Vite frontend
- GitHub Actions for continuous deployment from `main`

## One-time AWS setup

Create these resources in the same AWS region:

1. Create an ECR repository, for example `petal-crumb-api`.
2. Start Docker Desktop, then build and push the first image so App Runner has an image to create its service from:

   ```powershell
   aws ecr get-login-password --region YOUR_REGION | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com
   docker build -t YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/petal-crumb-api:latest ./server
   docker push YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/petal-crumb-api:latest
   ```
3. Create an App Runner service using that ECR repository. Configure it to listen on port `5000` and set these environment variables in App Runner:
   - `MONGO_URI`: your MongoDB Atlas connection string
   - `CLIENT_URL`: your CloudFront URL, such as `https://dxxxxxxxx.cloudfront.net`
   - `PORT`: `5000`
4. Create an S3 bucket for the frontend.
5. Create a CloudFront distribution with the S3 bucket as its origin. Use Origin Access Control and configure the bucket policy from CloudFront.
6. Configure CloudFront's default root object as `index.html`.
7. Add an S3/CloudFront error response for `403` and `404` that serves `/index.html` with status `200` so React routes work.
8. Seed MongoDB once locally against the Atlas database:

```powershell
cd server
npm run seed
```

## GitHub repository secrets

In GitHub, open **Settings > Secrets and variables > Actions** and add:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (for example `us-east-1`)
- `ECR_REPOSITORY` (for example `petal-crumb-api`)
- `APP_RUNNER_SERVICE_ARN`
- `FRONTEND_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `VITE_API_URL` (the App Runner URL plus `/api`, for example `https://xxxxx.us-east-1.awsapprunner.com/api`)

The AWS identity used by GitHub Actions needs permission to push to ECR, deploy App Runner, upload to the frontend bucket, and create CloudFront invalidations. Prefer a dedicated deployment user or, later, GitHub OIDC instead of long-lived access keys.

## Deploy

Push to `main`:

```powershell
git add .
git commit -m "Configure AWS deployment"
git push origin main
```

The workflow in `.github/workflows/deploy.yml` builds the API image, starts an App Runner deployment, builds the frontend with the API URL, uploads it to S3, and invalidates CloudFront.
