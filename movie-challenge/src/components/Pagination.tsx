import ReactPaginate from "react-paginate";
import './Pagination.css'

interface PaginationProps {  //definimos las props que esperamos recibir en est ecomponente
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void; // función para manejar el cambio de página
}

//definimos el componente funciuonal Paginatuin que recibe "pageCount" y "onPageChange"
const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={5}
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