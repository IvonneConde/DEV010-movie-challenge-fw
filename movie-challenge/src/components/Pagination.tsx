import ReactPaginate from "react-paginate";
import './Pagination.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  pageRangeDisplayed?: number;  
  marginPagesDisplayed?: number; 
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  pageRangeDisplayed = 3,  
  marginPagesDisplayed = 1, 
}) => {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageLinkClassName="page-num"
      previousLinkClassName="page-num"
      nextLinkClassName="page-num"
      activeClassName="active"
      previousLabel='<'
    />
  );
};

export default Pagination;
