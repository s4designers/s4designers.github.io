BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH_NAME" = "master" ]]; then
  echo Current branch is $BRANCH_NAME. Starting local server that uses PRODUCTION database.
  firebase --config=firebase-production.json serve --project=production
else
  echo Current branch is $BRANCH_NAME. Starting local server that uses DEVELOPMENT database.
  firebase --config=firebase-development.json serve --project=development
fi
echo 'Done.'