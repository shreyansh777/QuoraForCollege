import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);
  
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};
export default Paginate;
