BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH_NAME" = "master" ]]; then
  echo Current branch is $BRANCH_NAME. Running PRODUCTION deployment.
  firebase --config=firebase-production.json deploy --project=production
else
  echo Current branch is $BRANCH_NAME. Running DEVELOPMENT deployment.
  firebase --config=firebase-development.json deploy --project=development
fi
echo 'Done.'