import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage, pageCount }) => {
  // Используем useEffect для добавления логики предотвращения множественного выбора
  useEffect(() => {
    const buttons = document.querySelectorAll(`.${styles.root} ul li a`);

    buttons.forEach((button) => {
      button.addEventListener('click', function (event) {
        // Удаляем класс "selected" со всех кнопок
        buttons.forEach((btn) => btn.classList.remove('selected'));

        // Добавляем "selected" только на кликнутую кнопку
        this.classList.add('selected');
      });
    });

    // Проверяем, является ли устройство touch-устройством
    const isTouchDevice = window.matchMedia('(any-hover: none) and (any-pointer: coarse)').matches;

    if (isTouchDevice) {
      buttons.forEach((button) => {
        button.addEventListener('touchstart', function (event) {
          // Препятствуем выбору двух кнопок
          event.preventDefault();
          buttons.forEach((btn) => btn.classList.remove('selected'));
          this.classList.add('selected');
        });
      });
    }

    // Очищаем слушатели событий при размонтировании компонента
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', function () {});
        button.removeEventListener('touchstart', function () {});
      });
    };
  }, [currentPage, pageCount]); // Выполняем useEffect каждый раз, когда меняется страница

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount} // Динамическое количество страниц
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
