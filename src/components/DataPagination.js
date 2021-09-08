import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";

function DataPagination({ total, handleOnChangePage, search }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleOnChangePage(currentPage);
  }, [currentPage, handleOnChangePage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div style={{ margin: "10px 0" }}>
      <Pagination
        style={{ color: "white", textAlign: "center" }}
        total={total}
        defaultCurrent={currentPage}
        defaultPageSize={20}
        showSizeChanger={false}
        showTotal={(innerTotal) => `Total ${innerTotal} items`}
        onChange={onPageChange}
      />
    </div>
  );
}

DataPagination.propTypes = {
  total: PropTypes.number.isRequired,
  handleOnChangePage: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
};

export default DataPagination;
