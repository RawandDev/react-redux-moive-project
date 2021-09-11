/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { actors as actorsApi } from "../api/tmdbApi";
import Error from "../components/Error";
import SingleActor from "../components/SingleActor";

const SingleActorContainer = ({ actor, error, fetchActor }) => {
  console.log(actor);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchActor({ id, config: { append: "movie_credits" } });
    }
  }, [fetchActor, id]);
  return error ? <Error /> : <SingleActor data={actor.data} />;
};

const mapStateToProps = ({ tmdb: { singleActor, error } }) => ({
  actor: singleActor,
  error,
});
const mapDispatchToProps = {
  fetchActor: actorsApi.fetchSingle,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleActorContainer);
