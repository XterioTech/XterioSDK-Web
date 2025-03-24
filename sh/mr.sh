#!/bin/bash
set - e

data=$(<sensitive.txt)
gh_token=$(echo "$data" | grep "^gh_token=" | cut -d'=' -f2)
gl_token=$(echo "$data" | grep "^gl_token=" | cut -d'=' -f2)
echo "gh_token=$gh_token"
echo "gl_token=$gl_token"

# https://github.com/chenwei0922/xterio-sdk/
# github
# githubUrl="https://api.github.com"
# owner="chenwei0922"
# repo="xterio-sdk"
# accessToken=$gh_token
# data='{
#   "title": "merge request after publish",
#   "head": "npm-publish",
#   "base": "main"
# }'
# response=$(curl -X POST -H "Authorization: token $accessToken" -d "$data" "$githubUrl/repos/$owner/$repo/pulls")
# url=$(python3 -c "import json,sys;obj=json.loads(sys.argv[1]);print(obj['html_url'])" "$response")
# {"url":"https://api.github.com/repos/chenwei0922/xterio-sdk/pulls/3", ...}

# gitlab
gitlabUrl="https://gitlab.itlibecc.com/api/v4"
projectID="70"
accessToken=$gl_token
title="merge request after publish"
sourceBranch="npm-publish"
targetBranch="main"

checkBranchDiff() {
  diffResponse=$(curl -s -H "PRIVATE-TOKEN: $accessToken" "$gitlabUrl/projects/$projectID/repository/compare?from=$sourceBranch&to=$targetBranch&straight=true")
  diffFiles=$(echo "$diffResponse" | jq '.diffs | length')
  if [ "$diffFiles" -eq 0 ]; then
    return 1
  else
    return 0
  fi
}

iid=''
createMergeRequest() {
  checkBranchDiff "$sourceBranch" "$targetBranch"
  # ne不等，eq等
  if [ $? -ne 0 ]; then
    echo "[mr] The files have no change, cannot create mr.❌"
    exit
  fi
  response=$(curl -X POST -H "PRIVATE-TOKEN: $accessToken" -d "source_branch=$sourceBranch" -d "target_branch=$targetBranch" -d "title=$title" "$gitlabUrl/projects/$projectID/merge_requests")
  # url=$(python3 -c "import json,sys;obj=json.loads(sys.argv[1]);print(obj['web_url'])" "$response")
  url=$(echo $response | jq -r '.web_url // ""')
  iid=$(echo $response | jq -r '.iid // ""')
  # {iid:"7", "web_url":"https://gitlab.itlibecc.com/changying/platform/xteriosdk-web/-/merge_requests/7", ...}

  if [ -n "$url" ] ; then
    echo "[mr] Merge Request Created Success.✅"
    echo "[mr] The detail is: $url"
  else
    echo "[mr] Merge Request Created failure.❌"
    echo "$response"
    # {"message":["Another open merge request already exists for this source branch: !17"]}
    result=$(echo $response | jq -r '.message[0]' | grep -o '![0-9]\+')
    iid=${result:1}
  fi
}
createMergeRequest

sleep 3
# 自动 merge
maxRetriesCount=3
index=1
executeMergeRequest(){
  if [ $index -gt $maxRetriesCount ]; then
    echo "[mr] The maximum retry exceeded the limit.❌"
    return
  fi
  ((index++))
  mergeRequestIID="$1"
  mergeResponse=$(curl -X PUT -H "PRIVATE-TOKEN: $accessToken" "$gitlabUrl/projects/$projectID/merge_requests/$mergeRequestIID/merge")
  mergeStatus=$(echo $mergeResponse | jq -r '.state')
  if [ "$mergeStatus" == "merged" ]; then
    echo "[mr] Merge Request Merged Success.✅"
    return 0
  else
    echo "[mr] Merge Request Merged Failure.❌"
    echo "$mergeResponse"
    executeMergeRequest "$mergeRequestIID"
  fi
}
if [ -n "$iid" ] ; then
  executeMergeRequest "$iid"
else
  echo "[mr] mrId invalid.❌"
  exit
fi