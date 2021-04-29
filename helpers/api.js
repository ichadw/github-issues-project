import axios from "axios";
import { REPO_URL, SEARCH_URL, REPO_ISSUES_URL } from "./constants";

const get = (url) => axios.get(url).then((res) => res.data);

export const getRepositoryDetails = () => {
  return get(REPO_URL);
};

export const getIssueDetail = ({ issueID }) => {
  // /repos/angular/angular/issues/41870
  const pathname = REPO_ISSUES_URL.replace("{id}", issueID);
  return get(pathname);
};

export const getIssuesList = (params) => {
  // /issues?q=repo:angular/angular+type:issue+state:open&per_page=10&page=1
  const additionalParams = params.keyword;
  const page = params.page;
  const perPage = params.perPage || 10;
  const pathname = `${SEARCH_URL}${additionalParams}&page=${page}&per_page=${perPage}`;
  return get(pathname);
};
