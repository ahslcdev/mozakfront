import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChange(currentPage - 1)}
          >
            Anterior
          </button>
        </li>

        {Array.from({ length: totalPages }).map((_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChange(currentPage + 1)}
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
