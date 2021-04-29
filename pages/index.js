import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ListIssues from "../components/lists";
import { getRepositoryDetails } from "../helpers/api";

export default function Home({ data }) {
  const dataOwner = data?.owner;
  const ownerName = dataOwner?.login;
  const ownerURL = dataOwner?.html_url;
  const totalOpenIssues = data.open_issues || 0;

  const repoName = data?.name;
  const repoURL = data?.svn_url;

  return (
    <Grid container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href={ownerURL}>
          {ownerName}
        </Link>
        <Link color="inherit" href={repoURL}>
          {repoName}
        </Link>
      </Breadcrumbs>
      <ListIssues totalOpenIssues={totalOpenIssues} />
    </Grid>
  );
}

export const getStaticProps = async () => {
  const data = await getRepositoryDetails();
  return {
    props: {
      data,
    },
  };
};
