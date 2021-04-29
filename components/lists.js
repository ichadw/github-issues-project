import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { getIssuesList } from "../helpers/api";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListIssues({ totalOpenIssues }) {
  const classes = useStyles();
  const router = useRouter();
  const [stateList, setStateList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(async () => {
    let issues = [];
    try {
      issues = await getIssuesList({ page: 1, keyword: "" });
    } finally {
      setStateList(issues.items);
      setTotalPage(parseInt(issues.total_count / 10));
    }
  }, []);

  const handleClickList = (id) => {
    router.push(`/issues/${id}`);
  };

  const handleFetch = async (newPage, keyword = "") => {
    let issues = [];
    try {
      issues = await getIssuesList({ page: newPage, keyword: `+${keyword}` });
    } finally {
      setStateList(issues.items);
      setTotalPage(parseInt(issues.total_count / 10));
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    handleFetch(newPage);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const enter = e.key === "Enter";
    const convertValue = value.replace(/\s/, "+");
    if (enter) {
      handleFetch(1, convertValue);
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Label"
        style={{ margin: 8 }}
        placeholder="Search..."
        helperText="e.g: state:open test keyword"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onKeyPress={handleSearch}
      />
      <List component="nav">
        <Chip
          className={classes.chip}
          label={`${totalOpenIssues} Open`}
          variant="outlined"
          color="primary"
        />
      </List>
      <Divider />
      {stateList.length ? (
        (stateList || []).map((item, idx) => {
          return (
            <div key={`issues-${idx}`}>
              <List component="nav">
                <ListItem button>
                  <ListItemIcon>
                    {item.state === "open" ? <InfoIcon /> : <CloseIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={`#${item.number}`}
                    onClick={() => handleClickList(item.number)}
                  />
                </ListItem>
              </List>
              <Divider />
            </div>
          );
        })
      ) : (
        <Typography variant="h6">No Data</Typography>
      )}
      {stateList.length <= 10 ? (
        <Pagination
          count={totalPage > 100 ? 100 : totalPage}
          page={page}
          onChange={handleChangePage}
        />
      ) : null}
    </div>
  );
}
