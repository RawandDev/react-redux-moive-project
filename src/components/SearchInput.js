import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

function SearchInput({ handleOnSubmit, search }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (!search) {
      setQuery("");
    }
  }, [search]);

  const { t } = useTranslation();

  return (
    <div
      style={{
        width: "100%",
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Input.Search
        placeholder={t("search_for_movies")}
        onSearch={handleOnSubmit}
        enterButton
        style={{
          width: 260,
        }}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

SearchInput.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  search: PropTypes.bool,
};

SearchInput.defaultProps = {
  search: false,
};

export default SearchInput;
