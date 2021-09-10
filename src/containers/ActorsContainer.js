/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ActorsList from "../components/ActorsList";
import { actors as actorsApi } from "../api/tmdbApi";
import useQuery from "../hooks/useQuery";
import SearchInput from "../components/SearchInput";
import DataPagination from "../components/DataPagination";

function ActorsContainer({ actors, fetchActors, searchActors, search }) {
  const queryParams = useQuery() ?? {};
  const history = useHistory();

  const { query, page } = queryParams;

  console.log(searchActors);

  useEffect(() => {
    if (!search) {
      fetchActors({
        page,
      });
    } else {
      searchActors({
        page,
        query,
      });
    }
  }, [fetchActors, page, query, search, searchActors]);

  const handleSearch = (q) => {
    if (!q) return;
    history.push(`/actors/search?query=${q}&page=1`);
  };

  const handlePageChange = useCallback(
    (currentPage) => {
      if (search) {
        history.push(`/actors/search?query=${query}&page=${currentPage}`);
      } else {
        history.push(`/actors?page=${currentPage}`);
      }
    },
    [history, query, search]
  );

  return (
    <>
      <SearchInput handleOnSubmit={handleSearch} search={search} />
      <ActorsList actors={actors?.results} />
      <DataPagination
        total={actors?.total_results}
        handleOnChangePage={handlePageChange}
        search={search}
      />
    </>
  );
}
const mapStateToProps = ({ tmdb: { actors } }) => ({ actors });
const mapDispatchToProps = {
  fetchActors: actorsApi.fetch,
  searchActors: actorsApi.search,
};
export default connect(mapStateToProps, mapDispatchToProps)(ActorsContainer);
