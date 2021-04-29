import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getIssueDetail } from "../../../helpers/api";
import { Remarkable } from "remarkable";
import Head from "next/head";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  chip: {
    marginTop: theme.spacing(2),
  },
  chipLabel: {
    margin: theme.spacing(1),
  },
}));

export default function IssueDetail({}) {
  const classes = useStyles();
  const router = useRouter();
  const { issueId } = router.query;
  const [issueDetail, setIssueDetail] = useState({});

  useEffect(async () => {
    let issue = [];
    try {
      issue = await getIssueDetail({ issueId });
    } finally {
      setIssueDetail(issue);
    }
  }, []);
  var md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });
  const labels = issueDetail.labels || [];

  return (
    <>
      <Head>
        <title>{issueDetail?.title} | Angular Github Issues</title>
      </Head>
      <Typography variant="h5">
        {issueDetail?.title} #{issueId}
      </Typography>
      <Typography variant="h6">
        <Avatar src={issueDetail?.user?.avatar_url} />
        {issueDetail?.user?.login}
      </Typography>
      <Chip
        className={classes.chip}
        label={issueDetail.state}
        variant="outlined"
        color="primary"
      />
      <Grid container spacing={5}>
        <Grid item sm={9}>
          <Paper className={classes.paper} elevation={3}>
            <div
              dangerouslySetInnerHTML={{ __html: md.render(issueDetail.body) }}
            ></div>
          </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="subtitle1">Labels</Typography>
            {labels.length ? (
              labels.map((lb) => {
                return (
                  <Chip
                    key={lb.id}
                    className={classes.chipLabel}
                    style={{ backgroundColor: `#${lb.color}` }}
                    label={lb.name}
                  />
                );
              })
            ) : (
              <Typography variant="caption">No Label</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
